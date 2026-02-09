# app/models/mfm_log.py

from sqlalchemy import Column, Integer, String, Date, Time
from sqlalchemy.orm import relationship
from app.database import Base

class MFMLog(Base):
    __tablename__ = "mfm_logs"

    id = Column(Integer, primary_key=True, index=True)
    station = Column(String, nullable=False)
    shift = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    incharge = Column(String)
    start_time = Column(String)

    rows = relationship("MFMLogRow", back_populates="log", cascade="all, delete")
    electrical = relationship("MFMLogElectrical", back_populates="log", uselist=False, cascade="all, delete")
