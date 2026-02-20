export default function FooterNaviItem({item}) {
	const isExternalTarget = item.target === "_blank";

	return (
		<li>
			<a
				href={item.url}
				target={item.target || "_self"}
				rel={isExternalTarget ? "noopener noreferrer" : undefined}
				className={"underline underline-offset-2 text-primary hover:text-secondary"}
			>
				{item.title}
			</a>
		</li>
	)

}
