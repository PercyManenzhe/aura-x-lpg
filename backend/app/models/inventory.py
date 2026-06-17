from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from sqlalchemy.sql import func
from app.database.database import Base

class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True, index=True)
    depot_id = Column(Integer, index=True)
    product_type = Column(String, default="LPG")  # LPG type
    quantity = Column(Float)
    unit = Column(String, default="liters")
    reorder_level = Column(Float)
    status = Column(String, default="normal")  # normal, low, critical
    last_updated = Column(DateTime, server_default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"<Inventory depot_id={self.depot_id}>"
