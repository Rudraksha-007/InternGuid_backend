# app/routers/search.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models
from ..services.search_engine import engine
from ..auth import get_current_user  # JWT auth

router = APIRouter(prefix="/search", tags=["Search"])

@router.get("/internships")
def search_internships(db: Session = Depends(get_db),current_user: models.User = Depends(get_current_user)):
    """
    Fetch internships based on logged-in user details.
    """

    # ✅ Extract user details from DB
    query = {
        "title": None,  # Optional if you want to let user enter later
        "skills": current_user.skills,
        "domain": current_user.sector_interests,  # or domain column if you store separately
        "location": current_user.location,
        "degree": current_user.education_level,
    }

    r_index = current_user.r_index if hasattr(current_user, "r_index") else None

    try:
        # Call the search method with user details
        results = engine.search(query, current_user, r_index, top_k=5)  # Pass current_user for details

        return results  # Return the structured response directly from the search engine
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")
