# Mobile Stroke Unit and Remote Neurologist Consultation System
patient1 = {
  "Name": "John Doe", 
  "Age" : "65",
  "Sex" : "Male",
  "Chief complaint" : "Sudden onset of weakness in the left arm and leg",
  "Medical history" : "Hypertention, hyperlipidemia, diabetes",

  "Vital_signs":{
    "Blood pressure": "180/100 mmHg", 
    "Heart rate" : "100 bpm",
    "Respiratory rate" : "20 breaths/min",
    "Oxygen saturation": "95% on room air"
  }, 

"Lab_Results":{
    "CBC" : "normal",
    "BMP" : "elevated glucose (200 mg/dL)",
    "Coagulation studies" : "normal"
    },

"Imaging_Studies":{
  "CT scan of the head": "shows a large infarct in the right middle cerebral artery territory"
  },

  "Remote_Neurologist_Consultation": {
    "Diagnosis" : "Acute ischemic stroke",
    "Treatment" : "tPA administration, blood pressure management, and admission to the ICU"
  }
}

patient2 = {
  "Name": "Jane Smith", 
  "Age" : "50",
  "Sex" : "Female",
  "Chief complaint" : "Sudden onset of difficulty speaking and understanding speech",
  "Medical history" : "None",

  "Vital_signs":{
    "Blood pressure": "120/100 mmHg", 
    "Heart rate" : "80 bpm",
    "Respiratory rate" : "16 breaths/min",
    "Oxygen saturation": "98% on room air"
  }, 

"Lab_Results":{
    "CBC" : "normal",
    "BMP" : "normal",
    "Coagulation studies" : "normal"
    },

"Imaging_Studies":{
  "CT scan of the head": "shows a small infarct in the left posterior cerebral artery territory"
  },

  "Remote_Neurologist_Consultation": {
    "Diagnosis" : "Acute ischemic stroke",
    "Treatment" : "tPA administration, blood pressure management, and admission to the ICU"
  }
}

patient3 = {
  "Name": "Bob Johnson", 
  "Age" : "70",
  "Sex" : "Male",
  "Chief complaint" : "Sudden onset of weakness in the right arm and leg",
  "Medical history" : "Atrial fibrillation, coronary artery disease",

  "Vital_signs":{
    "Blood pressure": "150/90 mmHg", 
    "Heart rate" : "110 bpm",
    "Respiratory rate" : "22 breaths/min",
    "Oxygen saturation": "92% on room air"
  }, 

"Lab_Results":{
    "CBC" : "normal",
    "BMP" : "elevated creatinine (1.5 mg/dL)",
    "Coagulation studies" : "normal"
    },

"Imaging_Studies":{
  "CT scan of the head": "shows a large infarct in the left middle cerebral artery territory"
  },

  "Remote_Neurologist_Consultation": {
    "Diagnosis" : "Acute ischemic stroke",
    "Treatment" : "tPA administration, blood pressure management, and admission to the ICU for close monitoring"
  }
}

patient4 = {
  "Name": "Maria Rodriguez", 
  "Age" : "40",
  "Sex" : "Female",
  "Chief complaint" : "Sudden onset of headache and confusion",
  "Medical history" : "Migraines, depression",

  "Vital_signs":{
    "Blood pressure": "140/90 mmHg", 
    "Heart rate" : "90 bpm",
    "Respiratory rate" : "18 breaths/min",
    "Oxygen saturation": "96% on room air"
  }, 

"Lab_Results":{
    "CBC" : "normal",
    "BMP" : "normal",
    "Coagulation studies" : "normal"
    },

"Imaging_Studies":{
  "CT scan of the head": "shows a small hemorrhage in the right frontal lobe"
  },

  "Remote_Neurologist_Consultation": {
    "Diagnosis" : "Acute hemorrhagic stroke",
    "Treatment" : "blood pressure management, admission to the ICU for close monitoring, and possible surgical intervention"
  }
}

patients = [patient1, patient2, patient3, patient4]


def consult_patient(patient):
        summary = ""
        summary += f"These are the vital signs for patient {patient['Name']}:\n"
        summary += f"- Blood Pressure: {patient['Vital_signs']['Blood pressure']}\n"
        summary += f"- Heart Rate: {patient['Vital_signs']['Heart rate']}\n"
        summary += f"- Respiratory rate: {patient['Vital_signs']['Respiratory rate']} \n"
        summary += f"- Oxygen saturation: {patient['Vital_signs']['Oxygen saturation']}\n \n"
        summary += f"Their lab results are as follows:\n"
        summary += f"- Complete Blood Count (CBC): {patient['Lab_Results']['CBC']} \n"
        summary += f"- Basic Metabolic Panel (BMP): {patient['Lab_Results']['BMP']}\n \n"
        summary += f"Their imaging {patient['Imaging_Studies']['CT scan of the head']}.\n \n"
        summary += f"Based on this information, the patient's diagnosis is {patient['Remote_Neurologist_Consultation']['Diagnosis']} and the treatment to be administered is {patient['Remote_Neurologist_Consultation']['Treatment']}.\n"
        summary += "\n" + "-"*80 + "\n"

        return summary


def patient_alerts(patient):
        bp = patient['Vital_signs']['Blood pressure'].index("/") 
        bp2 = patient['Vital_signs']['Blood pressure'].index(" ") 

        systolic = int(patient['Vital_signs']['Blood pressure'][0: bp])
        diastolic = int(patient['Vital_signs']['Blood pressure'][bp + 1: bp2])
        
        heart_rate = int(patient['Vital_signs']['Heart rate'].split()[0])

        oxygen_saturation = int(patient['Vital_signs']['Oxygen saturation'].split("%")[0])

        imaging = patient['Imaging_Studies']['CT scan of the head']

        alert = f"⚠️ Alerts for {patient['Name']} ⚠️:\n"
        if systolic >= 180:
            alert += "- Systolic blood pressure is critically high!\n"
            alert += "- Blood pressure is critically high!\n"

        if diastolic >= 110:
            alert += "- Diastolic blood pressure is critically high!\n"            

        if heart_rate >= 110:
            alert += "- Heart rate is too high\n"

        if oxygen_saturation <= 94:
            alert += "- Oxygen saturation is low!\n"

        if "hemorrhage" in imaging.lower():
            alert += "- Hemorrhage detected on CT scan.\n"

        if alerts.strip() == f"⚠️ Alerts for {patient['Name']} ⚠️:":
          alerts += "- No critical alerts found."

        alert += "-" * 50 + "\n" 
        return alert 


def follow_up(patient):
        treatment = patient['Remote_Neurologist_Consultation']['Treatment']
        summary = f"Follow-up Plan for {patient['Name']}\n"
        if "ICU" in treatment:
            summary += f"{patient['Name']} will be admitted to the ICU.\n"

        if "therapy" in treatment:
            summary += f"{patient['Name']} will be scheduled for therapy.\n"

        if "monitoring" in treatment:
            summary += f"{patient['Name']} will be under hospital observation.\n"

        if "surgical" in treatment:
            summary += f"{patient['Name']} requires surgical evaluation.\n"

        summary += "-"*72 + "\n"
        return summary


def export_summary(patient):
    for patient in patients:
        file_name = f"{patient['Name'].replace('',"_").lower()}.txt"
        
        with open(file_name, "w") as file:
            file.write(f"Patient Name: {patient['Name']}\n")
            file.write(f"Age: {patient['Age']}\n")
            file.write(f"Sex: {patient['Sex']}\n")
            file.write(f"Chief Complaint: {patient['Chief complaint']}\n\n")

            file.write("Vital Signs:\n")
            for key, value in patient["Vital_signs"].items():
                file.write(f"  - {key}: {value}\n")
            file.write("\n")

            file.write("Lab Results:\n")
            for key, value in patient["Lab_Results"].items():
                file.write(f"  - {key}: {value}\n")
            file.write("\n")

            file.write("Imaging:\n")
            for key, value in patient["Imaging_Studies"].items():
                file.write(f"  - {key}: {value}\n")
            file.write("\n")

            consultation = patient["Remote_Neurologist_Consultation"]
            file.write("Neurologist Consultation:\n")
            file.write(f"  - Diagnosis: {consultation['Diagnosis']}\n")
            file.write(f"  - Treatment: {consultation['Treatment']}\n")

        return f"Summary exported for {patient['Name']} to {file_name}"



