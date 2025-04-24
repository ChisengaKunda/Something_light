from pydantic import BaseModel

class UserBase(BaseModel):
    name: str
    role: str  # "doctor", "nurse", or "patient"
