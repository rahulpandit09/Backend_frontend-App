from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.moc import MOC
from app.schemas.moc_schema import MOCCreate, MOCResponse

router = APIRouter(
    prefix="/moc",
    tags=["MOC"]
)


# ---------------- CREATE ----------------
@router.post("/", response_model=MOCResponse)
def create_moc(data: MOCCreate, db: Session = Depends(get_db)):
    moc = MOC(**data.dict())
    db.add(moc)
    db.commit()
    db.refresh(moc)
    return moc


# ---------------- GET ALL ----------------
@router.get("/", response_model=list[MOCResponse])
def get_all_mocs(db: Session = Depends(get_db)):
    return db.query(MOC).filter(MOC.is_active == True).all()


# ---------------- GET ONE ----------------
@router.get("/{moc_id}", response_model=MOCResponse)
def get_moc(moc_id: int, db: Session = Depends(get_db)):
    moc = db.query(MOC).filter(MOC.id == moc_id).first()
    if not moc:
        raise HTTPException(status_code=404, detail="MOC not found")
    return moc


# ---------------- UPDATE ----------------
@router.put("/{moc_id}", response_model=MOCResponse)
def update_moc(
    moc_id: int,
    data: MOCCreate,
    db: Session = Depends(get_db)
):
    moc = db.query(MOC).filter(MOC.id == moc_id).first()
    if not moc:
        raise HTTPException(status_code=404, detail="MOC not found")

    for key, value in data.dict().items():
        setattr(moc, key, value)

    db.commit()
    db.refresh(moc)
    return moc


# ---------------- SOFT DELETE ----------------
@router.delete("/{moc_id}")
def delete_moc(moc_id: int, db: Session = Depends(get_db)):
    moc = db.query(MOC).filter(MOC.id == moc_id).first()
    if not moc:
        raise HTTPException(status_code=404, detail="MOC not found")

    moc.is_active = False
    db.commit()
    return {"message": "MOC deleted successfully"}
