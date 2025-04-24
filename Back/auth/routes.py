# auth/routes.py
from fastapi import APIRouter, HTTPException, status, Depends, Form
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from auth import hashing, jwt_handler, users_db
from models.user import UserBase

router = APIRouter()

@router.post("/create")
def create_user(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    role: str = Form(...),
    name: str = Form(...)
):
    if users_db.user_exists(username):
        raise HTTPException(status_code=400, detail="Username already exists")

    if len(password) > 15:
        raise HTTPException(status_code=400, detail="Password must be less than 15 characters")

    if role.lower() not in ["patient", "nurse", "doctor"]:
        raise HTTPException(status_code=400, detail="Invalid role. Must be 'patient', 'nurse', or 'doctor'")

    hashed_password = hashing.hash_password(password)
    users_db.create_user(username, hashed_password, email, role.lower(), name)
    return {"message": "User registered successfully. Please log in."}


@router.post("/token")
def login_user(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_db.get_user(form_data.username)
    if not user or not hashing.check_password(form_data.password, user['hashed_password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = jwt_handler.create_access_token(
        data={"sub": form_data.username, "role": user["role"]},
        expires_delta=timedelta(minutes=30)
    )
    return {"access_token": token, "token_type": "bearer"}
