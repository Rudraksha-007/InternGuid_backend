import torch
from sentence_transformers import SentenceTransformer

class Embedder:
    def __init__(self, model_name: str = 'all-MiniLM-L6-v2'):
        self.device = 'cpu'  # Force CPU for low RAM
        print(f"Using device: {self.device}")
        self.model = SentenceTransformer(model_name, device=self.device)

    def encode(self, texts: list[str], convert_to_tensor: bool = True, show_progress_bar: bool = False):
        """
        Encodes a list of texts into vector embeddings.
        """
        return self.model.encode(texts, convert_to_tensor=convert_to_tensor, show_progress_bar=show_progress_bar, device=self.device)