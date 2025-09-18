# app/services/search_engine.py
import pandas as pd
import os
from pathlib import Path
from ..test import InternshipSearchEngine  # import your class
CSV_FILE = os.path.join(os.path.dirname(__file__), "internship_database.csv")
print("🔄 Loading internship dataset...")
try:
    df = pd.read_csv(CSV_FILE).dropna(subset=['skills', 'domain', 'title', 'location', 'degree'])
except FileNotFoundError:
    print(f"WARNING: {CSV_FILE} not found. Search engine will not be available.")
    df = None
# Initialize search engine once
engine = InternshipSearchEngine(df)
