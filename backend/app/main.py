from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.EVLoogBooks.erv_log import router as erv_log_router
from app.database import Base, engine
from app.routers import auth, course, student
from app.routers import moc
from app.routers.EVLoogBooks import mfm_log



# import models so SQLAlchemy registers them
from app.models import user, course as course_model, lecture, enrollment, test, result

app = FastAPI(title="Coaching Portal API")

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

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(course.router)
app.include_router(student.router)
app.include_router(moc.router)
app.include_router(erv_log_router)
app.include_router(mfm_log.router)



@app.get("/")
def root():
    return {"message": "Coaching Portal Backend Running"}
