from services.consultation import generate_consultation
from services.follow_up import generate_follow_up
from services.alerts import generate_alerts

def generate_summary(patient: dict) -> str:
    summary = []

    # Patient Header
    summary.append(f"Patient Summary: {patient['name']}")
    summary.append(f"ID: {patient['id']}")
    summary.append(f"Created At: {patient['created_at']}")
    summary.append("=" * 72)

    # Alerts
    summary.append("\nAlerts:")
    for alert in generate_alerts(patient):
        summary.append(f"- {alert}")

    # Consultation Summary
    summary.append("\n" + generate_consultation(patient))

    # Follow-Up Summary
    summary.append(generate_follow_up(patient))

    return "\n".join(summary)