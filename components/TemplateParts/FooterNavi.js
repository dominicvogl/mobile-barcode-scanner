import FooterNaviItem from "@/components/TemplateParts/FooterNaviItem";

export default function FooterNavi() {
	const FooterNaviData = [
		{
			"url": "./",
			"title": "Home",
		},
		{
			"url": "./impressum",
			"title": "Impressum",
		},
		{
			"url": "./datenschutz",
			"title": "Datenschutz",
		},
		{
			"url": "https://dominic-vogl.notion.site/Syncshelf-Scanner-2c407c6817d280079340d4b6e3a3cf83?source=copy_link",
			"title": "Changelog",
			"target": "_blank",
		}
	]

	return (
		<ul className={"flex justify-center gap-4"}>
			{FooterNaviData && FooterNaviData.map((item, index) => (
				<FooterNaviItem key={index} item={item} />
			))}
		</ul>
	)
}
