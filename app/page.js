import BarcodeScanner from "../components/BarcodeScanner";

export default function Home() {
	return (
		<>
			<h1 className={"text-xl text-center font-bold"}>EAN Code Scanner</h1>
			<BarcodeScanner />
		</>
	);
}
