# utils.py
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    # Truncate password to 72 characters to comply with bcrypt limit
    password = password[:72]
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Truncate password to 72 characters to comply with bcrypt limit
    plain_password = plain_password[:72]
    return pwd_context.verify(plain_password, hashed_password)
