from pydantic import BaseModel
from typing import List
from datetime import date


class MFMLogRowBase(BaseModel):
    time: str
    product: str
    batch: str
    density: float
    temp: float
    pump_abc: float
    fmr_gross: float
    fmr_net: float
    fmr_mass: float
    remarks: str


class MFMLogElectricalBase(BaseModel):
    dc_voltage: float
    dc_current: float
    kwh: float
    pf: float


class MFMLogCreate(BaseModel):
    station: str
    shift: str
    date: date
    incharge: str
    start_time: str
    rows: List[MFMLogRowBase]
    electrical: MFMLogElectricalBase


class MFMLogResponse(MFMLogCreate):
    id: int

    class Config:
        from_attributes = True
