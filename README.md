# InternGuid Backend

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116.1-green.svg)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A robust FastAPI-based backend for an AI-powered internship search platform. This service leverages embeddings and vector search to intelligently match users with relevant internship opportunities based on their profiles, skills, and preferences.

## Features

- **User Authentication & Authorization**: Secure JWT-based authentication system
- **Profile Management**: Comprehensive user profiles with skills, education, and preferences
- **AI-Powered Search**: Vector-based internship matching using embeddings
- **Multi-Database Support**: PostgreSQL for user data, MongoDB for internship listings
- **RESTful API**: Well-documented endpoints for seamless integration
- **CORS Enabled**: Ready for frontend integration (e.g., React on localhost:5173)

## Tech Stack

- **Framework**: FastAPI
- **Databases**: PostgreSQL (users), MongoDB (internships)
- **Authentication**: JWT with bcrypt hashing
- **AI/ML**: HuggingFace Transformers for embeddings
- **ORM**: SQLAlchemy for PostgreSQL
- **Async DB**: Motor for MongoDB
- **Validation**: Pydantic

## Design

<img width="945" height="529" alt="Screenshot 2025-12-17 150255" src="https://github.com/user-attachments/assets/0f903cb6-8899-4163-8531-57c5f425b94f" />
Overall Service 


<img width="1091" height="359" alt="Screenshot 2025-12-17 150142" src="https://github.com/user-attachments/assets/950f16a8-5f34-4ca5-80b6-83d3db60db7e" />
Search Engine Core


## Installation

### Prerequisites

- Python 3.8+
- PostgreSQL
- MongoDB
- Git

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/InternGuid_backend.git
   cd InternGuid_backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/intern_guid
   SECRET_KEY=your-secret-key-here
   MONGODB_URL=mongodb://localhost:27017
   ```

5. **Run database migrations** (if using Alembic or similar):
   ```bash
   # Assuming you have Alembic set up
   alembic upgrade head
   ```

## Usage

### Running the Application

Start the FastAPI server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

### API Documentation

Once running, visit `http://127.0.0.1:8000/docs` for interactive Swagger UI documentation.

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Items
- `GET /items/` - Retrieve items
- `POST /items/` - Create new item

### Search
- `GET /search/internships` - Search internships based on user profile (requires authentication)

## Testing

Run the test suite:
```bash
pytest tests/
```

## Project Structure

```
InternGuid_backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app instance
│   ├── auth.py              # Authentication utilities
│   ├── database.py          # Database connections
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── deps.py              # Dependencies
│   ├── utils.py             # Utility functions
│   ├── core/                # Core search components
│   │   ├── dataloader.py
│   │   ├── embedder.py
│   │   ├── ranker.py
│   │   └── scorer.py
│   ├── routers/             # API routers
│   │   ├── auth.py
│   │   ├── items.py
│   │   └── search.py
│   └── services/            # Business logic
│       └── search_engine.py
├── tests/                   # Test files
├── requirements.txt         # Python dependencies
├── README.md
└── .env                     # Environment variables (not committed)
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Deployment

The application is optimized for low-memory deployment (<512MB RAM) using precomputations and ChromaDB vector database.

### Prerequisites

- Internship data CSV file (set via `CSV_FILE` env var, default: `internship_database.csv`)
- PostgreSQL database (e.g., Neon, Supabase)
- Render account for hosting

### Local Precomputation

Before deployment, precompute embeddings and TF-IDF matrices:

```bash
python precompute.py
```

This creates ChromaDB collections and pickle files for fast loading.

### Deploy on Render

1. **Push code to GitHub** with precomputed data committed or generated in Docker build.

2. **Create a new Web Service** on Render:
   - Connect your GitHub repository
   - Runtime: Docker
   - Build Command: (leave default)
   - Start Command: (leave default, uses Dockerfile)

3. **Set Environment Variables**:
   - `DATABASE_URL`: PostgreSQL connection string
   - `SECRET_KEY`: Random secret for JWT
   - `CSV_FILE`: Path to CSV (if not default)

4. **Deploy**: Render will build the Docker image (which runs precompute.py) and start the service.

The app uses ChromaDB for vector search, ensuring efficient memory usage.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please open an issue on GitHub.
