import { connectDB, Application } from "./_db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  try {
    await connectDB();
    const apps = await Application.find({}, { resumeData: 0 }).sort({ createdAt: -1 });
    const list = apps.map((a) => ({
      id: a._id,
      name: a.name,
      email: a.email,
      phone: a.phone,
      resumeFileName: a.resumeFileName,
      submittedAt: a.createdAt,
      downloadLink: `/api/resume?id=${a._id}`,
    }));
    res.setHeader("Content-Type", "text/html");
    res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Applications — 11x Square</title>
  <style>
    body { font-family: sans-serif; background: #0C1A0E; color: #F5EFE6; padding: 2rem; }
    h1 { color: #C4A882; margin-bottom: 0.25rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th { background: #1A3320; color: #7FB38A; padding: 10px 14px; text-align: left; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; }
    td { padding: 10px 14px; border-bottom: 1px solid #2D5A3D; font-size: 0.9rem; }
    tr:hover td { background: #1A3320; }
    a { color: #C4A882; text-decoration: none; margin-right: 0.75rem; }
    a:hover { text-decoration: underline; }
    .count { color: #7FB38A; margin-bottom: 1.5rem; font-size: 0.85rem; }
    .nav { margin-bottom: 1.5rem; }
    .nav a { font-size: 0.85rem; }
  </style>
</head>
<body>
  <div class="nav">
    <a href="/api/contacts">→ View Project Inquiries</a>
  </div>
  <h1>Applications</h1>
  <p class="count">${list.length} total · sorted by most recent</p>
  <table>
    <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Resume</th><th>Submitted</th></tr>
    ${list.map((a, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${a.name}</td>
      <td>${a.email}</td>
      <td>${a.phone}</td>
      <td>
        <a href="/api/preview?id=${a.id}" target="_blank">Preview</a>
        <a href="${a.downloadLink}" target="_blank">Download</a>
      </td>
      <td>${new Date(a.submittedAt).toLocaleString()}</td>
    </tr>`).join("")}
  </table>
</body>
</html>`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
