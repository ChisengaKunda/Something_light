import json
from pathlib import Path
from typing import List

DB_FILE = Path("db/patient_db.json")

def read_db() -> List[dict]:
    if DB_FILE.exists():
        return json.loads(DB_FILE.read_text())
    return []

def write_db(data: List[dict]) -> None:
    DB_FILE.write_text(json.dumps(data, indent=2))
