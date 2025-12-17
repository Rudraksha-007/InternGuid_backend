from typing import List, Optional
from pydantic import BaseModel, EmailStr
from datetime import date, datetime
import uuid

class UserBase(BaseModel):
    name: str
    email: EmailStr
    contact: str
    dob: date
    gender: Optional[str] = None
    education_level: str    
    skills: Optional[List[str]] = []
    qualifications: Optional[List[str]] = []
    location: Optional[List[str]] = []
    reservation_status: Optional[bool] = False
    sector_interests: Optional[List[str]] = []
    category: Optional[str] = None
    region: Optional[str] = None
    past_participation: Optional[bool] = False
    # resume_url: Optional[str] = None
    # institute_name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    user_id: uuid.UUID
    created_at: datetime

    class Config:
        from_attributes = True
        # orm_mode = True
        

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class AuthResponse(Token):
    user: UserResponse

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

