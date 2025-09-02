import BarcodeScanner from "../components/BarcodeScanner";
import FeatureGrid from "@/components/FeatureGrid";


export default function Home() {
	return (
		<>
			<h1 className={"text-2xl text-center font-bold"}>EANs scannen. Kopieren. Weiterarbeiten.</h1>
			<h2 className={"mt-2 mb-6"}>Die kleine, schnelle Scanner-App: Scanne EAN-Codes und kopiere die gesammelte Liste mit einem Klick in deine persönlichen Tools.</h2>
			<FeatureGrid />
			<BarcodeScanner />
		</>
	);
}
