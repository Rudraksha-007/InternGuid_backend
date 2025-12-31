# utils.py
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    # Truncate password to 72 bytes to comply with bcrypt limit
    password_bytes = password.encode('utf-8')[:72]
    password = password_bytes.decode('utf-8', errors='replace')
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Truncate password to 72 bytes to comply with bcrypt limit
    plain_password_bytes = plain_password.encode('utf-8')[:72]
    plain_password = plain_password_bytes.decode('utf-8', errors='replace')
    return pwd_context.verify(plain_password, hashed_password)
