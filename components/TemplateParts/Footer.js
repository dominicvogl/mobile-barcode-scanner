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
						<a href={item.url} className={"underline underline-offset-2 text-primary hover:text-secondary"}>{item.title}</a>
					</li>
				))}
			</ul>
			<p className={"text-center text-sm text-neutral/70 my-4"}>Made with ❤ by <a target={"_blank"} className={"underline-offset-2 underline text-primary hover:text-secondary"} href="https://cat-ia.de">Elledan</a></p>
		</footer>
	)
}
