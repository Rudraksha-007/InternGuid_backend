# app/services/search_engine.py
import pandas as pd
from pathlib import Path
from ..test import InternshipSearchEngine  # import your class

CSV_FILE = Path(__file__).resolve().parent.parent / "internship_database.csv"

print("🔄 Loading internship dataset...")
df = pd.read_csv(CSV_FILE).dropna(subset=['skills', 'domain', 'title', 'location', 'degree'])

# Initialize search engine once
engine = InternshipSearchEngine(df)
