from fastapi import APIRouter, Depends, HTTPException, status
from dependencies import get_current_user
from user_store import get_all_users, add_user, get_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register", status_code=201)
async def register(username: str, password: str, role: str = "nurse"):
    if get_user(username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )
    add_user(username, password, role)
    return {"username": username, "role": role}

@router.get("/me")
async def read_current_user(current_user: dict = Depends(get_current_user)):
    """
    Returns the authenticated user's info (username & role).
    """
    return current_user

@router.get("/doctors")
async def list_doctors():
    users = get_all_users()
    return [
        {"username": u, **info}
        for u, info in users.items() if info["role"] == "doctor"
    ]

@router.get("/nurses")
async def list_nurses():
    users = get_all_users()
    return [
        {"username": u, **info}
        for u, info in users.items() if info["role"] == "nurse"
    ]

@router.get("/patients")
async def list_patients_users():
    users = get_all_users()
    return [
        {"username": u, **info}
        for u, info in users.items() if info["role"] == "patient"
    ]