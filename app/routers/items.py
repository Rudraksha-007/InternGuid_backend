from fastapi import APIRouter, HTTPException
from typing import List, Optional

router = APIRouter()

# In-memory storage for items
items_db = {}

@router.post("/items/", response_model=dict)
async def create_item(item_id: int, item: dict):
    if item_id in items_db:
        raise HTTPException(status_code=400, detail="Item already exists")
    items_db[item_id] = item
    return item

@router.get("/items/", response_model=List[dict])
async def read_items(skip: int = 0, limit: int = 10):
    return list(items_db.values())[skip: skip + limit]

@router.get("/items/{item_id}", response_model=dict)
async def read_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    return items_db[item_id]

@router.put("/items/{item_id}", response_model=dict)
async def update_item(item_id: int, item: dict):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    items_db[item_id] = item
    return item

@router.delete("/items/{item_id}", response_model=dict)
async def delete_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    deleted_item = items_db.pop(item_id)
    return deleted_item