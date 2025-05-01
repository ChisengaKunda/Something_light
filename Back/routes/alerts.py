from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from dependencies import get_current_user
from services.alerts import generate_alerts
from db.db_handler import read_db

router = APIRouter(prefix="/alerts", tags=["Alerts"])

@router.get("/", response_model=List[str])
async def list_all_alerts(user=Depends(get_current_user)):
    """
    Return alerts for **all** patients.
    Only nurses & doctors may call this.
    """
    if user["role"] not in ["nurse", "doctor"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    all_alerts = []
    for patient in read_db():
        all_alerts.extend(generate_alerts(patient))
    return all_alerts

@router.get("/{patient_id}", response_model=List[str])
async def get_alerts_for_patient(patient_id: str, user=Depends(get_current_user)):
    """
    Return alerts for a single patient.
    Only nurses & doctors may call this.
    """
    if user["role"] not in ["nurse", "doctor"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    for p in read_db():
        if p["id"] == patient_id:
            return generate_alerts(p)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found")
