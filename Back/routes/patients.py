from fastapi import Body, APIRouter, HTTPException
from fastapi.responses import PlainTextResponse
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

@router.get("/{patient_id}/summary", response_class=PlainTextResponse)
def get_patient_summary(patient_id: str):
    db = read_db()
    for patient in db:
        if patient["id"] == patient_id:
            return generate_summary(patient)
    raise HTTPException(status_code=404, detail="Patient not found")

@router.put("/{patient_id}", response_model=Patient)
def update_patient(patient_id: str, updated_patient: Patient = Body(...)):
    db = read_db()
    for index, patient in enumerate(db):
        if patient["id"] == patient_id:
            db[index] = updated_patient.dict()
            write_db(db)
            return updated_patient
    raise HTTPException(status_code=404, detail="Patient not found")

@router.delete("/{patient_id}")
def delete_patient(patient_id: str):
    db = read_db()
    new_db = [p for p in db if p["id"] != patient_id]
    if len(db) == len(new_db):
        raise HTTPException(status_code=404, detail="Patient not found")
    write_db(new_db)
    return {"detail": "Patient deleted"}