export default function Alert ({alert}) {
	return (
		<div role="alert" className={`alert alert-soft alert-${alert?.status}`}>
			<span>{alert?.message}</span>
		</div>
	)
}
