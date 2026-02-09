# app/models/mfm_log_electrical.py

from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class MFMLogElectrical(Base):
    __tablename__ = "mfm_log_electrical"

    id = Column(Integer, primary_key=True)
    log_id = Column(Integer, ForeignKey("mfm_logs.id"))

    dc_voltage = Column(Float)
    dc_current = Column(Float)
    ac_voltage = Column(Float)
    ac_current = Column(Float)
    battery_cell_voltage = Column(Float)
    battery_earth_leak = Column(Float)

    dg_liters = Column(Float)
    kwh = Column(Float)
    kvarh = Column(Float)
    pf = Column(Float)

    log = relationship("MFMLog", back_populates="electrical")
