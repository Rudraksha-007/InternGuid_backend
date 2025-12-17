import pytest
import pandas as pd
from app.test import InternshipSearchEngine
from app.core.dataloader import DataLoader

def test_integration_search():
    # Sample data
    data = {
        'skills': ['python machine learning', 'java web development'],
        'domain': ['AI', 'Web'],
        'title': ['Data Scientist', 'Software Engineer'],
        'location': ['Bangalore', 'Remote'],
        'degree': ['B.Tech', 'MCA'],
        'RIndex': [8.0, 5.0],
        'company_name': ['ABC', 'XYZ'],
        'stipend': [20000, 15000],
        'duration': [6, 3],
        'workmode': ['remote', 'onsite']
    }
    df = pd.DataFrame(data)
    
    engine = InternshipSearchEngine(df)
    
    query = {'skills': 'python', 'domain': 'AI'}
    user_details = {"name": "Test"}
    result = engine.search(query, user_details, rindex=7.0, top_k=2)
    
    assert "user" in result
    assert "recommendations" in result
    assert len(result["recommendations"]) == 2
    # First result should be more relevant
    assert result["recommendations"][0]["final_score"] >= result["recommendations"][1]["final_score"]

# For IR metrics, we'd need labeled data, but for now, this tests integration