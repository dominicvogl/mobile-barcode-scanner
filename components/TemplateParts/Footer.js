import FooterNavi from "@/components/TemplateParts/FooterNavi";

export default function Footer() {

	return (
		<footer className="mx-auto max-w-3xl my-8">
			<FooterNavi />
			<p className={"text-center text-sm text-neutral/70 my-4"}>Made with ❤ by <a target={"_blank"} className={"underline-offset-2 underline text-primary hover:text-secondary"} href="https://cat-ia.de">Elledan</a></p>
		</footer>
	)
}
