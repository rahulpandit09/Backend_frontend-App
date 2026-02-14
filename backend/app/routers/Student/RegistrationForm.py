from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.Student.RegistrationForm import Student
from app.schemas.Student.RegistrationForm import StudentCreate
from fastapi import HTTPException
from typing import List
from app.schemas.Student.RegistrationForm import StudentResponse


router = APIRouter(prefix="/students", tags=["Student Registration"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register_student(student: StudentCreate, db: Session = Depends(get_db)):
    new_student = Student(**student.model_dump())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {
        "message": "Student Registered Successfully",
        "id": new_student.id
    }

@router.get("/{student_id}", response_model=StudentResponse)
def get_student_by_id(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return student


@router.get("/", response_model=List[StudentResponse])
def get_all_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    return students
