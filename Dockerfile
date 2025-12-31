FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    libblas-dev \
    liblapack-dev \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY app/ app/

# Copy precomputed artifacts
COPY chroma_db/ chroma_db/
COPY *.pkl .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
