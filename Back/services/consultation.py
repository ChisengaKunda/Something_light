def generate_consultation(patient: dict) -> str:
    lines = []
    lines.append(f"Remote Neurologist Consultation Summary for {patient['name']}")
    lines.append("-" * 72)

    # Core details
    lines.append(f"Chief Complaint: {patient['chief_complaint']}")
    lines.append(f"Medical History: {patient.get('medical_history', 'N/A')}")
    lines.append(f"NIHSS Score: {patient.get('nihss_score', 'N/A')}\n")

    lines.append("Vital Signs:")
    for key, value in patient["vital_signs"].items():
        lines.append(f"  - {key.replace('_', ' ').title()}: {value}")

    lines.append("\nLab Results:")
    for key, value in patient["lab_results"].items():
        lines.append(f"  - {key.replace('_', ' ').title()}: {value}")

    lines.append("\nImaging Studies:")
    for key, value in patient["imaging_studies"].items():
        lines.append(f"  - {key.replace('_', ' ').title()}: {value}")

    consult = patient["remote_neurologist_consultation"]
    lines.append("\nNeurologist Assessment:")
    lines.append(f"  - Diagnosis: {consult['diagnosis']}")
    lines.append(f"  - Treatment Plan: {consult['treatment']}")

    lines.append("\nOutcome & Disposition:")
    lines.append(f"  - Outcome: {patient.get('outcome', 'N/A')}")
    lines.append(f"  - Disposition: {patient.get('disposition', 'N/A')}")
    lines.append("-" * 72)

    return "\n".join(lines)
