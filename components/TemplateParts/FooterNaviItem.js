export default function FooterNaviItem({index, item}) {

	return (
		<li>
			<a href={item.url} target={item.target || "_self"} className={"underline underline-offset-2 text-primary hover:text-secondary"}>{item.title}</a>
		</li>
	)

}
