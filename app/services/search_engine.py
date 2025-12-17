# app/services/search_engine.py
import pandas as pd # type: ignore
import os
from pathlib import Path
from ..feed import InternshipSearchEngine  # import your class
from ..core.dataloader import DataLoader

print("🔄 Loading internship dataset...")
dataloader = DataLoader()
try:
    df = dataloader.load_data()
except FileNotFoundError:
    print(f"WARNING: CSV file not found. Search engine will not be available.")
    df = None
# Initialize search engine once
engine = InternshipSearchEngine(df) if df is not None else None
