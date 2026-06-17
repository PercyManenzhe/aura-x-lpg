from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "sqlite:///./lpg_platform.db"
    api_title: str = "Aura-X LPG Platform"
    api_version: str = "1.0.0"
    debug: bool = True
    
    class Config:
        env_file = ".env"

settings = Settings()
