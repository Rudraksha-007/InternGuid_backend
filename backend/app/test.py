import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer, util
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

# core implementation of the search engine:
class InternshipSearchEngine:
    def __init__(self, dataframe):
        self.df = dataframe.copy()
        self.bert_model = SentenceTransformer('all-MiniLM-L6-v2')
        #removes common words like is, the, a, an etc. and builtds TF-IDF vocab
        self.tfidf_vectorizer = TfidfVectorizer(stop_words='english')  
        self._prepare()

    def _prepare(self):
        print("Preparing search engine: generating embeddings and vectors...")

        # Semantic aware search ke liye BERT ko data feed kr reh hain: 
        # for every row in data frame we excode the skills with bert model and store the embedding in new column in data frame 
        # dense vector :
        self.df['skills_embedding'] = self.df['skills'].apply(
            lambda x: self.bert_model.encode(x, convert_to_tensor=True)
        )
        self.df['domain_embedding'] = self.df['domain'].apply(
            lambda x: self.bert_model.encode(x, convert_to_tensor=True)
        )
        # TODO : Add more semantic fields if needed and fix the weights accordingly + tweak weights 
        # For TF-IDF Lexical Search (title, location, degree, work_mode)

        # Combine the columns into a single string for TF-IDF:
        self.df['lexical_text'] = self.df['title'] + " " + self.df['location'] + " " + self.df['degree'] + " " + self.df['work_mode']

        self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(self.df['lexical_text'])
        print("Preparation complete.")

    def search(self, query, top_k=5):
        # smbed the semantic parts of the query into bert model
        skills_query_embedding = self.bert_model.encode(query.get('skills', ''), convert_to_tensor=True)
        domain_query_embedding = self.bert_model.encode(query.get('domain', ''), convert_to_tensor=True)

        # Calculate cosine similarity
        self.df['skills_score'] = self.df['skills_embedding'].apply(
            lambda x: util.cos_sim(skills_query_embedding, x).item()
        )
        self.df['domain_score'] = self.df['domain_embedding'].apply(
            lambda x: util.cos_sim(domain_query_embedding, x).item()
        )

        # combine and vectorize the lexical parts of the query
        lexical_query_text = " ".join([query.get(key, '') for key in ['title', 'location', 'degree', 'work_mode']])

        if lexical_query_text.strip() == "":
             # If no lexical query, score is 0
            self.df['lexical_score'] = 0.0
        else:
            query_tfidf_vector = self.tfidf_vectorizer.transform([lexical_query_text])
            self.df['lexical_score'] = cosine_similarity(query_tfidf_vector, self.tfidf_matrix).flatten()


        # combination of linear weights
        weights = {
            'skills': 0.5, 
            'domain': 0.3,
            'lexical': 0.8
        }
        
        self.df['final_score'] = (
            weights['skills'] * self.df['skills_score'] +
            weights['domain'] * self.df['domain_score'] +
            weights['lexical'] * self.df['lexical_score']
        )
        
        # Return top K results
        results = self.df.sort_values(by='final_score', ascending=False).head(top_k)
        return results[['title', 'location', 'skills', 'domain', 'final_score']]

if __name__ == "__main__":
    CSV_FILE = "internship_database.csv"
    

    # Load the data from CSV
    df = pd.read_csv(CSV_FILE)

    # Initialize the search engine
    engine = InternshipSearchEngine(df)

    print("\n--- Running a new search ---")
    user_query = {
        'title': 'Software Engineer',
        'location': 'Bangalore',
        'degree': 'MCA', # Not specified
        'work_mode': 'Onsite', # Not specified
        'domain': 'AI or Data',
        'skills': 'python machine learning'
    }

    print(f"User Query: {user_query}")
    search_results = engine.search(user_query, top_k=50)
    print("\n--- Top Search Results ---")
    print(search_results.to_string())