import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from app.database.database import engine, Base, SessionLocal
from app.models.user import User
from app.models.depot import Depot
from app.models.inventory import Inventory
from app.models.tanker import Tanker

def init_db():
    """Initialize database and create tables"""
    Base.metadata.create_all(bind=engine)

def seed_db():
    """Populate database with initial data"""
    init_db()
    db = SessionLocal()

    # Check if data already exists
    if db.query(Depot).first():
        print("Database already seeded")
        db.close()
        return

    # Seed depots
    depots = [
        Depot(
            name="Benoni LPG Hub",
            province="Gauteng",
            latitude=-26.188,
            longitude=28.320,
            current_stock=32000,
            max_capacity=40000,
            minimum_stock=10000,
            daily_demand=1800,
            supplier="RGC",
            depot_type="Distribution",
            status="operational"
        ),

        Depot(
            name="Richards Bay LPG Hub",
            province="KwaZulu-Natal",
            latitude=-28.780,
            longitude=32.040,
            current_stock=42000,
            max_capacity=50000,
            minimum_stock=12000,
            daily_demand=2500,
            supplier="Import Terminal",
            depot_type="Import",
            status="operational"
        ),

        Depot(
            name="Venda Border LPG Hub",
            province="Limpopo",
            latitude=-22.950,
            longitude=30.480,
            current_stock=15000,
            max_capacity=25000,
            minimum_stock=5000,
            daily_demand=1200,
            supplier="RGC",
            depot_type="Border",
            status="operational"
        ),

        Depot(
            name="Barberton LPG Hub",
            province="Mpumalanga",
            latitude=-25.790,
            longitude=31.050,
            current_stock=8000,
            max_capacity=30000,
            minimum_stock=7000,
            daily_demand=1500,
            supplier="Pipeline",
            depot_type="Industrial",
            status="alert"
        )
    ]

    db.add_all(depots)
    db.commit()
    
    # Seed tankers
    tankers = [
        Tanker(name="TK-001", capacity=5000, current_load=4200, current_location="Cape Town", latitude=-33.9249, longitude=18.4241, status="active"),
        Tanker(name="TK-002", capacity=5000, current_load=2100, current_location="Durban", latitude=-29.8587, longitude=31.0192, status="active"),
        Tanker(name="TK-003", capacity=5000, current_load=0, current_location="Johannesburg", latitude=-26.2023, longitude=28.0436, status="idle"),
        Tanker(name="TK-004", capacity=5000, current_load=1500, current_location="Port Elizabeth", latitude=-33.9669, longitude=25.6007, status="maintenance"),
    ]
    db.add_all(tankers)
    db.commit()
    
    # Seed inventory
    inventory = [
        Inventory(depot_id=1, product_type="LPG", quantity=8500, reorder_level=3000, status="normal"),
        Inventory(depot_id=2, product_type="LPG", quantity=4200, reorder_level=3000, status="low"),
        Inventory(depot_id=3, product_type="LPG", quantity=7100, reorder_level=3000, status="normal"),
        Inventory(depot_id=4, product_type="LPG", quantity=3800, reorder_level=3000, status="low"),
    ]
    db.add_all(inventory)
    db.commit()
    
    # Seed users
    users = [
        User(username="admin", email="admin@lpg.com", role="admin", is_active=True),
        User(username="manager1", email="manager@lpg.com", role="manager", is_active=True),
        User(username="user1", email="user@lpg.com", role="user", is_active=True),
    ]
    db.add_all(users)
    db.commit()
    
    db.close()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_db()

