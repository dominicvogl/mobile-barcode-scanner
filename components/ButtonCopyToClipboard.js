import { useState } from 'react';

export default function ButtonCopyToClipboard({eanList}) {
	const [status, setStatus] = useState('idle'); // 'idle', 'success', 'error'
	const [errorMessage, setErrorMessage] = useState('');

	const handleCopyToClipboard = async () => {
		try {
			// EAN-Codes zu einem String mit Zeilenumbrüchen formatieren
			const eanString = eanList.join('\n');

			// In die Zwischenablage kopieren
			await navigator.clipboard.writeText(eanString);

			// Erfolgsstatus setzen
			setStatus('success');

			// Nach 2 Sekunden zurück zum ursprünglichen Zustand
			setTimeout(() => {
				setStatus('idle');
			}, 2000);

		} catch (error) {
			// Fehler behandeln
			setStatus('error');
			setErrorMessage(error.message || 'Kopieren fehlgeschlagen');

			// Nach 3 Sekunden zurück zum ursprünglichen Zustand
			setTimeout(() => {
				setStatus('idle');
				setErrorMessage('');
			}, 3000);
		}
	};

	// Button-Klassen basierend auf Status bestimmen
	const getButtonClass = () => {
		switch (status) {
			case 'success':
				return 'btn btn-success';
			case 'error':
				return 'btn btn-error';
			default:
				return 'btn btn-secondary';
		}
	};

	// Button-Text basierend auf Status bestimmen
	const getButtonText = () => {
		switch (status) {
			case 'success':
				return 'Erfolgreich kopiert!';
			case 'error':
				return errorMessage;
			default:
				return 'Copy EANs to Clipboard';
		}
	};

	return (
		<button
			className={getButtonClass()}
			onClick={handleCopyToClipboard}
			disabled={!eanList || eanList.length === 0}
		>
			{getButtonText()}
		</button>
	);
}
