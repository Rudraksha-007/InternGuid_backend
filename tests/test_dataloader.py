import pytest
import pandas as pd
import tempfile
import os
from app.core.dataloader import DataLoader

def test_dataloader_load_data():
    dataloader = DataLoader()
    # Create a temporary CSV
    data = {
        'skills': ['python', 'java', None],
        'domain': ['AI', 'Web', 'Data'],
        'title': ['Engineer', 'Developer', 'Analyst'],
        'location': ['Bangalore', 'Remote', 'Delhi'],
        'degree': ['B.Tech', 'MCA', 'BCA']
    }
    df = pd.DataFrame(data)
    with tempfile.NamedTemporaryFile(mode='w', suffix='.csv', delete=False) as f:
        df.to_csv(f, index=False)
        csv_path = f.name
    
    try:
        loaded_df = dataloader.load_data(csv_path)
        assert len(loaded_df) == 2  # One row dropped due to None in skills
        assert 'skills' in loaded_df.columns
    finally:
        os.unlink(csv_path)