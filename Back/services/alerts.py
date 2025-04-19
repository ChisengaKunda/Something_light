def generate_alerts(patient: dict) -> list:
    alerts = []
    try:
        systolic, diastolic = map(int, patient["vital_signs"]["blood_pressure"].split("/"))
    except ValueError:
        systolic = diastolic = -1

    try:
        heart_rate = int(patient["vital_signs"]["heart_rate"])
    except ValueError:
        heart_rate = -1

    try:
        oxygen_saturation = int(patient["vital_signs"]["oxygen_saturation"].replace("%", ""))
    except ValueError:
        oxygen_saturation = -1

    scan = patient["imaging_studies"]["ct_scan"].lower()
    nihss = patient.get("nihss_score", -1)
    coag = patient["lab_results"]["coagulation_studies"].lower()

    if systolic >= 180:
        alerts.append("High systolic blood pressure")
    if diastolic >= 120:
        alerts.append("High diastolic blood pressure")
    if heart_rate >= 110:
        alerts.append("High heart rate")
    if heart_rate <= 60 and heart_rate != -1:
        alerts.append("Low heart rate")
    if oxygen_saturation < 90 and oxygen_saturation != -1:
        alerts.append("Low oxygen saturation")
    if "hemorrhage" in scan:
        alerts.append("Hemorrhage detected in CT scan")
    if "ischemia" in scan:
        alerts.append("Ischemia detected in CT scan")
    if nihss >= 15:
        alerts.append("High NIHSS score indicating moderate to severe stroke")
    if "abnormal" in coag:
        alerts.append("Abnormal coagulation study result")

    return alerts if alerts else ["No significant alerts detected."]
