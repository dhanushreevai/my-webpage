// Shared security helpers for all API routes

// ── In-memory rate limiter (per serverless instance) ──────────────────────────
const _store = new Map();

export function rateLimit(ip, { limit = 10, windowMs = 60_000 } = {}) {
  const now = Date.now();
  let entry = _store.get(ip);

  if (!entry || now - entry.start > windowMs) {
    entry = { count: 1, start: now };
  } else {
    entry.count++;
  }
  _store.set(ip, entry);

  // Prevent unbounded growth
  if (_store.size > 2000) {
    for (const [k, v] of _store) {
      if (now - v.start > windowMs) _store.delete(k);
    }
  }

  return entry.count <= limit;
}

export function getIP(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.headers["x-real-ip"] ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

// ── Input sanitization ─────────────────────────────────────────────────────────
export function sanitize(val, maxLen = 300) {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLen).replace(/<[^>]*>/g, "");
}

export function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export function isValidPhone(phone) {
  return typeof phone === "string" && /^[+\d\s\-().]{6,20}$/.test(phone);
}

// ── HTTP Basic Auth for admin routes ──────────────────────────────────────────
export function requireAdminAuth(req, res) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", 'Basic realm="11x Admin"');
    res.status(401).send("Unauthorized");
    return false;
  }

  const decoded = Buffer.from(auth.slice(6), "base64").toString("utf8");
  const colon = decoded.indexOf(":");
  const user = decoded.slice(0, colon);
  const pass = decoded.slice(colon + 1);

  const validUser = (process.env.ADMIN_USER || "").trim();
  const validPass = (process.env.ADMIN_PASS || "").trim();

  if (!validUser || !validPass || user.trim() !== validUser || pass.trim() !== validPass) {
    res.setHeader("WWW-Authenticate", 'Basic realm="11x Admin"');
    res.status(401).send("Unauthorized");
    return false;
  }

  return true;
}

// ── Common security response headers ──────────────────────────────────────────
export function setSecurityHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
}
