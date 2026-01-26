from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime
from sqlalchemy.sql import func
from app.database import Base


class MOC(Base):
    __tablename__ = "mocs"

    id = Column(Integer, primary_key=True, index=True)

    station_name = Column(String, nullable=False)
    title = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    priority = Column(String)
    modification_type = Column(String)
    time_limit = Column(String)

    shutdown_required = Column(Boolean, default=False)
    # shutdown_required = Column(String)

    present_system = Column(String)
    proposed_change = Column(String)
    justification = Column(String)
    objectives = Column(String)
    other_units_impacted = Column(String)

    statutory_approval_required = Column(String)
    statutory_approval_details = Column(String)

    impact_of_modification = Column(String)
    consequences_non_implementation = Column(String)

    hse = Column(Boolean, default=False)
    efficiency = Column(Boolean, default=False)
    quality = Column(Boolean, default=False)
    reliability = Column(Boolean, default=False)

    other_aspects = Column(String)
    objectives_achieved = Column(String)

    attachments = Column(String)
    comments = Column(String)

    status = Column(String, default="draft")

    is_active = Column(Boolean, default=True)

    created_by = Column(String)
    updated_by = Column(String)

    submission_date = Column(DateTime(timezone=True), server_default=func.now())
