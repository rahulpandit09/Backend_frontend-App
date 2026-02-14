from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.core.security import admin_required
from app.utils.hashing import hash_password
from app.schemas.admin_schema import CreateTeacherSchema
from app.schemas.admin_schema import CreateStudentSchema

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.post("/create-teacher")
def create_teacher(
    data: CreateTeacherSchema,
    db: Session = Depends(get_db),
    admin=Depends(admin_required)
):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == data.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    new_teacher = User(
        full_name=data.name,   # ✅ matches model
        email=data.email,      # ✅ matches model
        password=hash_password(data.password),
        role="teacher"
    )

    db.add(new_teacher)
    db.commit()
    db.refresh(new_teacher)

    return {"message": "Teacher created successfully"}


@router.post("/create-student")
def create_student(
    data: CreateStudentSchema,
    db: Session = Depends(get_db),
    admin=Depends(admin_required)
):
    existing_user = db.query(User).filter(User.email == data.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    new_student = User(
        full_name=data.name,
        email=data.email,
        password=hash_password(data.password),
        role="student"
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {"message": "Student created successfully"}