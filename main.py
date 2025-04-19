from fastapi import FastAPI
from routes.patients import router as patients_router

app = FastAPI()

app.include_router(patients_router)