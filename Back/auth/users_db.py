import json
from pathlib import Path
from typing import Optional, Dict

USERS_FILE = Path("users.json")

def load_users() -> Dict[str, dict]:
    if not USERS_FILE.exists():
        USERS_FILE.write_text("{}")
    return json.loads(USERS_FILE.read_text())

def save_user(
    username: str,
    email: str,
    hashed_password: str,
    role: str,
    name: str
) -> None:
    """
    Create or overwrite a user record.
    """
    users = load_users()
    users[username] = {
        "username": username,
        "email": email,
        "hashed_password": hashed_password,
        "role": role,
        "name": name
    }
    USERS_FILE.write_text(json.dumps(users, indent=2))

# alias for backwards-compatibility if you were calling create_user()
create_user = save_user

def get_user(username: str) -> Optional[dict]:
    """
    Lookup by username.
    """
    users = load_users()
    return users.get(username)

def get_user_by_email(email: str) -> Optional[dict]:
    """
    Lookup by email address.
    """
    users = load_users()
    return next((u for u in users.values() if u.get("email") == email), None)

def user_exists(username: str) -> bool:
    """
    True if that username is already taken.
    """
    return get_user(username) is not None
