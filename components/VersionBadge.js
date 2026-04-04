export default function VersionBadge() {
	return (
		<span className={"badge badge-soft badge-primary badge-sm"}>Version {process.env.APP_VERSION || "unbekannt"}</span>
	)
}
