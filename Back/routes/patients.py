from fastapi import APIRouter, Body, HTTPException
from fastapi.responses import PlainTextResponse
from typing import List
from models.patient        import Patient
from db.db_handler         import read_db, write_db
from services.alerts       import generate_alerts
from services.consultation import generate_consultation
from services.follow_up    import generate_follow_up
from utils.export          import generate_summary

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.post("/", response_model=Patient)
async def add_patient(patient: Patient):
    db = read_db()
    db.append(patient.dict())
    write_db(db)
    return patient

@router.get("/", response_model=List[Patient])
async def get_all_patients():
    return read_db()

@router.get("/{patient_id}", response_model=Patient)
async def get_by_id(patient_id: str):
    for p in read_db():
        if p["id"] == patient_id:
            return p
    raise HTTPException(status_code=404, detail="Patient not found")

@router.get(
    "/{patient_id}/consultation",
    response_model=str
)
async def get_consultation(patient_id: str):
    for p in read_db():
        if p["id"] == patient_id:
            return generate_consultation(p)
    raise HTTPException(status_code=404, detail="Patient not found")

@router.get(
    "/{patient_id}/follow-up",
    response_model=str
)
async def get_follow_up(patient_id: str):
    for p in read_db():
        if p["id"] == patient_id:
            return generate_follow_up(p)
    raise HTTPException(status_code=404, detail="Patient not found")

@router.get("/{patient_id}/summary", response_class=PlainTextResponse)
async def get_summary(patient_id: str):
    for p in read_db():
        if p["id"] == patient_id:
            return generate_summary(p)
    raise HTTPException(status_code=404, detail="Patient not found")

@router.put("/{patient_id}", response_model=Patient)
async def update_patient(patient_id: str, updated: Patient = Body(...)):
    db = read_db()
    for i, p in enumerate(db):
        if p["id"] == patient_id:
            db[i] = updated.dict()
            write_db(db)
            return updated
    raise HTTPException(status_code=404, detail="Patient not found")

@router.delete("/{patient_id}")
async def delete_patient(patient_id: str):
    db = read_db()
    new_db = [p for p in db if p["id"] != patient_id]
    if len(db) == len(new_db):
        raise HTTPException(status_code=404, detail="Patient not found")
    write_db(new_db)
    return {"detail": "Patient deleted"}