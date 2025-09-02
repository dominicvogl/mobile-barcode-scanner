export default function FeatureGrid () {

	const FeatureGrid = [
		{
			title: "Schnell & Serien-Scan",
			subline: "Mit einem Klick starten, Kamera aktivieren und mehrere EANs nacheinander erfassen – alles wird automatisch übersichtlich gesammelt."
		},
		{
			title: "Ein-Klick-Export",
			subline: "Per „Copy to Clipboard“ als saubere Liste übernehmen und direkt in andere Apps einfügen."
		},
		{
			title: "Für viele Use-Cases",
			subline: "Inventur, Wareneingang, Produktlisten, Buch-/Manga-Kataloge, Versandvorbereitung u. v. m."
		}

	]

	return (
		<ul className={"grid grid-cols-3 gap-6 my-6"}>
			{FeatureGrid && FeatureGrid.map((feature, i) => (
				<li key={i}>
					<h3 className={"text-primary font-bold mb-2"}>{feature.title}</h3>
					<p className={"text-sm"}>{feature.subline}</p>
				</li>
			))}
		</ul>
	)
}
