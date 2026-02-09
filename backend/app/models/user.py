from sqlalchemy import Column, Integer, String
from sqlalchemy import column, String, DateTime
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False)  # admin / teacher / student
    reset_token = Column(String, nullable=True)
    reset_token_expiry = Column(DateTime, nullable=True)
