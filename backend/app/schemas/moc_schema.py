from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional


class MOCCreate(BaseModel):
    station_name: str
    title: str
    date: date
    priority: Optional[str] = None
    modification_type: Optional[str] = None
    time_limit: Optional[str] = None

    shutdown_required: bool = False
    # shutdown_required:Optional[str] = None

    present_system: Optional[str] = None
    proposed_change: Optional[str] = None
    justification: Optional[str] = None
    objectives: Optional[str] = None
    other_units_impacted: Optional[str] = None

    statutory_approval_required: Optional[str] = None
    statutory_approval_details: Optional[str] = None

    impact_of_modification: Optional[str] = None
    consequences_non_implementation: Optional[str] = None

    hse: bool = False
    efficiency: bool = False
    quality: bool = False
    reliability: bool = False

    other_aspects: Optional[str] = None
    objectives_achieved: Optional[str] = None

    attachments: Optional[str] = None
    comments: Optional[str] = None

    status: Optional[str] = "draft"
    is_active: Optional[bool] = True

    created_by: Optional[str] = None
    updated_by: Optional[str] = None


class MOCResponse(MOCCreate):
    id: int
    submission_date: datetime

    class Config:
        from_attributes = True
