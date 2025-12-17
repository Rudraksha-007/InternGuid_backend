import pytest
import torch
from app.core.embedder import Embedder

def test_embedder_initialization():
    embedder = Embedder()
    assert embedder.model is not None
    assert embedder.device in ['cpu', 'cuda']

def test_embedder_encode():
    embedder = Embedder()
    texts = ["python machine learning", "data science"]
    embeddings = embedder.encode(texts, convert_to_tensor=True)
    assert embeddings.shape[0] == len(texts)
    assert embeddings.shape[1] > 0  # Embedding dimension
    assert isinstance(embeddings, torch.Tensor)

def test_embedder_encode_no_tensor():
    embedder = Embedder()
    texts = ["test"]
    embeddings = embedder.encode(texts, convert_to_tensor=False)
    assert len(embeddings) == 1
    assert isinstance(embeddings[0], np.ndarray)