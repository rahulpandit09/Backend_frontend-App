from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.security import admin_required
from app.database import get_db
from app.models.admin.addStudent import AdminStudent
from app.models.admin.fee import Fee
from app.schemas.admin.addStudent_schema import StudentCreate
# from app.core.security import admin_required   # enable later

router = APIRouter(prefix="/admin/students", tags=["Admin Students"])

@router.post("/create")
def create_student(
    data: StudentCreate,
    db: Session = Depends(get_db),
    # admin=Depends(admin_required)
):

    # -----------------------------
    # 1️⃣ Validate Fees
    # -----------------------------
    if data.total_fees < 0 or data.paid_amount < 0:
        raise HTTPException(
            status_code=400,
            detail="Fees cannot be negative"
        )

    if data.paid_amount > data.total_fees:
        raise HTTPException(
            status_code=400,
            detail="Paid amount cannot exceed total fees"
        )

    # -----------------------------
    # 2️⃣ Generate Student Code
    # -----------------------------
    last_student = db.query(AdminStudent).order_by(AdminStudent.id.desc()).first()
    next_id = 1 if not last_student else last_student.id + 1
    student_code = f"STU-{str(next_id).zfill(3)}"

    # -----------------------------
    # 3️⃣ Calculate Pending
    # -----------------------------
    pending = data.total_fees - data.paid_amount

    # -----------------------------
    # 4️⃣ Status Logic (CORRECT)
    # -----------------------------
    if data.paid_amount == 0:
        status = "Unpaid"
    elif data.paid_amount == data.total_fees:
        status = "Paid"
    else:
        status = "Pending"

    # -----------------------------
    # 5️⃣ Create Student
    # -----------------------------
    new_student = AdminStudent(
        student_id=student_code,
        name=data.name,
        phone=data.phone,
        email=data.email,
        dob=data.dob,
        address=data.address,
        course=data.course,
        batch=data.batch,
        admission_date=data.admission_date,
        status=status
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    # -----------------------------
    # 6️⃣ Create Fee Record
    # -----------------------------
    new_fee = Fee(
        student_id=new_student.id,
        total_fees=data.total_fees,
        paid_amount=data.paid_amount,
        pending_amount=pending,
        payment_mode=data.payment_mode,
        notes=data.notes
    )

    db.add(new_fee)
    db.commit()

    return {
        "message": "Student created successfully",
        "student_id": student_code,
        "status": status,
        "pending_amount": pending
    }



@router.get("/next-id")
def get_next_student_id(db: Session = Depends(get_db)):
    
    last_student = db.query(AdminStudent).order_by(AdminStudent.id.desc()).first()
    # admin=Depends(admin_required)
    next_id = 1 if not last_student else last_student.id + 1
    student_code = f"STU-{str(next_id).zfill(3)}"

    return {"student_id": student_code}



# ✅ GET ALL STUDENTS
@router.get("/")
def get_all_students(
    db: Session = Depends(get_db),
    # admin=Depends(admin_required)
):
    students = db.query(AdminStudent).all()
    return students


# ✅ GET STUDENT BY ID

@router.get("/{student_id}")
def get_student_by_id(
    student_id: int,
    db: Session = Depends(get_db),
    # admin=Depends(admin_required)
):
    student = db.query(AdminStudent).filter(
        AdminStudent.id == student_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return student


# ✅ GET STUDENT + FEE DETAILS

@router.get("/{student_id}/details")
def get_student_with_fee(
    student_id: int,
    db: Session = Depends(get_db),
    # admin=Depends(admin_required)
):
    student = db.query(AdminStudent).filter(
        AdminStudent.id == student_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    fee = db.query(Fee).filter(
        Fee.student_id == student.id
    ).first()

    return {
        "student": student,
        "fee": fee
    }
