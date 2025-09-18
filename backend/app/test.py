import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer, util
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import time
import torch

class InternshipSearchEngine:
    def __init__(self, dataframe):
        self.df = dataframe.copy().reset_index(drop=True) # Ensure clean integer index
            
        # Determine the device to use (GPU if available, otherwise CPU)
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        print(f"Using device: {self.device}")

        # Load the model onto the chosen device
        self.bert_model = SentenceTransformer('all-MiniLM-L6-v2', device=self.device)
        
        # --- Initialize vectorizers (unchanged) ---
        self.title_vectorizer = TfidfVectorizer(stop_words='english', min_df=2, max_df=0.95)
        self.location_vectorizer = TfidfVectorizer(stop_words='english', min_df=2, max_df=0.95)
        self.degree_vectorizer = TfidfVectorizer(stop_words='english', min_df=1) # min_df=1 might be okay for degrees
        
        # --- Pre-compute and index everything once ---
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
        self.skills_embeddings = self.bert_model.encode(
            self.df['skills'].tolist(), 
            convert_to_tensor=True, 
            show_progress_bar=True,
            device=self.device
        )
        
        print("Encoding domains...")
        self.domain_embeddings = self.bert_model.encode(
            self.df['domain'].tolist(), 
            convert_to_tensor=True, 
            show_progress_bar=True,
            device=self.device
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
            skills_query_embedding = self.bert_model.encode(skills_query, convert_to_tensor=True, device=self.device)
            skills_scores = util.cos_sim(skills_query_embedding, self.skills_embeddings).squeeze()
            scores_df['skills_score'] = skills_scores.cpu().numpy()
        else:
            scores_df['skills_score'] = 0.0

        # DOMAIN
        domain_query = query.get('domain')
        if domain_query:
            if isinstance(domain_query, list):
                domain_query = " ".join(domain_query)
            domain_query = str(domain_query)
            domain_query_embedding = self.bert_model.encode(domain_query, convert_to_tensor=True, device=self.device)
            domain_scores = util.cos_sim(domain_query_embedding, self.domain_embeddings).squeeze()
            scores_df['domain_score'] = domain_scores.cpu().numpy()
        else:
            scores_df['domain_score'] = 0.0

        # TITLE
        title_query = query.get('title')
        if title_query:
            if isinstance(title_query, list):
                title_query = " ".join(title_query)
            title_query = str(title_query)
            query_title_vec = self.title_vectorizer.transform([title_query])
            scores_df['title_score'] = cosine_similarity(query_title_vec, self.title_tfidf).flatten()
        else:
            scores_df['title_score'] = 0.0

        # LOCATION
        location_query = query.get('location')
        if location_query:
            if isinstance(location_query, list):
                location_query = " ".join(location_query)
            location_query = str(location_query)
            query_location_vec = self.location_vectorizer.transform([location_query])
            scores_df['location_score'] = cosine_similarity(query_location_vec, self.location_tfidf).flatten()
        else:
            scores_df['location_score'] = 0.0

        # DEGREE
        degree_query = query.get('degree')
        if degree_query:
            if isinstance(degree_query, list):
                degree_query = " ".join(degree_query)
            degree_query = str(degree_query)
            query_degree_vec = self.degree_vectorizer.transform([degree_query])
            scores_df['degree_score'] = cosine_similarity(query_degree_vec, self.degree_tfidf).flatten()
        else:
            scores_df['degree_score'] = 0.0

        # --- Numeric similarity for 'r_index' (already efficient) ---
        if rindex is not None and 'RIndex' in self.df.columns:
            diff = np.abs(self.df['RIndex'] - rindex)
            scores_df['r_index_score'] = np.exp(-r_index_sharpness * diff)
        else:
            scores_df['r_index_score'] = 0.0

        # --- Final Score Combination ---
        weights = {
            'skills': 0.5, 'domain': 0.3, 'title': 0.4,
            'location': 0.2, 'degree': 0.1, 'r_index': 0.3
        }

        scores_df['final_score'] = (
            weights['skills'] * scores_df['skills_score'] +
            weights['domain'] * scores_df['domain_score'] +
            weights['title'] * scores_df['title_score'] +
            weights['location'] * scores_df['location_score'] +
            weights['degree'] * scores_df['degree_score'] +
            weights['r_index'] * scores_df['r_index_score']
        )

        # --- Combine scores with original data and return results ---
        results_df = self.df.join(scores_df)
        results = results_df.sort_values(by='final_score', ascending=False).head(top_k)

        # Prepare the JSON response with all details
        recommendations = results[['title', 'location', 'skills', 'domain', 'final_score', 'company_name', 'stipend', 'duration', 'workmode']].to_dict(orient='records')

        response = {
            "user": user_details,
            "recommendations": recommendations
        }

        return response

# if __name__ == "__main__":
#     CSV_FILE = "internship_database.csv"

#     # --- Step 1: Load data and initialize the engine (This is the one-time slow part) ---
#     print("Loading data...")
#     df = pd.read_csv(CSV_FILE).dropna(subset=['skills', 'domain', 'title', 'location', 'degree'])
    
#     engine = InternshipSearchEngine(df)

#     # --- Step 2: Interactive search loop (This part is now fast) ---
#     while True:
#         print("\n--- Enter Your Internship Query (press Enter to skip a field) ---")
        
#         try:
#             # Collect user input
#             title_q = input("Job Title (e.g., Software Engineer, Data Analyst): ")
#             skills_q = input("Skills (e.g., python machine learning tensorflow): ")
#             domain_q = input("Domain (e.g., Artificial Intelligence, Web Development): ")
#             location_q = input("Location (e.g., Bangalore, Remote): ")
#             degree_q = input("Degree (e.g., B.Tech, MCA): ")
            
#             rindex_q_str = input("Your Relevance Index (r_index, a number from 1-10): ")
#             if rindex_q_str.lower() in ['quit', 'exit']:
#                 break
#             rindex_q = float(rindex_q_str) if rindex_q_str else None

#             user_query = {
#                 'title': title_q,
#                 'location': location_q,
#                 'degree': degree_q,
#                 'domain': domain_q,
#                 'skills': skills_q
#             }

#             print("\nSearching...")
#             start_search_time = time.time()
#             search_results = engine.search(user_query, rindex_q, top_k=10)
#             end_search_time = time.time()

#             print(f"\n--- Top 10 Search Results (search took {end_search_time - start_search_time:.4f} seconds) ---")
#             print(search_results.to_string())

#         except ValueError:
#             print("Invalid input for r_index. Please enter a number or leave it blank.")
#         except Exception as e:
#             print(f"An error occurred: {e}")