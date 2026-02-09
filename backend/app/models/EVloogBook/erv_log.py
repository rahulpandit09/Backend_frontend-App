from sqlalchemy import Column, Integer, String, Float, Date
from app.database import Base

class ERVLog(Base):
    __tablename__ = "erv_logs"

    id = Column(Integer, primary_key=True, index=True)
    station = Column(String)
    shift = Column(String)
    date = Column(Date)

    pump_101a_prev = Column(Float)
    pump_101a_current = Column(Float)
    pump_101a_total = Column(Float)

    line_fill_batch = Column(String)
    line_fill_qty = Column(Float)

    shutdown_pr = Column(Float)
    shutdown_cur = Column(Float)
    shutdown_tot = Column(Float)

    power_day = Column(Float)
    power_month = Column(Float)
    power_year = Column(Float)
