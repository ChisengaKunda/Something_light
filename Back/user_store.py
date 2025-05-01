import json
from pathlib import Path

# Path to the JSON file that persists user data
USERS_FILE = Path(__file__).parent / "users.json"

# Initialize the file if it doesn't exist
if not USERS_FILE.exists():
    USERS_FILE.write_text("{}")


def _load_users() -> dict:
    """
    Load users.json, returning an empty dict on error or if file is empty.
    """
    try:
        text = USERS_FILE.read_text().strip()
        if not text:
            return {}
        return json.loads(text)
    except (json.JSONDecodeError, FileNotFoundError):
        return {}


def _save_users(users: dict):
    """
    Persist the in-memory users dict back to the JSON file.
    """
    USERS_FILE.write_text(json.dumps(users, indent=2))


# In-memory cache of users
_users: dict = _load_users()


def get_user(username: str) -> dict | None:
    """
    Retrieve a single user's record by username.
    Returns None if the user does not exist.
    """
    return _users.get(username)


def get_all_users() -> dict:
    """
    Return the entire users dictionary.
    """
    return _users


def add_user(username: str, password: str, role: str):
    """
    Add a new user to the in-memory store and persist to disk.
    Overwrites any existing entry for the same username.
    """
    _users[username] = {"password": password, "role": role}
    _save_users(_users)
