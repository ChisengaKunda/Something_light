from fastapi import APIRouter, Depends, HTTPException
from auth.dependencies import role_required, get_current_user
from auth.users_db import load_users

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/doctors")
def get_doctors(user: dict = Depends(role_required("doctor"))):
    users = load_users()
    return [u for u in users.values() if u["role"] == "doctor"]

@router.get("/nurses")
def get_nurses(user: dict = Depends(role_required("doctor"))):
    users = load_users()
    return [u for u in users.values() if u["role"] == "nurse"]

@router.get("/patients")
def get_patients(user: dict = Depends(role_required("doctor"))):
    users = load_users()
    return [u for u in users.values() if u["role"] == "patient"]