from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.EVloogBook.erv_log import ERVLog
from app.schemas.EVLoogBook.erv_log import ERVLogCreate, ERVLogResponse
from typing import List

router = APIRouter(prefix="/erv-log", tags=["MFMLOOG NIR {ERVLog}"])

# Create Log
@router.post("/", response_model=ERVLogResponse)
def create_log(log: ERVLogCreate, db: Session = Depends(get_db)):
    db_log = ERVLog(**log.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log


# Get All Logs
@router.get("/", response_model=List[ERVLogResponse])
def get_logs(db: Session = Depends(get_db)):
    return db.query(ERVLog).all()


# Get by Date
@router.get("/{log_date}", response_model=List[ERVLogResponse])
def get_by_date(log_date: str, db: Session = Depends(get_db)):
    return db.query(ERVLog).filter(ERVLog.date == log_date).all()


# Update
@router.put("/{log_id}")
def update_log(log_id: int, log: ERVLogCreate, db: Session = Depends(get_db)):
    db_log = db.query(ERVLog).filter(ERVLog.id == log_id).first()

    if not db_log:
        raise HTTPException(status_code=404, detail="Log not found")

    for key, value in log.dict().items():
        setattr(db_log, key, value)

    db.commit()
    return {"message": "Updated successfully"}
