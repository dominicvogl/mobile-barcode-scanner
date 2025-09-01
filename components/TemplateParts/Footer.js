export default function Footer() {
	const FooterNavi = [
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
		<footer className="mx-auto max-w-3xl my-8">
			<ul className={"flex justify-center gap-4"}>
				{FooterNavi && FooterNavi.map((item, index) => (
					<li key={index}>
						<a href={item.url} className={"underline hover:text-primary"}>{item.title}</a>
					</li>
				))}
			</ul>
		</footer>
	)
}
