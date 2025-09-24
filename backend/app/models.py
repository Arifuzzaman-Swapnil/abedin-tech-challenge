from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base
import datetime

class ScheduledPost(Base):
    __tablename__ = "scheduled_posts"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)  
    image_url = Column(String, nullable=True) 
    platform = Column(String, nullable=False)  
    scheduled_time = Column(DateTime, nullable=False)
    status = Column(String, default="scheduled")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Design(Base):
    __tablename__ = "designs"

    id = Column(Integer, primary_key=True, index=True)
    product = Column(String, nullable=False)    
    text = Column(String, nullable=True)        
    image_url = Column(String, nullable=False) 
    created_at = Column(DateTime, default=datetime.datetime.utcnow)