import pandas as pd
import numpy as np
import os
from app.core.dataloader import DataLoader
from app.core.embedder import Embedder
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle
import chromadb

def precompute():
    dataloader = DataLoader()
    df = dataloader.load_data()

    embedder = Embedder()

    # Pre-compute embeddings
    print("Encoding skills...")
    skills_embeddings = embedder.encode(df['skills'].tolist(), convert_to_tensor=False)

    print("Encoding domains...")
    domain_embeddings = embedder.encode(df['domain'].tolist(), convert_to_tensor=False)

    
    # Use ChromaDB for vector storage
    client = chromadb.PersistentClient(path="./chroma_db")
    existing_collections = [c.name for c in client.list_collections()]

    if "skills" in existing_collections:
        client.delete_collection("skills")

    if "domains" in existing_collections:
        client.delete_collection("domains")

    # Skills collection
    skills_collection = client.get_or_create_collection(name="skills")
    skills_collection.add(
        embeddings=skills_embeddings.tolist(),
        documents=df['skills'].tolist(),
        ids=[str(i) for i in range(len(df))]
    )

    # Domain collection
    domain_collection = client.get_or_create_collection(name="domains")
    domain_collection.add(
        embeddings=domain_embeddings.tolist(),
        documents=df['domain'].tolist(),
        ids=[str(i) for i in range(len(df))]
    )

    # TF-IDF
    title_vectorizer = TfidfVectorizer(stop_words='english', min_df=1, max_df=0.95)
    title_tfidf = title_vectorizer.fit_transform(df['title'].astype(str))
    with open('title_vectorizer.pkl', 'wb') as f:
        pickle.dump(title_vectorizer, f)
    with open('title_tfidf.pkl', 'wb') as f:
        pickle.dump(title_tfidf, f)

    location_vectorizer = TfidfVectorizer(stop_words='english', min_df=1, max_df=0.95)
    location_tfidf = location_vectorizer.fit_transform(df['location'].astype(str))
    with open('location_vectorizer.pkl', 'wb') as f:
        pickle.dump(location_vectorizer, f)
    with open('location_tfidf.pkl', 'wb') as f:
        pickle.dump(location_tfidf, f)

    degree_vectorizer = TfidfVectorizer(stop_words='english', min_df=1)
    degree_tfidf = degree_vectorizer.fit_transform(df['degree'].astype(str))
    with open('degree_vectorizer.pkl', 'wb') as f:
        pickle.dump(degree_vectorizer, f)
    with open('degree_tfidf.pkl', 'wb') as f:
        pickle.dump(degree_tfidf, f)

    # Save df
    df.to_pickle('dataframe.pkl')

    print("Precomputation complete.")

if __name__ == "__main__":
    precompute()