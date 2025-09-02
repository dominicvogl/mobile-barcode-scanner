import BarcodeScanner from "../components/BarcodeScanner";
import FeatureGrid from "@/components/FeatureGrid";


export default function Home() {
	return (
		<>
			<div className={"text-center mb-3"}>
				<span className={"badge badge-primary badge-soft"}>Manga / Buch Scanner</span>
			</div>
			<h1 className={"text-2xl text-center font-bold"}>ISBN / EANs scannen. Kopieren. Weiterarbeiten.</h1>
			<h2 className={"mt-2 mb-6"}>Deine smarte, schnelle Scanner-App: Scanne EAN-Codes und kopiere die gesammelte Liste mit einem Klick in deine persönlichen Tools.</h2>
			<BarcodeScanner />
			<FeatureGrid />
		</>
	);
}
