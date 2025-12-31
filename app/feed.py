import pandas as pd # type: ignore
import numpy as np
from sentence_transformers import SentenceTransformer, util
from sklearn.feature_extraction.text import TfidfVectorizer # type: ignore
from sklearn.metrics.pairwise import cosine_similarity # type: ignore
import time
import torch
import pickle
import chromadb

from .core.embedder import Embedder
from .core.dataloader import DataLoader
from .core.ranker import Ranker
from .core.scorer import Scorer

class InternshipSearchEngine:
    def __init__(self,dataframe) -> None:
        # maintain a clean deep copy of the dataframe (the data loaded by loader)
        self.df=dataframe.copy().reset_index(drop=True)

        # instance vars:
        self.embedder=Embedder()
        self.scorer=Scorer()
        self.ranker=Ranker()

        # Load precomputed data
        self._load_precomputed()

    def _load_precomputed(self):
        """
        Loads pre-computed data and ChromaDB collections.
        """
        start_time=time.time()
        print("Loading precomputed data...")
        
        self.client = chromadb.PersistentClient(path="./chroma_db")
        self.skills_collection = self.client.get_collection(name="skills")
        self.domain_collection = self.client.get_collection(name="domains")
        
        # Load TF-IDF
        with open('title_vectorizer.pkl', 'rb') as f:
            self.title_vect = pickle.load(f)
        with open('title_tfidf.pkl', 'rb') as f:
            self.title_TFIDF = pickle.load(f)
        
        with open('location_vectorizer.pkl', 'rb') as f:
            self.location_vect = pickle.load(f)
        with open('location_tfidf.pkl', 'rb') as f:
            self.location_TFIDF = pickle.load(f)
        
        with open('degree_vectorizer.pkl', 'rb') as f:
            self.degree_vect = pickle.load(f)
        with open('degree_tfidf.pkl', 'rb') as f:
            self.degree_TFIDF = pickle.load(f)
        
        print("Precomputed data loaded.")

        end_time=time.time()
        print(f"Prep took : {end_time-start_time} seconds.")
    
    def search(self, query, user_details, rindex, top_k=5, r_index_sharpness=0.1):
        """
        Performs a search using pre-computed indices.
        """
        scores_df = pd.DataFrame(index=self.df.index)

        # Semantic Search: Use ChromaDB for efficient vector search
        # SKILLS
        skills_query = query.get('skills')
        if skills_query:
            # must be a list of skills
            if isinstance(skills_query,list):
                skills_query=" ".join(skills_query)
            
            skills_query=str(skills_query)
            skills_query_embedding = self.embedder.encode([skills_query], convert_to_tensor=False)[0]
            results = self.skills_collection.query(
                query_embeddings=[skills_query_embedding.tolist()],
                n_results=len(self.df)
            )
            skills_scores = np.zeros(len(self.df))
            for id_str, dist in zip(results['ids'][0], results['distances'][0]):
                idx = int(id_str)
                skills_scores[idx] = 1 - dist
            scores_df['skills_score'] = skills_scores
        else:
            scores_df['skills_score'] = 0.0

        # DOMAIN
        domain_query = query.get('domain')
        if domain_query:
            if isinstance(domain_query, list):
                domain_query = " ".join(domain_query)
            domain_query = str(domain_query)
            domain_query_embedding = self.embedder.encode([domain_query], convert_to_tensor=False)[0]
            results = self.domain_collection.query(
                query_embeddings=[domain_query_embedding.tolist()],
                n_results=len(self.df)
            )
            domain_scores = np.zeros(len(self.df))
            for id_str, dist in zip(results['ids'][0], results['distances'][0]):
                idx = int(id_str)
                domain_scores[idx] = 1 - dist
            scores_df['domain_score'] = domain_scores
        else:
            scores_df['domain_score'] = 0.0

        # TITLE
        title_query = query.get('title')
        if title_query:
            if isinstance(title_query, list):
                title_query = " ".join(title_query)
            title_query = str(title_query)
            scores_df['title_score'] = self.scorer.lexical_score(title_query, self.title_vect, self.title_TFIDF)
        else:
            scores_df['title_score'] = 0.0

        # LOCATION
        location_query = query.get('location')
        if location_query:
            if isinstance(location_query, list):
                location_query = " ".join(location_query)
            location_query = str(location_query)
            scores_df['location_score'] = self.scorer.lexical_score(location_query, self.location_vect, self.location_TFIDF)
        else:
            scores_df['location_score'] = 0.0

        # DEGREE
        degree_query = query.get('degree')
        if degree_query:
            if isinstance(degree_query, list):
                degree_query = " ".join(degree_query)
            degree_query = str(degree_query)
            scores_df['degree_score'] = self.scorer.lexical_score(degree_query, self.degree_vect, self.degree_TFIDF)
        else:
            scores_df['degree_score'] = 0.0

        # --- Numeric similarity :Experimental rindex ---
        if rindex is not None and 'RIndex' in self.df.columns:
            scores_df['r_index_score'] = self.scorer.numeric_score(rindex, self.df['RIndex'].values, r_index_sharpness)
        else:
            scores_df['r_index_score'] = 0.0

        # combine the score of the query 
        return self.ranker.rank(scores_df, self.df, top_k, user_details)
