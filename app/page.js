import BarcodeScanner from "../components/BarcodeScanner";

export default function Home() {
	return (
		<div className="min-h-screen p-6 sm:p-10">
			<main className="mx-auto max-w-3xl">
				<BarcodeScanner />
			</main>
		</div>
	);
}
