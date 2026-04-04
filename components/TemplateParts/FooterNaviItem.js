export default function FooterNaviItem({item}) {
	const target = item.target || "_self";
	const rel = target === "_blank" ? "noopener noreferrer" : undefined;

	return (
		<li>
			<a href={item.url} target={target} rel={rel} className={"underline underline-offset-2 text-primary hover:text-secondary"}>{item.title}</a>
		</li>
	)

}
