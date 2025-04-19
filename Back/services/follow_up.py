def generate_follow_up(patient: dict) -> str:
    name = patient["name"]
    treatment = patient["remote_neurologist_consultation"]["treatment"].lower()
    disposition = patient.get("disposition", "").lower()
    outcome = patient.get("outcome", "").lower()
    nihss = patient.get("nihss_score", 0)

    summary = [f"Follow-Up Plan for {name}"]
    summary.append("-" * 72)

    # Based on NIHSS severity
    if nihss >= 15:
        summary.append("- High NIHSS score: Continuous monitoring recommended.")
    elif nihss >= 6:
        summary.append("- Moderate NIHSS score: Reevaluation in 24–48 hours advised.")
    elif nihss < 6:
        summary.append("- Mild NIHSS score: Outpatient follow-up may be sufficient.")

    # Treatment-based follow-up
    if "icu" in treatment or "icu" in disposition:
        summary.append(f"- {name} will be admitted to the ICU for intensive care.")
    if "speech therapy" in treatment or "therapy" in treatment:
        summary.append(f"- {name} will be referred for rehabilitation or speech therapy.")
    if "surgical" in treatment:
        summary.append(f"- Surgical consultation is required for {name}.")
    if "monitoring" in treatment or "monitoring" in disposition:
        summary.append(f"- {name} will remain under hospital observation.")

    # Disposition
    if "transfer" in disposition:
        summary.append(f"- Patient will be transferred to another facility for specialized care.")
    if "discharged" in disposition:
        summary.append(f"- Discharge instructions and outpatient follow-up to be provided.")

    # Outcome
    if outcome:
        summary.append(f"- Clinical outcome: Patient has {outcome}.")

    summary.append("-" * 72)
    return "\n".join(summary)
