from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_alerts():

    return [
        {
            "depot": "Barberton LPG Hub",
            "risk": "warning",
            "days_remaining": 5.3,
            "action": "Schedule replenishment"
        }
    ]