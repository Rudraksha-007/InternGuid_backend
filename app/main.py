from fastapi import FastAPI
from app.routers import items,auth,search
from app import models
from app.database import engine 
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
from app.services import search_engine  # Import to instantiate engine early

load_dotenv()

models.Base.metadata.create_all(bind=engine)

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY= os.getenv("SECRET_KEY")

app = FastAPI()

origins = [
    "https://internguide-frontend-86rw.onrender.com",  # Production frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          
    allow_credentials=True,
    allow_methods=["*"],           
    allow_headers=["*"],           
)

app.include_router(items.router)
app.include_router(auth.router)
app.include_router(search.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}