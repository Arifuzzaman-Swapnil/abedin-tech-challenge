# app/crud.py
from sqlalchemy.orm import Session
from app import models, schemas
from app.scheduler import schedule_post   
from datetime import timezone

def create_post(db: Session, post: schemas.PostCreate):
    aware_time = post.scheduled_time.astimezone(timezone.utc)
    db_post = models.ScheduledPost(
            content=post.content,
            image_url=post.image_url,
            platform=post.platform,
            scheduled_time=aware_time, 
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)     
    schedule_post(db_post.id, aware_time)
    return db_post

def get_posts(db: Session):
    return db.query(models.ScheduledPost).all()

def create_design(db: Session, design: schemas.DesignCreate):
    db_design = models.Design(
        product=design.product,
        text=design.text,
        image_url=design.image_url,
    )
    db.add(db_design)
    db.commit()
    db.refresh(db_design)
    return db_design

def get_designs(db: Session):
    return db.query(models.Design).all()
def delete_design(db: Session, design_id: int):
    db_design = db.query(models.Design).filter(models.Design.id == design_id).first()
    if db_design:
        db.delete(db_design)
        db.commit()
        return True
    return False

def update_design(db: Session, design_id: int, updated: schemas.DesignCreate):
    db_design = db.query(models.Design).filter(models.Design.id == design_id).first()
    if db_design:
        db_design.product = updated.product
        db_design.text = updated.text
        db_design.image_url = updated.image_url
        db.commit()
        db.refresh(db_design)
        return db_design
    return None