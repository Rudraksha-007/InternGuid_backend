import uuid
from sqlalchemy import Column, String, Date, Boolean, DateTime, ARRAY,Text
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime,timezone
from .database import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(Text, nullable=False)
    contact = Column(String, unique=True, nullable=False)
    dob = Column(Date, nullable=False)
    gender = Column(String, nullable=True)
    education_level = Column(String, nullable=False)  #[UG,PG,Diploma]
    skills = Column(ARRAY(String), nullable=True)
    qualifications = Column(ARRAY(String), nullable=True) #[Btech,Mtech,MBA,etc]
    location = Column(ARRAY(String), nullable=True)
    sector_interests = Column(ARRAY(String), nullable=True)  #[IT,healthcare,Finance,etc]
    category = Column(String, nullable=True)   
    reservation_status = Column(Boolean, default=False)
    region = Column(String, nullable=True)     
    past_participation = Column(Boolean, default=False)   
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    # institute_name = Column(String, nullable=False)
    # resume_url = Column(String, nullable=True)
