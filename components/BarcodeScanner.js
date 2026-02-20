'use client';
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState, useRef, useCallback } from "react";
import TextOutput from "@/components/TextOutput";
import ButtonCopyToClipboard from "@/components/ButtonCopyToClipboard";
import ButtonStartScanner from "@/components/ButtonStartScanner";
import Alert from "@/components/Alert";

// Cooldown in Millisekunden - wie lange nach einem Scan derselbe Code ignoriert wird
const SCAN_COOLDOWN_MS = 2000;

export default function BarcodeScanner() {

	const [eanList, setEanList] = useState([]);
	const [isScanning, setIsScanning] = useState(false);
	const [scannerError, setScannerError] = useState(null);

	// Refs für Duplikat-Prüfung (Refs statt State, um Re-Renders zu vermeiden)
	const lastScannedCodeRef = useRef(null);
	const lastScannedTimeRef = useRef(0);

	const handleOnScan = useCallback((result) => {
		const scannedValue = result[0].rawValue;
		const now = Date.now();

		// Prüfe ob es derselbe Code ist UND ob die Cooldown-Zeit noch nicht abgelaufen ist
		// (verhindert mehrfaches Scannen durch den Library-Bug)
		const isSameCode = scannedValue === lastScannedCodeRef.current;
		const isCooldownActive = (now - lastScannedTimeRef.current) < SCAN_COOLDOWN_MS;

		if (isSameCode && isCooldownActive) {
			return;
		}

		// Aktualisiere Refs für Cooldown-Tracking
		lastScannedCodeRef.current = scannedValue;
		lastScannedTimeRef.current = now;

		// Füge nur hinzu, wenn der Code noch nicht in der Liste ist
		setEanList(prev => {
			if (prev.includes(scannedValue)) {
				return prev; // Keine Änderung - Duplikat
			}
			return [...prev, scannedValue];
		});
	}, []);

	const getCameraErrorMessage = (error) => {
		const name = error?.name ?? '';
		const message = String(error?.message ?? '').toLowerCase();

		if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
			return 'Kein Kamerazugriff erlaubt. In Safari: aA > Website-Einstellungen > Kamera auf "Erlauben" stellen.'
		}

		if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
			return 'Keine Kamera gefunden.'
		}

		if (name === 'NotReadableError' || name === 'TrackStartError') {
			return 'Die Kamera wird bereits von einer anderen App oder einem anderen Tab verwendet.'
		}

		if (message.includes('secure context') || message.includes('https')) {
			return 'Kamera funktioniert nur über HTTPS oder auf localhost. Auf dem iPhone im lokalen Netzwerk daher bitte HTTPS nutzen.'
		}

		if (message.includes('stream api support')) {
			return 'Dieser Browser unterstützt den Kamera-Zugriff nicht.'
		}

		return error?.message || 'Kamera konnte nicht gestartet werden.'
	}

	const setCameraError = useCallback((error) => {
		setScannerError({
			status: 'error',
			message: getCameraErrorMessage(error)
		});
	}, []);

	const clearCameraError = useCallback(() => {
		setScannerError(null);
	}, []);

	const handleOnError = (err) => {
		console.error(err);
		setCameraError(err);
	}

	// 16:10 Aspect Ratio Styles für den Scanner
	const scannerStyles = {
		container: {
			width: '100%',
			aspectRatio: '16/8',
		},
		video: {
			width: '100%',
			height: '100%',
			objectFit: 'cover'
		},
		finderBorder: 3
	};

	return (
		<section className="my-6">
			<div className={"bg-primary/10 py-8 my-12 rounded-lg"}>
				<div className="flex flex-wrap justify-center gap-4">
					<ButtonStartScanner
						isScanning={isScanning}
						setIsScanning={setIsScanning}
						onCameraInitError={setCameraError}
						onCameraInitSuccess={clearCameraError}
					/>
					<ButtonCopyToClipboard eanList={eanList} />
				</div>
				{scannerError ? (
					<div className="mt-4">
						<Alert alert={scannerError} />
					</div>
				) : null}
			</div>

			<div className={"md:flex gap-6"}>
				<div className={"md:w-1/2"} id="scanner-section">

				<p className={"text-sm font-bold my-2"}>Scanner</p>

				{isScanning ? (
					<div className={"my-6 lg:my-0 relative"}>
						<Scanner
							onScan={handleOnScan}
							onError={handleOnError}
							formats={["ean_13"]}
							allowMultiple={false}
							styles={scannerStyles}
							scanDelay={1000}
							components={{
								finder: false
							}}
						/>
						{/* Custom Barcode Finder - horizontaler Rahmen für Barcodes */}
						<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
							<div className="border-2 border-red-500/20 bg-transparent"
								 style={{
									 width: '80%',
									 height: '50%',
									 borderStyle: 'dashed'
								 }}>
							</div>
						</div>

					</div>
				) : (
					<div className="w-full aspect-16/8 bg-gray-200 rounded-lg flex items-center justify-center my-6 lg:my-0">
						<div className="text-center text-gray-500">
							<svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
								<path d="M3 4V6H1V4C1 2.89 1.89 2 3 2H5V4H3M1 18V20C1 21.11 1.89 22 3 22H5V20H3V18H1M21 4V2H19V4H21M21 6H23V4C23 2.89 22.11 2 21 2V2H19V4H21V6M23 18V20C23 21.11 22.11 22 21 22H19V20H21V18H23M5 22V20H7V22H5M9 22H11V20H9V22M13 22V20H15V22H13M3 8H1V10H3V8M1 12V14H3V12H1M3 16H1V18H3V16M23 8V10H21V8H23M21 12H23V14H21V12M23 16H21V18H23V16M7 2V4H9V2H7M11 2H13V4H11V2M15 2V4H17V2H15M12 8C14.21 8 16 9.79 16 12S14.21 16 12 16 8 14.21 8 12 9.79 8 12 8M12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10Z"/>
							</svg>
							<p className="text-lg font-semibold">Scanner bereit</p>
							<p className="text-sm">Klicke auf &quot;Scanner starten&quot;</p>
						</div>
					</div>
				)}
				</div>
				<div className={"md:w-1/2"}>
					<TextOutput eanList={eanList} />
				</div>
			</div>


		</section>

	)
}
