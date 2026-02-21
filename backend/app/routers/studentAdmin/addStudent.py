# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from typing import List

# from app.database import get_db
# from app.models.admin.addStudent import AdminStudent
# from app.models.admin.fee import Fee
# from app.schemas.admin.addStudent_schema import StudentCreate

# router = APIRouter(
#     prefix="/admin/students",
#     tags=["Admin Students"]
# )


# # ============================================================
# # CREATE STUDENT
# # ============================================================
# @router.post("/create")
# def create_student(
#     data: StudentCreate,
#     db: Session = Depends(get_db),
# ):
#     """
#     Create a new student and their fee record.
#     This runs inside a single DB transaction for safety.
#     """

#     # ----------------------------------------------------------
#     # 1️⃣ Validate Fees
#     # ----------------------------------------------------------
#     total = float(data.total_fees)
#     paid = float(data.paid_amount)

#     if total < 0 or paid < 0:
#         raise HTTPException(
#             status_code=400,
#             detail="Fees cannot be negative"
#         )

#     # ----------------------------------------------------------
#     # 2️⃣ Prevent Duplicate Email
#     # ----------------------------------------------------------
#     existing_student = db.query(AdminStudent).filter(
#         AdminStudent.email == data.email
#     ).first()

#     if existing_student:
#         raise HTTPException(
#             status_code=400,
#             detail="Email already exists"
#         )

#     # ----------------------------------------------------------
#     # 3️⃣ Generate Unique Student Code
#     # Example: STU-001, STU-002
#     # ----------------------------------------------------------
#     last_student = db.query(AdminStudent).order_by(
#         AdminStudent.id.desc()
#     ).first()

#     next_id = 1 if not last_student else last_student.id + 1
#     student_code = f"STU-{str(next_id).zfill(3)}"

#     # ----------------------------------------------------------
#     # 4️⃣ Calculate Pending Amount
#     # ----------------------------------------------------------
#     pending = total - paid

#     # ----------------------------------------------------------
#     # 5️⃣ Determine Payment Status
#     # ----------------------------------------------------------
#     if paid == 0:
#         status = "Unpaid"
#     elif paid < total:
#         status = "Pending"
#     elif abs(paid - total) < 0.01:  # Safe float comparison
#         status = "Paid"
#     else:
#         status = "Overpaid"

#     # ----------------------------------------------------------
#     # 6️⃣ Create Student Record
#     # ----------------------------------------------------------
#     new_student = AdminStudent(
#         student_id=student_code,
#         name=data.name,
#         phone=data.phone,
#         email=data.email,
#         dob=data.dob,
#         address=data.address,
#         course=data.course,
#         batch=data.batch,
#         admission_date=data.admission_date,
#         status=status
#     )

#     db.add(new_student)
#     db.flush()  # Get student ID before final commit

#     # ----------------------------------------------------------
#     # 7️⃣ Create Fee Record (Linked to Student)
#     # ----------------------------------------------------------
#     new_fee = Fee(
#         student_id=new_student.id,
#         total_fees=total,
#         paid_amount=paid,
#         pending_amount=pending,
#         payment_mode=data.payment_mode,
#         comments=data.comments
#         # comments=data.comments or ""
#     )

#     db.add(new_fee)

#     # ----------------------------------------------------------
#     # 8️⃣ Final Commit (Single Transaction)
#     # ----------------------------------------------------------
#     db.commit()
#     db.refresh(new_student)

#     return {
#         "message": "Student created successfully",
#         "student_id": student_code,
#         "status": status,
#         "pending_amount": pending
#     }


# # ============================================================
# # GET NEXT STUDENT CODE
# # ============================================================
# @router.get("/next-id")
# def get_next_student_id(db: Session = Depends(get_db)):
#     """
#     Returns the next student code without creating a student.
#     """

#     last_student = db.query(AdminStudent).order_by(
#         AdminStudent.id.desc()
#     ).first()

#     next_id = 1 if not last_student else last_student.id + 1
#     student_code = f"STU-{str(next_id).zfill(3)}"

#     return {"student_id": student_code}


# # ============================================================
# # GET ALL STUDENTS
# # ============================================================
# @router.get("/")
# def get_all_students(db: Session = Depends(get_db)):
#     """
#     Returns all students.
#     """

#     students = db.query(AdminStudent).all()
#     return students


# # ============================================================
# # GET STUDENT BY DATABASE ID
# # ============================================================
# @router.get("/{student_id}")
# def get_student_by_id(
#     student_id: int,
#     db: Session = Depends(get_db),
# ):
#     """
#     Get single student by internal database ID.
#     """

#     student = db.query(AdminStudent).filter(
#         AdminStudent.id == student_id
#     ).first()

#     if not student:
#         raise HTTPException(
#             status_code=404,
#             detail="Student not found"
#         )

#     return student


# # ============================================================
# # GET STUDENT + FEE DETAILS
# # ============================================================
# # @router.get("/{student_id}/details")
# # def get_student_with_fee(
# #     student_id: int,
# #     db: Session = Depends(get_db),
# # ):
# #     """
# #     Get student along with fee details.
# #     """

# #     student = db.query(AdminStudent).filter(
# #         AdminStudent.id == student_id
# #     ).first()

# #     if not student:
# #         raise HTTPException(
# #             status_code=404,
# #             detail="Student not found"
# #         )

# #     fee = db.query(Fee).filter(
# #         Fee.student_id == student.id
# #     ).first()

# #     return {
# #         "student": student,
# #         "fee": fee
# #     }


# @router.get("/{student_id}/details")
# def get_student_with_fee(student_id: int, db: Session = Depends(get_db)):

#     student = db.query(AdminStudent).filter(
#         AdminStudent.id == student_id
#     ).first()

#     if not student:
#         raise HTTPException(status_code=404, detail="Student not found")

#     return {
#         "student": student,
#         "fee": student.fee
#     }


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.admin.addStudent import AdminStudent
from app.models.admin.fee import Fee
from app.schemas.admin.addStudent_schema import StudentCreate

router = APIRouter(
    prefix="/admin/students",
    tags=["Admin Students"]
)

# ============================================================
# CREATE STUDENT + FEE
# ============================================================
@router.post("/create")
def create_student(data: StudentCreate, db: Session = Depends(get_db)):

    total = float(data.total_fees)
    paid = float(data.paid_amount)

    if total < 0 or paid < 0:
        raise HTTPException(status_code=400, detail="Fees cannot be negative")

    # Prevent duplicate email
    existing_student = db.query(AdminStudent).filter(
        AdminStudent.email == data.email
    ).first()

    if existing_student:
        raise HTTPException(status_code=400, detail="Email already exists")

    # Generate Student Code
    last_student = db.query(AdminStudent).order_by(
        AdminStudent.id.desc()
    ).first()

    next_id = 1 if not last_student else last_student.id + 1
    student_code = f"STU-{str(next_id).zfill(3)}"

    pending = total - paid

    # Determine Status
    if paid == 0:
        status = "Unpaid"
    elif paid < total:
        status = "Pending"
    elif abs(paid - total) < 0.01:
        status = "Paid"
    else:
        status = "Overpaid"

    # Create Student
    new_student = AdminStudent(
        student_id=student_code,
        name=data.name,
        phone=data.phone,
        email=data.email,
        address=data.address,
        course=data.course,
        batch=data.batch,
        admission_date=data.admission_date,
        status=status
    )

    db.add(new_student)
    db.flush()  # Get ID

    # Create Fee
    new_fee = Fee(
        student_id=new_student.id,
        total_fees=total,
        paid_amount=paid,
        pending_amount=pending,
        payment_mode=data.payment_mode,
        comments=data.comments or ""  # 🔥 Fix null issue
    )

    db.add(new_fee)
    db.commit()
    db.refresh(new_student)

    return {
        "message": "Student created successfully",
        "student_id": student_code,
        "status": status,
        "pending_amount": pending
    }


# ============================================================
# GET NEXT STUDENT CODE
# ============================================================
@router.get("/next-id")
def get_next_student_id(db: Session = Depends(get_db)):

    last_student = db.query(AdminStudent).order_by(
        AdminStudent.id.desc()
    ).first()

    next_id = 1 if not last_student else last_student.id + 1
    student_code = f"STU-{str(next_id).zfill(3)}"

    return {"student_id": student_code}


# ============================================================
# GET ALL STUDENTS
# ============================================================
@router.get("/")
def get_all_students(db: Session = Depends(get_db)):
    return db.query(AdminStudent).all()


# ============================================================
# GET STUDENT BY ID
# ============================================================
@router.get("/{student_id}")
def get_student_by_id(student_id: int, db: Session = Depends(get_db)):

    student = db.query(AdminStudent).filter(
        AdminStudent.id == student_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return student


# ============================================================
# GET STUDENT WITH FEE (CLEAN VERSION)
# ============================================================
@router.get("/{student_id}/details")
def get_student_with_fee(student_id: int, db: Session = Depends(get_db)):

    student = db.query(AdminStudent).filter(
        AdminStudent.id == student_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # 🔥 Because of relationship, no need to manually query Fee
    fee = student.fee

    return {
        "id": student.id,
        "student_id": student.student_id,
        "name": student.name,
        "phone": student.phone,
        "email": student.email,
        "address": student.address,
        "course": student.course,
        "batch": student.batch,
        "admission_date": student.admission_date,
        "status": student.status,
        "created_at": student.created_at,
        "fee": {
            "total_fees": fee.total_fees if fee else None,
            "paid_amount": fee.paid_amount if fee else None,
            "pending_amount": fee.pending_amount if fee else None,
            "payment_mode": fee.payment_mode if fee else None,
            "comments": fee.comments if fee else None
        } if fee else None
    }