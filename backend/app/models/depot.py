from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from sqlalchemy.sql import func
from app.database.database import Base

class Depot(Base):
    __tablename__ = "depots"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    province = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    current_stock = Column(Float, default=0)
    max_capacity = Column(Float)
    status = Column(String, default="operational")  # operational, maintenance, alert
    is_active = Column(Boolean, default=True)
    last_updated = Column(DateTime, server_default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"<Depot {self.name}>"
