# auth/routes.py
from fastapi import APIRouter, HTTPException, status, Depends, Form
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from auth import hashing, jwt_handler, users_db

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post(
    "/create",
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user (username, email, password, role, name)"
)
def create_user(
    username: str = Form(...),
    email:    str = Form(...),
    password: str = Form(...),
    role:     str = Form(...),
    name:     str = Form(...)
):
    # 1️⃣ Username uniqueness
    if users_db.user_exists(username):
        raise HTTPException(status_code=400, detail="Username already exists")

    # 2️⃣ Email uniqueness
    if users_db.get_user_by_email(email):
        raise HTTPException(status_code=400, detail="Email already in use")

    # 3️⃣ Password length
    if len(password) > 15:
        raise HTTPException(
            status_code=400,
            detail="Password must be less than 15 characters"
        )

    # 4️⃣ Valid role
    role = role.lower()
    if role not in ("patient", "nurse", "doctor"):
        raise HTTPException(
            status_code=400,
            detail="Invalid role. Must be 'patient', 'nurse', or 'doctor'"
        )

    # 5️⃣ Hash & save
    hashed = hashing.hash_password(password)
    users_db.save_user(username, email, hashed, role, name)

    return {"message": "User registered successfully. Please log in."}


@router.post(
    "/token",
    summary="Obtain access token (login via username or email)"
)
def login_user(form_data: OAuth2PasswordRequestForm = Depends()):
    identifier = form_data.username
    pwd        = form_data.password

    # Try username first, then email
    user = users_db.get_user(identifier)
    if not user:
        user = users_db.get_user_by_email(identifier)

    if not user or not hashing.check_password(pwd, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username/email or password"
        )

    access_token = jwt_handler.create_access_token(
        data={"sub": user["username"], "role": user["role"]},
        expires_delta=timedelta(minutes=30)
    )

    return {
        "access_token": access_token,
        "token_type":   "bearer",
        "username":     user["username"],
        "role":         user["role"],
    }