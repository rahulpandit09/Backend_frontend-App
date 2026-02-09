from pydantic import BaseModel
from datetime import date

class ERVLogBase(BaseModel):
    station: str
    shift: str
    date: date

    pump_101a_prev: float
    pump_101a_current: float
    pump_101a_total: float

    line_fill_batch: str
    line_fill_qty: float

    shutdown_pr: float
    shutdown_cur: float
    shutdown_tot: float

    power_day: float
    power_month: float
    power_year: float


class ERVLogCreate(ERVLogBase):
    pass


class ERVLogResponse(ERVLogBase):
    id: int

    class Config:
        from_attributes = True
    

