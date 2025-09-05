import pkg from "../package.json";

export default function VersionBadge() {
	return (
		<span className={"badge badge-soft badge-primary badge-sm"}>Version {pkg.version}</span>
	)
}
