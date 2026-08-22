CREATE TABLE IF NOT EXISTS visitors (
  id TEXT PRIMARY KEY,
  country TEXT NOT NULL,
  first_seen TEXT NOT NULL,
  last_seen TEXT NOT NULL
) STRICT;

CREATE TABLE IF NOT EXISTS daily_visitors (
  day TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  country TEXT NOT NULL,
  first_seen TEXT NOT NULL,
  PRIMARY KEY (day, visitor_id)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_visitors_country
  ON visitors (country);

CREATE INDEX IF NOT EXISTS idx_daily_visitors_day
  ON daily_visitors (day);
