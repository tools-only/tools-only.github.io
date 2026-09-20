import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

database = Path.home() / '.cc-switch' / 'cc-switch.db'
with sqlite3.connect(database.as_uri() + '?mode=ro', uri=True) as connection:
    rows = connection.execute('SELECT date, SUM(request_count), SUM(input_tokens), SUM(output_tokens), SUM(cache_read_tokens), SUM(cache_creation_tokens), SUM(CAST(total_cost_usd AS REAL)) FROM usage_daily_rollups GROUP BY date ORDER BY date').fetchall()
keys = ['date', 'requests', 'input', 'output', 'cache', 'creation', 'cost']
payload = {'exportedAt': datetime.now(timezone.utc).isoformat(), 'source': 'cc-switch historical daily rollups', 'days': [dict(zip(keys, row)) for row in rows]}
destination = Path(__file__).resolve().parents[1] / 'usage-data.json'
destination.write_text(json.dumps(payload, ensure_ascii=False), encoding='utf-8')
print(f'Exported {len(rows)} daily aggregates')
