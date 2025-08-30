"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

// Utility to decide if a string looks like an EAN-13 barcode
function isLikelyEAN13(value) {
	// EAN-13 is 13 digits; some scanners may include whitespace
	const v = String(value).trim();
	return /^\d{13}$/.test(v);
}

export default function BarcodeScanner() {
	const [selectedDeviceId, setSelectedDeviceId] = useState("");
	const [devices, setDevices] = useState([]);
	const [torch, setTorch] = useState(false);
	const [isScanning, setIsScanning] = useState(false);
	const [codes, setCodes] = useState([]);
	const [message, setMessage] = useState("");
	const lastDetectedRef = useRef("");
	const seenRef = useRef(new Set());

	const textAreaValue = useMemo(() => codes.join("\n"), [codes]);

	// Load available cameras when scanning starts
	useEffect(() => {
		let isActive = true;
		async function loadDevices() {
			try {
				if (!navigator?.mediaDevices?.enumerateDevices) return;
				const list = await navigator.mediaDevices.enumerateDevices();
				if (!isActive) return;
				const cams = list.filter((d) => d.kind === "videoinput");
				setDevices(cams);
				// If no selection yet and we have devices, prefer one with 'back' or 'rear'
				if (!selectedDeviceId && cams.length) {
					const rear = cams.find((d) => /back|rear|environment/i.test(d.label));
					setSelectedDeviceId((rear || cams[0]).deviceId);
				}
			} catch (e) {
				// ignore; user might not have granted permission yet
			}
		}
		if (isScanning) loadDevices();
		return () => {
			isActive = false;
		};
	}, [isScanning, selectedDeviceId]);

	const handleDetected = useCallback((results) => {
		if (!Array.isArray(results)) return;
		// results is an array of { rawValue, ... }
		for (const r of results) {
			const raw = String(r?.rawValue ?? "").trim();
			if (!raw) continue;
			// filter for EAN-13 by default, but accept any if user wants that later
			if (!isLikelyEAN13(raw)) continue;
			// throttle duplicates seen in a row or already seen
			if (raw === lastDetectedRef.current) continue;
			if (seenRef.current.has(raw)) {
				lastDetectedRef.current = raw; // avoid loop on the same code
				continue;
			}
			setCodes((prev) => {
				if (prev.includes(raw)) return prev;
				return [...prev, raw];
			});
			seenRef.current.add(raw);
			lastDetectedRef.current = raw;
			setMessage(`Erkannt: ${raw}`);
		}
	}, []);

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(textAreaValue);
			setMessage("In die Zwischenablage kopiert.");
		} catch (e) {
			setMessage("Kopieren fehlgeschlagen. Bitte manuell kopieren.");
		}
	}, [textAreaValue]);

	const handleReset = useCallback(() => {
		setCodes([]);
		seenRef.current = new Set();
		lastDetectedRef.current = "";
		setMessage("Zurückgesetzt.");
	}, []);

	return (
		<div className="w-full max-w-xl mx-auto p-4 flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Barcode Scanner</h1>

			<div className="flex flex-wrap gap-2 items-center">
				<button
					onClick={() => setIsScanning((s) => !s)}
					className={`btn ${isScanning ? "btn-warning" : "btn-primary"}`}
					aria-pressed={isScanning}
				>
					{isScanning ? "Stop" : "Start"} Scan
				</button>
				<button onClick={handleCopy} className="btn btn-secondary" disabled={!codes.length}>
					Inhalt kopieren
				</button>
				<button onClick={handleReset} className="btn btn-outline" disabled={!codes.length}>
					Reset
				</button>
				{isScanning ? (
					<>
						<select
							className="select select-bordered"
							value={selectedDeviceId}
							onChange={(e) => setSelectedDeviceId(e.target.value)}
							aria-label="Kamera auswählen"
						>
							<option value="">Standard-Kamera</option>
							{devices.map((d) => (
								<option key={d.deviceId} value={d.deviceId}>
									{d.label || `Kamera ${d.deviceId.slice(-4)}`}
								</option>
							))}
						</select>
						<label className="label cursor-pointer gap-2">
							<span className="label-text">Licht</span>
							<input
								type="checkbox"
								className="toggle"
								checked={torch}
								onChange={(e) => setTorch(e.target.checked)}
							/>
						</label>
					</>
				) : null}
			</div>

			{message ? (
				<p role="status" className="text-sm text-gray-600">{message}</p>
			) : null}

			{/* Scanner area */}
			<div className="w-full aspect-[3/2] relative overflow-hidden rounded-box border border-base-300">
				{isScanning ? (
					<div className="w-full h-full">
      <Scanner
       						deviceId={selectedDeviceId || undefined}
       						torch={torch}
       						formats={["ean_13", "ean_8", "upc_a", "upc_e", "code_128"]}
							constraints={{
								facingMode: { ideal: "environment" },
								width: { ideal: 1280 },
								height: { ideal: 720 },
							}}
       onDecode={(value) => handleDetected([{ rawValue: value }])}
								onResult={(results) => handleDetected(results || [])}
								onError={(err) => setMessage(err?.message || "Kamera-Fehler")}
							scanDelay={200}
							className="w-full h-full object-cover"
						/>
						{/* Rectangular overlay to aim EAN-13 codes */}
						<div
							className="pointer-events-none absolute inset-0 grid place-items-center"
							aria-hidden
						>
							<div className="w-3/4 max-w-md h-32 border-2 border-primary rounded-md shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]" />
						</div>
					</div>
				) : (
					<div className="w-full h-full grid place-items-center text-sm text-base-content/70">
						Scanner ist pausiert. Klicke auf "Start Scan".
					</div>
				)}
			</div>

			<label className="form-control w-full">
				<div className="label">
					<span className="label-text">Erkannte Codes (je Zeile einer):</span>
				</div>
				<textarea
					className="textarea textarea-bordered h-40 font-mono text-sm"
					value={textAreaValue}
					readOnly
					spellCheck={false}
					aria-label="Erkannte Codes"
				></textarea>
			</label>
		</div>
	);
}
