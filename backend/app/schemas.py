# app/schemas.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Create Post - Input
class PostCreate(BaseModel):
    content: str
    image_url: Optional[str] = None
    platform: str
    scheduled_time: datetime

# Response
class PostResponse(BaseModel):
    id: int
    content: str
    image_url: Optional[str] = None
    platform: str
    scheduled_time: datetime
    status: str

    class Config:
        orm_mode = True

# ---- Design ----
class DesignCreate(BaseModel):
    product: str
    text: str | None = None
    image_url: str

class DesignResponse(BaseModel):
    id: int
    product: str
    text: str | None
    image_url: str
    created_at: datetime

    class Config:
        from_attributes = True  