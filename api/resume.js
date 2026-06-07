import { connectDB, Application } from "./_db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "ID is required." });
  try {
    await connectDB();
    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ error: "Application not found." });
    const buffer = Buffer.from(app.resumeData, "base64");
    res.setHeader("Content-Type", app.resumeMimeType || "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${app.resumeFileName || "resume"}"`);
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
