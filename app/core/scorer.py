import numpy as np
from sentence_transformers import util
from sklearn.metrics.pairwise import cosine_similarity # type: ignore
from sklearn.feature_extraction.text import TfidfVectorizer # type: ignore

class Scorer:
    def __init__(self):
        pass

    def semantic_score(self, query: str, query_embedding, field_embeddings):
        """
        Computes semantic similarity score using cosine similarity.
        """
        scores = util.cos_sim(query_embedding, field_embeddings).squeeze()
        return scores.cpu().numpy() if hasattr(scores, 'cpu') else scores

    def lexical_score(self, query: str, vectorizer: TfidfVectorizer, tfidf_matrix):
        """
        Computes lexical similarity score using TF-IDF cosine similarity.
        """
        query_vec = vectorizer.transform([query])
        scores = cosine_similarity(query_vec, tfidf_matrix).flatten()
        return scores

    def numeric_score(self, rindex: float, df_rindex: np.ndarray, sharpness: float = 0.1):
        """
        Computes numeric similarity score for r_index using exponential decay.
        """
        if rindex is None or df_rindex is None:
            return np.zeros(len(df_rindex)) if df_rindex is not None else np.array([])
        diff = np.abs(df_rindex - rindex)
        return np.exp(-sharpness * diff)