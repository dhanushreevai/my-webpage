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
    h1 { color: #C4A882; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th { background: #1A3320; color: #7FB38A; padding: 10px; text-align: left; }
    td { padding: 10px; border-bottom: 1px solid #2D5A3D; }
    a { color: #C4A882; }
    .count { color: #7FB38A; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <h1>Applications (${list.length})</h1>
  <p class="count">Sorted by most recent first</p>
  <table>
    <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Resume</th><th>Submitted</th></tr>
    ${list.map((a, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${a.name}</td>
      <td>${a.email}</td>
      <td>${a.phone}</td>
      <td><a href="${a.downloadLink}" target="_blank">${a.resumeFileName || "Download"}</a></td>
      <td>${new Date(a.submittedAt).toLocaleString()}</td>
    </tr>`).join("")}
  </table>
</body>
</html>`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
