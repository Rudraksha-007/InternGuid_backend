from fastapi import Path
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

class DataLoader:
    def __init__(self):
        base_dir = Path(__file__).resolve().parent
        csv_name = os.getenv("CSV_FILE", "internship_database.csv")
        self.csv_path = base_dir / csv_name

    def load_data(self, csv_path: str = None) -> pd.DataFrame:
        """
        Loads internship data from CSV and performs basic preprocessing.
        """
        if csv_path is None:
            csv_path = self.csv_path
        df = pd.read_csv(csv_path)
        # Drop rows with missing critical fields
        df = df.dropna(subset=['skills', 'domain', 'title', 'location', 'degree'])
        df = df.reset_index(drop=True)
        return df