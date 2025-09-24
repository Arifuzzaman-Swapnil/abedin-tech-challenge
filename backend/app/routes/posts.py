# app/routes/posts.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import schemas, crud
from app.database import get_db

router = APIRouter()

# Create post
@router.post("/", response_model=schemas.PostResponse)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    return crud.create_post(db=db, post=post)

# List all posts
@router.get("/", response_model=list[schemas.PostResponse])
def list_posts(db: Session = Depends(get_db)):
    return crud.get_posts(db)