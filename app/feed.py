import pandas as pd # type: ignore
import numpy as np
from sentence_transformers import SentenceTransformer, util
from sklearn.feature_extraction.text import TfidfVectorizer # type: ignore
from sklearn.metrics.pairwise import cosine_similarity # type: ignore
import time
import torch

from .core.embedder import Embedder
from .core.scorer import Scorer
from .core.ranker import Ranker
from .core.dataloader import DataLoader

class InternshipSearchEngine:
    def __init__(self, dataframe):
        self.df = dataframe.copy().reset_index(drop=True)
            
        self.embedder = Embedder()
        self.scorer = Scorer()
        self.ranker = Ranker()
        
        # Initialize vectorizers (unchanged)
        self.title_vectorizer = TfidfVectorizer(stop_words='english', min_df=1, max_df=0.95)
        self.location_vectorizer = TfidfVectorizer(stop_words='english', min_df=1, max_df=0.95)
        self.degree_vectorizer = TfidfVectorizer(stop_words='english', min_df=1) # min_df=1 might be okay for degrees
        
        # Pre-compute and index everything once
        self._prepare_indices()

    def _prepare_indices(self):
        """
        Pre-computes all embeddings and TF-IDF matrices.
        """
        print("Preparing search engine: generating embeddings and TF-IDF matrices...")
        start_time = time.time()

        # --- Semantic Part: Pre-compute ALL embeddings in a single batch ---
        # This is much faster than using .apply() row-by-row.
        print("Encoding skills...")
        self.skills_embeddings = self.embedder.encode(
            self.df['skills'].tolist(), 
            convert_to_tensor=True, 
            show_progress_bar=True
        )
        
        print("Encoding domains...")
        self.domain_embeddings = self.embedder.encode(
            self.df['domain'].tolist(), 
            convert_to_tensor=True, 
            show_progress_bar=True
        )
        
        # --- Lexical Part: Pre-compute all TF-IDF matrices (unchanged, as it's already efficient) ---
        print("Fitting TF-IDF vectorizers...")
        self.title_tfidf = self.title_vectorizer.fit_transform(self.df['title'].astype(str))
        self.location_tfidf = self.location_vectorizer.fit_transform(self.df['location'].astype(str))
        self.degree_tfidf = self.degree_vectorizer.fit_transform(self.df['degree'].astype(str))
        
        end_time = time.time()
        print(f"Preparation complete. Took {end_time - start_time:.2f} seconds.")

    def search(self, query, user_details, rindex, top_k=5, r_index_sharpness=0.1):
        """
        Performs a search using pre-computed indices. This part is now very fast.
        """
        scores_df = pd.DataFrame(index=self.df.index)

        # --- Semantic Search: Perform a single, vectorized similarity calculation ---
        # SKILLS
        skills_query = query.get('skills')
        if skills_query:
            if isinstance(skills_query, list):
                skills_query = " ".join(skills_query)
            skills_query = str(skills_query)
            skills_query_embedding = self.embedder.encode([skills_query], convert_to_tensor=True)[0]
            scores_df['skills_score'] = self.scorer.semantic_score(skills_query, skills_query_embedding, self.skills_embeddings)
        else:
            scores_df['skills_score'] = 0.0

        # DOMAIN
        domain_query = query.get('domain')
        if domain_query:
            if isinstance(domain_query, list):
                domain_query = " ".join(domain_query)
            domain_query = str(domain_query)
            domain_query_embedding = self.embedder.encode([domain_query], convert_to_tensor=True)[0]
            scores_df['domain_score'] = self.scorer.semantic_score(domain_query, domain_query_embedding, self.domain_embeddings)
        else:
            scores_df['domain_score'] = 0.0

        # TITLE
        title_query = query.get('title')
        if title_query:
            if isinstance(title_query, list):
                title_query = " ".join(title_query)
            title_query = str(title_query)
            scores_df['title_score'] = self.scorer.lexical_score(title_query, self.title_vectorizer, self.title_tfidf)
        else:
            scores_df['title_score'] = 0.0

        # LOCATION
        location_query = query.get('location')
        if location_query:
            if isinstance(location_query, list):
                location_query = " ".join(location_query)
            location_query = str(location_query)
            scores_df['location_score'] = self.scorer.lexical_score(location_query, self.location_vectorizer, self.location_tfidf)
        else:
            scores_df['location_score'] = 0.0

        # DEGREE
        degree_query = query.get('degree')
        if degree_query:
            if isinstance(degree_query, list):
                degree_query = " ".join(degree_query)
            degree_query = str(degree_query)
            scores_df['degree_score'] = self.scorer.lexical_score(degree_query, self.degree_vectorizer, self.degree_tfidf)
        else:
            scores_df['degree_score'] = 0.0

        # --- Numeric similarity for 'r_index' (already efficient) ---
        if rindex is not None and 'RIndex' in self.df.columns:
            scores_df['r_index_score'] = self.scorer.numeric_score(rindex, self.df['RIndex'].values, r_index_sharpness)
        else:
            scores_df['r_index_score'] = 0.0

        # --- Combine scores with original data and return results ---
        return self.ranker.rank(scores_df, self.df, top_k, user_details)
