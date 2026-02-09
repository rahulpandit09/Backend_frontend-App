from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.EVloogBook.mfm_log import MFMLog
from app.models.EVloogBook.mfm_log_row import MFMLogRow
from app.models.EVloogBook.mfm_log_electrical import MFMLogElectrical
from app.schemas.EVLoogBook.mfm_log import MFMLogCreate, MFMLogResponse

router = APIRouter(prefix="/mfm-log", tags=["MFM Log"])


@router.post("/", response_model=MFMLogResponse)
def create_log(log: MFMLogCreate, db: Session = Depends(get_db)):

    db_log = MFMLog(
        station=log.station,
        shift=log.shift,
        date=log.date,
        incharge=log.incharge,
        start_time=log.start_time,
    )

    db.add(db_log)
    db.flush()

    for row in log.rows:
        db_row = MFMLogRow(**row.dict(), log_id=db_log.id)
        db.add(db_row)

    db_electrical = MFMLogElectrical(
        **log.electrical.dict(),
        log_id=db_log.id
    )
    db.add(db_electrical)

    db.commit()
    db.refresh(db_log)

    return db_log


@router.get("/", response_model=List[MFMLogResponse])
def get_logs(db: Session = Depends(get_db)):
    return db.query(MFMLog).all()
