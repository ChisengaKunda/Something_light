from fastapi import APIRouter, HTTPException
from typing import List
from models.patient import Patient
from db.db_handler import read_db, write_db
from services.alerts import generate_alerts
from services.consultation import generate_consultation
from services.follow_up import generate_follow_up
from utils.export import generate_summary

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.post("/", response_model=Patient)
def add_patient(patient: Patient):
    db = read_db()
    db.append(patient.dict())
    write_db(db)
    return patient

@router.get("/", response_model=List[Patient])
def get_all_patients():
    return read_db()

@router.get("/{patient_id}", response_model=Patient)
def get_patient_by_id(patient_id: str):
    db = read_db()
    for patient in db:
        if patient["id"] == patient_id:
            return patient
    raise HTTPException(status_code=404, detail="Patient not found")

@router.get("/{patient_id}/alerts", response_model=List[str])
def get_patient_alerts(patient_id: str):
    db = read_db()
    for patient in db:
        if patient["id"] == patient_id:
            return generate_alerts(patient)
    raise HTTPException(status_code=404, detail="Patient not found")

@router.get("/{patient_id}/consultation", response_model=str)
def get_patient_consultation(patient_id: str):
    db = read_db()
    for patient in db:
        if patient["id"] == patient_id:
            return generate_consultation(patient)
    raise HTTPException(status_code=404, detail="Patient not found")

@router.get("/{patient_id}/follow-up", response_model=str)
def get_patient_follow_up(patient_id: str):
    db = read_db()
    for patient in db:
        if patient["id"] == patient_id:
            return generate_follow_up(patient)
    raise HTTPException(status_code=404, detail="Patient not found")

@router.get("/{patient_id}/summary", response_model=str)
def get_patient_summary(patient_id: str):
    db = read_db()
    for patient in db:
        if patient["id"] == patient_id:
            return generate_summary(patient)
    raise HTTPException(status_code=404, detail="Patient not found")
