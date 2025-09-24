# app/routes/analytics.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models

router = APIRouter()

@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):
    published = db.query(models.ScheduledPost).filter(models.ScheduledPost.status == "published").count()
    scheduled = db.query(models.ScheduledPost).filter(models.ScheduledPost.status == "scheduled").count()
    failed = db.query(models.ScheduledPost).filter(models.ScheduledPost.status == "failed").count()
    return {"published": published, "scheduled": scheduled, "failed": failed}

@router.get("/insight")
def get_ai_insight():
    # বাস্তবে এখানে AI API call হবে, আপাতত mock response দিব
    return {"insight": "Posts with images tend to get 40% more engagement 🚀"}