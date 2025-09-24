# app/models.py
from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base
import datetime

class ScheduledPost(Base):
    __tablename__ = "scheduled_posts"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)  # পোস্টের টেক্সট
    image_url = Column(String, nullable=True)  # ছবির লিঙ্ক
    platform = Column(String, nullable=False)  # কোন প্ল্যাটফর্ম (mock)
    scheduled_time = Column(DateTime, nullable=False)  # পোস্ট হবার সময়
    status = Column(String, default="scheduled")  # scheduled / published / failed
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Design(Base):
    __tablename__ = "designs"

    id = Column(Integer, primary_key=True, index=True)
    product = Column(String, nullable=False)      # কোন প্রোডাক্ট (t-shirt)
    text = Column(String, nullable=True)          # overlay করা টেক্সট
    image_url = Column(String, nullable=False)    # বেস ইমেজ
    created_at = Column(DateTime, default=datetime.datetime.utcnow)