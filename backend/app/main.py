from fastapi import FastAPI
from app.routers import items,auth,search
from app import models
from app.database import engine 
from dotenv import load_dotenv
import os
load_dotenv()

models.Base.metadata.create_all(bind=engine)

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY= os.getenv("SECRET_KEY")

app = FastAPI()

app.include_router(items.router)
app.include_router(auth.router)
app.include_router(search.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}