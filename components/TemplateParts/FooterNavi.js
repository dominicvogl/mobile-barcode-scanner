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
		}
	]

	return (
		<ul className={"flex justify-center gap-4"}>
			{FooterNaviData && FooterNaviData.map((item, index) => (
				<li key={index}>
					<a href={item.url} className={"underline underline-offset-2 text-primary hover:text-secondary"}>{item.title}</a>
				</li>
			))}
		</ul>
	)
}
