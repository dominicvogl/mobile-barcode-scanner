export default function TextOutput({eanList}) {

	const areaPlaceHolder = `for example:
9783753934129
9783757303990
9783689503727`;

	return (
		// write here a textarea
		<fieldset className="fieldset">
			<legend className="fieldset-legend text-sm">Gescannte EAN Codes:</legend>
			<textarea className="textarea h-64 w-full" placeholder={areaPlaceHolder} value={eanList.join('\n')
			} readOnly />
		</fieldset>
	)
}
