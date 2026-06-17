from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from sqlalchemy.sql import func
from app.database.database import Base

class Tanker(Base):
    __tablename__ = "tankers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    capacity = Column(Float)
    current_load = Column(Float, default=0)
    current_location = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    status = Column(String, default="idle")  # active, idle, maintenance
    last_maintenance = Column(DateTime)
    is_active = Column(Boolean, default=True)
    last_updated = Column(DateTime, server_default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"<Tanker {self.name}>"
