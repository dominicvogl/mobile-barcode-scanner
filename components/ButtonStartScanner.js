'use client'

import { useState, useEffect } from 'react'
import Alert from "@/components/Alert";

export default function ButtonStartScanner({isScanning, setIsScanning}) {

	const [cameraPermission, setCameraPermission] = useState(null)
	const [permissionChecked, setPermissionChecked] = useState(false)

	useEffect(() => {
		checkCameraPermission()
	}, [])

	const scrollToScanner = () => {
		if (typeof window === 'undefined') return;
		const el = document.getElementById('scanner-section');
		if (!el) return;
		// Use rAF to ensure layout is updated after state change and element is visible
		requestAnimationFrame(() => {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	};

	const checkCameraPermission = async () => {
		try {
			const permission = await navigator.permissions.query({ name: 'camera' })
			setCameraPermission(permission.state)
			setPermissionChecked(true)

			// Listener für Änderungen der Berechtigung
			permission.addEventListener('change', () => {
				setCameraPermission(permission.state)
			})
		} catch (error) {
			console.error('Fehler beim Prüfen der Kameraberechtigung:', error)
			setPermissionChecked(true)
		}
	}

	const toggleScanner = () => {
		setIsScanning(prev => {
			const next = !prev;
			if (!prev && next) {
				// Scanning was off and is being turned on, scroll to scanner
				scrollToScanner();
			}
			return next;
		});
	}

	const getPermissionMessage = () => {
		if (!permissionChecked) return null

		switch (cameraPermission) {
			case 'granted':
				return {status: "success", message: "✓ Kameraberechtigung erteilt"}
			case 'denied':
				return {status: "error", message: "✗ Kameraberechtigung verweigert."}
			case 'prompt':
				return {status: "warning", message: "⚠ Gewähre bitte Kamerazugriff"}
			default:
				return null
		}
	}

	return (
		<div>

			<button
				className={`btn ${isScanning ? 'btn-error' : 'btn-primary'}`}
				onClick={toggleScanner}
				aria-pressed={isScanning}
				aria-label={isScanning ? 'Scanner stoppen' : 'Scanner starten'}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
					<path fillRule="evenodd"
						  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
						  clipRule="evenodd"/>
				</svg>

				{isScanning ? 'Scanner stoppen' : 'Scanner starten'}
			</button>

			{cameraPermission !== 'granted' && (
				<Alert alert={getPermissionMessage()} />
			)}
		</div>
	)
}
