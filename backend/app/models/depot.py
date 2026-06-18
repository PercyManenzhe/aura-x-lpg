from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from sqlalchemy.sql import func
from app.database.database import Base


class Depot(Base):
    __tablename__ = "depots"

    id = Column(Integer, primary_key=True, index=True)

    # Basic Information
    name = Column(String, unique=True, index=True)
    province = Column(String)

    # GIS Coordinates
    latitude = Column(Float)
    longitude = Column(Float)

    # Capacity Management
    current_stock = Column(Float, default=0)
    max_capacity = Column(Float)

    # NEW
    minimum_stock = Column(Float, default=5000)

    # NEW
    daily_demand = Column(Float, default=1000)

    # NEW
    supplier = Column(String)

    # NEW
    depot_type = Column(String)
    # Storage
    # Import
    # Export
    # Border
    # Distribution

    status = Column(String, default="operational")

    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime, server_default=func.now())

    last_updated = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    def __repr__(self):
        return f"<Depot {self.name}>"
    