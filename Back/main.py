# Back/main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from dependencies           import get_current_user
from routes.users           import router as users_router
from routes.patients        import router as patients_router
from routes.alerts          import router as alerts_router   # ← new

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(
    patients_router,
    dependencies=[Depends(get_current_user)]
)
app.include_router(
    alerts_router,            # ← register here
    dependencies=[Depends(get_current_user)]
)