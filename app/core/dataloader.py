import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

class DataLoader:
    def __init__(self):
        self.csv_path = os.getenv("CSV_FILE", "internship_database.csv")

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