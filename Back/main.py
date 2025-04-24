from fastapi import FastAPI
from auth.routes import router as auth_router
from routes.patients import router as patients_router
from routes.users import router as user_router

app = FastAPI()

app.include_router(patients_router)
app.include_router(auth_router)
app.include_router(user_router)