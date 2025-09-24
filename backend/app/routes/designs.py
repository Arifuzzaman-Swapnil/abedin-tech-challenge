# app/routes/designs.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import schemas, crud
from app.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.DesignResponse)
def create_design(design: schemas.DesignCreate, db: Session = Depends(get_db)):
    return crud.create_design(db, design)

@router.get("/", response_model=list[schemas.DesignResponse])
def list_designs(db: Session = Depends(get_db)):
    return crud.get_designs(db)

@router.delete("/{design_id}")
def delete_design(design_id: int, db: Session = Depends(get_db)):
    ok = crud.delete_design(db, design_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Design not found")
    return {"message": "Deleted successfully"}

@router.put("/{design_id}", response_model=schemas.DesignResponse)
def edit_design(design_id: int, design: schemas.DesignCreate, db: Session = Depends(get_db)):
    print(f"🔧 Edit attempt: {design_id} with data={design}")
    updated = crud.update_design(db, design_id, design)
    if not updated:
        raise HTTPException(status_code=404, detail="Design not found")
    return updated
