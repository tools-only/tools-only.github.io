"""Export only daily aggregates from a read-only cc-switch snapshot.

Matches cc-switch services/sql_helpers.rs and usage_stats.rs:
fresh_input_sql + effective_usage_log_filter. Archived rows are pruned
transactionally, so remaining details must be added even on a shared day.
"""
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

FRESH_INPUT = """CASE
 WHEN input_token_semantics = 2 THEN input_tokens
 WHEN app_type IN ('codex', 'gemini', 'grokbuild')
  AND input_token_semantics = 1
  AND input_tokens >= cache_read_tokens + cache_creation_tokens
 THEN input_tokens - cache_read_tokens - cache_creation_tokens
 WHEN app_type IN ('codex', 'gemini', 'grokbuild')
  AND input_token_semantics = 0 AND input_tokens >= cache_read_tokens
 THEN input_tokens - cache_read_tokens
 ELSE input_tokens END"""
EFFECTIVE = """NOT (
 COALESCE(l.data_source, 'proxy') IN
 ('session_log', 'codex_session', 'gemini_session', 'opencode_session')
 AND EXISTS (
 SELECT 1 FROM proxy_request_logs p
 WHERE COALESCE(p.data_source, 'proxy') = 'proxy'
 AND p.app_type IN (l.app_type,
  CASE WHEN l.app_type = 'claude' THEN 'claude-desktop' ELSE l.app_type END)
 AND p.status_code >= 200 AND p.status_code < 300
 AND p.input_tokens = l.input_tokens AND p.output_tokens = l.output_tokens
 AND p.cache_read_tokens = l.cache_read_tokens
 AND (p.cache_creation_tokens = l.cache_creation_tokens OR
  (l.cache_creation_tokens = 0 AND l.data_source IN
   ('codex_session', 'gemini_session', 'opencode_session')))
 AND p.created_at BETWEEN l.created_at - 600 AND l.created_at + 600
 AND (LOWER(p.model) = LOWER(l.model) OR LOWER(p.model) = 'unknown'
  OR LOWER(l.model) = 'unknown')
))"""
KEYS = ['date', 'requests', 'input', 'output', 'cache', 'creation', 'cost']


def export(database):
    with sqlite3.connect(database.as_uri() + '?mode=ro', uri=True) as connection:
        connection.execute('BEGIN')
        # Explicit UTC+8 matches this installation's Asia/Shanghai local dates.
        rows = connection.execute(f"""
        SELECT date, SUM(requests), SUM(fresh), SUM(output_tokens),
          SUM(cache_read_tokens), SUM(cache_creation_tokens), SUM(cost)
        FROM (
          SELECT date, request_count AS requests, {FRESH_INPUT} AS fresh,
            output_tokens, cache_read_tokens, cache_creation_tokens,
            CAST(total_cost_usd AS REAL) AS cost FROM usage_daily_rollups
          UNION ALL
          SELECT date(created_at, 'unixepoch', '+8 hours'), 1,
            {FRESH_INPUT}, output_tokens, cache_read_tokens,
            cache_creation_tokens, CAST(total_cost_usd AS REAL)
          FROM proxy_request_logs l WHERE {EFFECTIVE}
        ) GROUP BY date ORDER BY date
        """).fetchall()
        raw = connection.execute('SELECT COUNT(*) FROM proxy_request_logs').fetchone()[0]
        kept = connection.execute(f'SELECT COUNT(*) FROM proxy_request_logs l WHERE {EFFECTIVE}').fetchone()[0]
        archived = connection.execute('SELECT SUM(request_count) FROM usage_daily_rollups').fetchone()[0] or 0
        assert sum(row[1] for row in rows) == archived + kept
    days = [dict(zip(KEYS, row)) for row in rows]
    assert all(day[key] >= 0 for day in days for key in KEYS[1:])
    payload = {
        'exportedAt': datetime.now(timezone.utc).isoformat(),
        'source': 'cc-switch daily rollups and deduplicated request logs',
        'timeZone': 'Asia/Shanghai',
        'tokenSemantics': 'fresh input + output + cache read + cache creation',
        'days': days,
    }
    print(f'Archived requests: {archived}; recent: {raw}; duplicates excluded: {raw-kept}; total: {archived+kept}')
    return payload


if __name__ == '__main__':
    payload = export(Path.home() / '.cc-switch' / 'cc-switch.db')
    destination = Path(__file__).resolve().parents[1] / 'usage-data.json'
    destination.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f"Exported {len(payload['days'])} daily aggregates")
