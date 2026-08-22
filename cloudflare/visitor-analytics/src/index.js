const DEFAULT_ALLOWED_ORIGINS = [
  'https://urbanmorphsoc.com',
  'https://www.urbanmorphsoc.com',
  'http://localhost:3000',
];

function allowedOrigins(env) {
  const configured = env.ALLOWED_ORIGINS?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  return configured?.length ? configured : DEFAULT_ALLOWED_ORIGINS;
}

function responseHeaders(request, env) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, max-age=0',
    'X-Content-Type-Options': 'nosniff',
  };
  const origin = request.headers.get('Origin');

  if (origin && allowedOrigins(env).includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers.Vary = 'Origin';
  }

  return headers;
}

function json(request, env, payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: responseHeaders(request, env),
  });
}

function jakartaDay(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function countryFrom(request) {
  const requestCountry = request.cf?.country || request.headers.get('CF-IPCountry') || 'XX';
  const country = requestCountry.toUpperCase();
  return /^[A-Z0-9]{2}$/.test(country) ? country : 'XX';
}

function looksLikeBot(request) {
  const userAgent = request.headers.get('User-Agent') || '';
  return /bot|crawler|spider|headless|lighthouse|pagespeed|pingdom|uptime/i.test(userAgent);
}

async function readStats(env, day) {
  const [totalResult, todayResult, countryCountResult, countriesResult] = await env.DB.batch([
    env.DB.prepare('SELECT COUNT(*) AS count FROM visitors'),
    env.DB.prepare('SELECT COUNT(*) AS count FROM daily_visitors WHERE day = ?1').bind(day),
    env.DB.prepare("SELECT COUNT(DISTINCT country) AS count FROM visitors WHERE country <> 'XX'"),
    env.DB.prepare(
      `SELECT country AS code, COUNT(*) AS visitors
       FROM visitors
       GROUP BY country
       ORDER BY visitors DESC, country ASC
       LIMIT 12`,
    ),
  ]);

  return {
    todayVisitors: Number(todayResult.results?.[0]?.count || 0),
    totalVisitors: Number(totalResult.results?.[0]?.count || 0),
    countryCount: Number(countryCountResult.results?.[0]?.count || 0),
    countries: (countriesResult.results || []).map((row) => ({
      code: String(row.code),
      visitors: Number(row.visitors),
    })),
    updatedAt: new Date().toISOString(),
  };
}

async function recordVisit(request, env) {
  const origin = request.headers.get('Origin');
  if (origin && !allowedOrigins(env).includes(origin)) {
    return json(request, env, { error: 'Origin not allowed' }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(request, env, { error: 'Invalid JSON body' }, 400);
  }

  const visitorId = typeof body.visitorId === 'string' ? body.visitorId.trim() : '';
  if (!/^[a-f0-9-]{16,64}$/i.test(visitorId)) {
    return json(request, env, { error: 'Invalid visitor ID' }, 400);
  }

  const day = jakartaDay();
  if (!looksLikeBot(request)) {
    const now = new Date().toISOString();
    const country = countryFrom(request);

    await env.DB.batch([
      env.DB.prepare(
        `INSERT INTO visitors (id, country, first_seen, last_seen)
         VALUES (?1, ?2, ?3, ?3)
         ON CONFLICT(id) DO UPDATE SET
           country = excluded.country,
           last_seen = excluded.last_seen`,
      ).bind(visitorId, country, now),
      env.DB.prepare(
        `INSERT INTO daily_visitors (day, visitor_id, country, first_seen)
         VALUES (?1, ?2, ?3, ?4)
         ON CONFLICT(day, visitor_id) DO NOTHING`,
      ).bind(day, visitorId, country, now),
    ]);
  }

  return json(request, env, await readStats(env, day));
}

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/visitors' && url.pathname !== '/api/visitors/') {
      return json(request, env, { error: 'Not found' }, 404);
    }

    if (request.method === 'OPTIONS') {
      const headers = responseHeaders(request, env);
      headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
      headers['Access-Control-Allow-Headers'] = 'Content-Type';
      headers['Access-Control-Max-Age'] = '86400';
      return new Response(null, { status: 204, headers });
    }

    if (request.method === 'GET') {
      return json(request, env, await readStats(env, jakartaDay()));
    }

    if (request.method === 'POST') return recordVisit(request, env);

    return json(request, env, { error: 'Method not allowed' }, 405);
  },
};

export default worker;
