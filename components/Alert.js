const ALLOWED_ALERT_STATUSES = new Set(["info", "success", "warning", "error"]);

export default function Alert ({alert}) {
	const status = ALLOWED_ALERT_STATUSES.has(alert?.status) ? alert.status : "info";

	return (
		<div role="alert" className={`alert alert-soft alert-${status}`}>
			<span>{alert?.message}</span>
		</div>
	)
}
