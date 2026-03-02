from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine

# Routers
from app.routers import auth, course, student, moc, admin
from app.routers.EVLoogBooks.erv_log import router as erv_log_router
from app.routers.EVLoogBooks import mfm_log
from app.routers.Student import RegistrationForm
from app.routers.studentAdmin import addStudent
from app.routers.studentAdmin import admin_dashboard
from app.routers.studentAdmin import adminDashboard_router

# ✅ Import ALL models so SQLAlchemy registers them
from app.models import user, course as course_model, lecture, enrollment, test, result

# 🔥 VERY IMPORTANT — ADD THESE TWO LINES
from app.models.admin.addStudent import AdminStudent
from app.models.admin.fee import Fee
from app.routers.studentAdmin import admin_notification

app = FastAPI(title="Coaching Portal API")

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Create Tables on Startup
# =========================
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

# =========================
# Include Routers
# =========================
app.include_router(auth.router)
app.include_router(course.router)
app.include_router(student.router)
app.include_router(moc.router)
app.include_router(erv_log_router)
app.include_router(mfm_log.router)
app.include_router(RegistrationForm.router)
app.include_router(admin.router)
app.include_router(addStudent.router)
app.include_router(admin_dashboard.router)
app.include_router(admin_notification.router)
# app.include_router(adminDashboard_router.router, prefix="/adminDashboard_router", tags=["adminDashboard_router"])
app.include_router(adminDashboard_router.router)

# =========================
# Root Endpoint
# =========================
@app.get("/")
def root():
    return {"message": "Coaching Portal Backend Running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}