import FooterNavi from "@/components/TemplateParts/FooterNavi";
import VersionBadge from "@/components/VersionBadge";

export default function Footer() {

	return (
		<footer className="mx-auto max-w-3xl my-8">
			<FooterNavi />
			<p className={"text-center text-sm text-neutral/70 mt-4 my-1"}>Made with ❤ by <a target={"_blank"} className={"underline-offset-2 underline text-primary hover:text-secondary"} href="https://cat-ia.de">Elledan</a> | <VersionBadge /></p>
		</footer>
	)
}
