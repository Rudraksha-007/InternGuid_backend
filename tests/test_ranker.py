import pytest
import pandas as pd
from app.core.ranker import Ranker

def test_ranker_initialization():
    ranker = Ranker()
    assert ranker.weights is not None
    assert 'skills' in ranker.weights

def test_ranker_rank():
    ranker = Ranker()
    # Sample data
    df = pd.DataFrame({
        'title': ['Software Engineer', 'Data Analyst'],
        'location': ['Bangalore', 'Remote'],
        'skills': ['python', 'sql'],
        'domain': ['AI', 'Data'],
        'company_name': ['ABC', 'XYZ'],
        'stipend': [10000, 15000],
        'duration': [6, 3],
        'workmode': ['remote', 'onsite']
    })
    scores_df = pd.DataFrame({
        'skills_score': [0.8, 0.2],
        'domain_score': [0.7, 0.3],
        'title_score': [0.6, 0.4],
        'location_score': [0.5, 0.5],
        'degree_score': [0.4, 0.6],
        'r_index_score': [0.9, 0.1]
    })
    user_details = {"name": "Test User"}
    result = ranker.rank(scores_df, df, top_k=2, user_details=user_details)
    assert "user" in result
    assert "recommendations" in result
    assert len(result["recommendations"]) == 2
    assert result["recommendations"][0]["final_score"] > result["recommendations"][1]["final_score"]