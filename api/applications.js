import { connectDB, Application } from "./_db.js";
import { requireAdminAuth, setSecurityHeaders } from "./_security.js";

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (!requireAdminAuth(req, res)) return;

  if (req.method === "DELETE") {
    try {
      await connectDB();
      const { id } = req.query;
      if (!id || !/^[a-f\d]{24}$/i.test(id)) return res.status(400).json({ error: "Invalid id." });
      await Application.findByIdAndDelete(id);
      return res.status(200).json({ message: "Deleted" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
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
    .del-btn { background: #7B2020; color: #FCA5A5; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
    .del-btn:hover { background: #991B1B; }
  </style>
</head>
<body>
  <div class="nav">
    <a href="/api/contacts">→ View Project Inquiries</a>
  </div>
  <h1>Applications</h1>
  <p class="count">${list.length} total · sorted by most recent</p>
  <table>
    <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Resume</th><th>Submitted</th><th></th></tr>
    ${list.map((a, i) => `
    <tr id="row-${a.id}">
      <td>${i + 1}</td>
      <td>${a.name}</td>
      <td>${a.email}</td>
      <td>${a.phone}</td>
      <td>
        <a href="/api/preview?id=${a.id}" target="_blank">Preview</a>
        <a href="${a.downloadLink}" target="_blank">Download</a>
      </td>
      <td>${new Date(a.submittedAt).toLocaleString()}</td>
      <td><button class="del-btn" onclick="deleteApp('${a.id}', this)">Delete</button></td>
    </tr>`).join("")}
  </table>
  <script>
    async function deleteApp(id, btn) {
      if (!confirm("Delete this application?")) return;
      btn.disabled = true; btn.textContent = "…";
      const r = await fetch("/api/applications?id=" + id, { method: "DELETE" });
      if (r.ok) { document.getElementById("row-" + id).remove(); }
      else { btn.textContent = "Error"; }
    }
  </script>
</body>
</html>`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
