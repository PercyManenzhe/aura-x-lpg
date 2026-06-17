from fastapi import APIRouter  # type: ignore - editor/language-server may not resolve environment imports

router = APIRouter()

@router.get("/")
def get_depots():

    return [
        {
            "id": 1,
            "name": "Benoni LPG Hub",
            "province": "Gauteng",
            "capacity": 5000,
            "stock": 3500
        },
        {
            "id": 2,
            "name": "Richards Bay LPG Hub",
            "province": "KZN",
            "capacity": 10000,
            "stock": 8200
        },
        {
            "id": 3,
            "name": "Venda LPG Hub",
            "province": "Limpopo",
            "capacity": 7000,
            "stock": 4100
        },
        {
            "id": 4,
            "name": "Barberton LPG Hub",
            "province": "Mpumalanga",
            "capacity": 4000,
            "stock": 2300
        }
    ]