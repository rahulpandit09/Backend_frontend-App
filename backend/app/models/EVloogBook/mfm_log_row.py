# app/models/mfm_log_row.py

from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class MFMLogRow(Base):
    __tablename__ = "mfm_log_rows"

    id = Column(Integer, primary_key=True)
    log_id = Column(Integer, ForeignKey("mfm_logs.id"))

    time = Column(String)
    product = Column(String)
    batch = Column(String)
    density = Column(Float)
    temp = Column(Float)

    pump_abc = Column(Float)
    lub_oil_pressure = Column(Float)
    diff_pressure = Column(Float)

    fmr_gross = Column(Float)
    fmr_net = Column(Float)
    fmr_mass = Column(Float)

    flow_net = Column(Float)
    flow_mass = Column(Float)

    voltage_r = Column(Float)
    voltage_y = Column(Float)
    voltage_b = Column(Float)

    load_r = Column(Float)
    load_y = Column(Float)
    load_b = Column(Float)

    remarks = Column(String)

    log = relationship("MFMLog", back_populates="rows")
