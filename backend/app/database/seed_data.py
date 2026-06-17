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
            name="Cape Town Depot",
            province="Western Cape",
            latitude=-33.9249,
            longitude=18.4241,
            current_stock=8500,
            max_capacity=10000,
            status="operational"
        ),
        Depot(
            name="Durban Hub",
            province="KwaZulu-Natal",
            latitude=-29.8587,
            longitude=31.0192,
            current_stock=4200,
            max_capacity=10000,
            status="alert"
        ),
        Depot(
            name="Johannesburg Terminal",
            province="Gauteng",
            latitude=-26.2023,
            longitude=28.0436,
            current_stock=7100,
            max_capacity=10000,
            status="operational"
        ),
        Depot(
            name="Port Elizabeth Station",
            province="Eastern Cape",
            latitude=-33.9669,
            longitude=25.6007,
            current_stock=3800,
            max_capacity=10000,
            status="maintenance"
        ),
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
