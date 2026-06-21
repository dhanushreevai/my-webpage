import { connectDB, Contact } from "./_db.js";
import { setSecurityHeaders } from "./_security.js";

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.setHeader("Content-Type", "text/html");
    res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Project Inquiries — 11x Square</title>
  <style>
    body { font-family: sans-serif; background: #0C1A0E; color: #F5EFE6; padding: 2rem; }
    h1 { color: #C4A882; margin-bottom: 0.25rem; }
    .count { color: #7FB38A; margin-bottom: 1.5rem; font-size: 0.85rem; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #1A3320; color: #7FB38A; padding: 10px 14px; text-align: left; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; }
    td { padding: 10px 14px; border-bottom: 1px solid #2D5A3D; font-size: 0.9rem; }
    tr:hover td { background: #1A3320; }
    .nav { margin-bottom: 1.5rem; }
    .nav a { color: #C4A882; text-decoration: none; margin-right: 1rem; font-size: 0.85rem; }
    .nav a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="nav">
    <a href="/api/applications">→ View Applications</a>
  </div>
  <h1>Project Inquiries</h1>
  <p class="count">${contacts.length} total · sorted by most recent</p>
  <table>
    <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Submitted</th></tr>
    ${contacts.map((c, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${escHtml(c.name)}</td>
      <td>${escHtml(c.email)}</td>
      <td>${escHtml(c.phone)}</td>
      <td>${new Date(c.createdAt).toLocaleString()}</td>
    </tr>`).join("")}
  </table>
</body>
</html>`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function escHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
