import json
from pathlib import Path
from typing import List

DB_FILE = Path("db/patient_db.json")

def read_db() -> List[dict]:
    if not DB_FILE.exists() or DB_FILE.read_text().strip() == "":
        DB_FILE.write_text("[]")
    return json.loads(DB_FILE.read_text())

def write_db(data: List[dict]) -> None:
    DB_FILE.write_text(json.dumps(data, indent=2))
