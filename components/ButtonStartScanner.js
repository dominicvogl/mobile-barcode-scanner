export default function ButtonStartScanner({isScanning, setIsScanning}) {

	const toggleScanner = () => {
		setIsScanning(prev => !prev);
	}

	return (
		<button
			className={`btn ${isScanning ? 'btn-error' : 'btn-primary'}`}
			onClick={toggleScanner}
		>
			{isScanning ? 'Scanner stoppen' : 'Scanner starten'}
		</button>
	)
}
