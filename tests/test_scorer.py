import pytest
import numpy as np
import torch
from sklearn.feature_extraction.text import TfidfVectorizer
from app.core.scorer import Scorer
from app.core.embedder import Embedder

def test_scorer_semantic_score():
    scorer = Scorer()
    embedder = Embedder()
    query = "python"
    query_emb = embedder.encode([query], convert_to_tensor=True)[0]
    field_embs = embedder.encode(["python programming", "java"], convert_to_tensor=True)
    scores = scorer.semantic_score(query, query_emb, field_embs)
    assert len(scores) == 2
    assert scores[0] > scores[1]  # Python should be more similar to python programming

def test_scorer_lexical_score():
    scorer = Scorer()
    vectorizer = TfidfVectorizer()
    corpus = ["software engineer", "data analyst"]
    tfidf = vectorizer.fit_transform(corpus)
    query = "software"
    scores = scorer.lexical_score(query, vectorizer, tfidf)
    assert len(scores) == 2
    assert scores[0] > scores[1]

def test_scorer_numeric_score():
    scorer = Scorer()
    rindex = 5.0
    df_rindex = np.array([4.0, 6.0, 5.0])
    scores = scorer.numeric_score(rindex, df_rindex)
    assert len(scores) == 3
    assert scores[2] == 1.0  # Exact match
    assert scores[0] < scores[2]  # Closer is higher