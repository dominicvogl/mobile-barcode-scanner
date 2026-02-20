'use client'

import { useState } from 'react'

export default function ButtonStartScanner({isScanning, setIsScanning, onCameraInitError, onCameraInitSuccess}) {

	const [isRequestingCamera, setIsRequestingCamera] = useState(false)

	const scrollToScanner = () => {
		if (typeof window === 'undefined') return;
		const el = document.getElementById('scanner-section');
		if (!el) return;
		// Use rAF to ensure layout is updated after state change and element is visible
		requestAnimationFrame(() => {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	};

	const ensureCameraAccess = async () => {
		if (!window.isSecureContext) {
			throw new Error('camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.')
		}

		if (!navigator?.mediaDevices?.getUserMedia) {
			throw new Error('this browser has no Stream API support')
		}

		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				facingMode: { ideal: 'environment' }
			}
		})

		// Permission wurde erteilt - Teststream direkt wieder schließen.
		stream.getTracks().forEach((track) => track.stop())
	}

	const toggleScanner = async () => {
		if (isRequestingCamera) return

		if (isScanning) {
			setIsScanning(false)
			return
		}

		setIsRequestingCamera(true)

		try {
			await ensureCameraAccess()
			onCameraInitSuccess?.()
			setIsScanning(true)
			scrollToScanner()
		} catch (error) {
			console.error('Fehler beim Starten der Kamera:', error)
			onCameraInitError?.(error)
		} finally {
			setIsRequestingCamera(false)
		}
	}

	return (
		<div>

			<button
				className={`btn ${isScanning ? 'btn-error' : 'btn-primary'}`}
				onClick={toggleScanner}
				disabled={isRequestingCamera}
				aria-pressed={isScanning}
				aria-label={isScanning ? 'Scanner stoppen' : 'Scanner starten'}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
					<path fillRule="evenodd"
						  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
						  clipRule="evenodd"/>
				</svg>

				{isRequestingCamera ? 'Kamera wird gestartet...' : (isScanning ? 'Scanner stoppen' : 'Scanner starten')}
			</button>
		</div>
	)
}
