import BarcodeScanner from "../components/BarcodeScanner";

export default function Home() {
	return (
		<div className="min-h-screen p-6 sm:p-10">
			<main className="mx-auto max-w-3xl">
				<h1 className={"text-xl text-center font-bold"}>EAN Code Scanner</h1>
				<BarcodeScanner />
			</main>
		</div>
	);
}
