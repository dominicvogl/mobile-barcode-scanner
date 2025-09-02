export default function TextOutput({eanList}) {

	return (
		// write here a textarea
		<fieldset className="fieldset">
			<legend className="fieldset-legend text-sm">Scanned EAN Codes</legend>
			<textarea className="textarea h-64 w-full" placeholder="Bio" value={eanList.join('\n')
			} readOnly />
		</fieldset>
	)
}
