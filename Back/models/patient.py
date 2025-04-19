from pydantic import BaseModel, Field
from datetime import datetime
from uuid import uuid4

class VitalSigns(BaseModel):
    blood_pressure: str
    heart_rate: str
    respiratory_rate: str
    oxygen_saturation: str

class LabResults(BaseModel):
    cbc: str
    bmp: str
    coagulation_studies: str

class ImagingStudies(BaseModel):
    ct_scan: str

class NeurologistConsultation(BaseModel):
    diagnosis: str
    treatment: str

class Patient(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    age: int
    sex: str
    chief_complaint: str
    medical_history: str
    nihss_score: int
    vital_signs: VitalSigns
    lab_results: LabResults
    imaging_studies: ImagingStudies
    remote_neurologist_consultation: NeurologistConsultation
    outcome: str
    disposition: str
    created_at: str = Field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d %H:%M:%S"))