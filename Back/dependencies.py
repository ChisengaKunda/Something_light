from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import secrets
from user_store import get_user

security = HTTPBasic()

async def get_current_user(
    credentials: HTTPBasicCredentials = Depends(security),
):
    """
    Validates HTTP Basic credentials against the JSON user store.
    Returns {username, role} on success.
    """
    user = get_user(credentials.username)
    if not user or not secrets.compare_digest(
        credentials.password, user["password"]
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return {"username": credentials.username, "role": user["role"]}