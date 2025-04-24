from pydantic import BaseModel
from models.user import UserBase
from typing import Optional, Dict

class VitalSigns(BaseModel):
    blood_pressure: str
    heart_rate: str
    respiratory_rate: str
    oxygen_saturation: str

class LabResults(BaseModel):
    cbc: str
    bmp: str
    coagulation_studies: str

class Imaging(BaseModel):
    ct_scan: str

class RemoteConsultation(BaseModel):
    diagnosis: str
    treatment: str

class Patient(UserBase):
    age: int
    sex: str
    chief_complaint: str
    medical_history: str
    nihss_score: int
    vital_signs: VitalSigns
    lab_results: LabResults
    imaging_studies: Imaging
    remote_neurologist_consultation: RemoteConsultation
    outcome: Optional[str]
    disposition: Optional[str]
    created_at: str
    role: str = "patient"
