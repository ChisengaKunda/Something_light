import json
from pathlib import Path

USERS_FILE = Path("users.json")

def load_users():
    if not USERS_FILE.exists():
        USERS_FILE.write_text("{}")
    return json.loads(USERS_FILE.read_text())

def create_user(username: str, hashed_password: str, email: str, role: str, name: str):
    users = load_users()
    users[username] = {
        "username": username,
        "hashed_password": hashed_password,
        "email": email,
        "role": role,
        "name": name
    }
    USERS_FILE.write_text(json.dumps(users, indent=2))

def get_user(username: str):
    users = load_users()
    return users.get(username)

def user_exists(username: str) -> bool:
    return get_user(username) is not None