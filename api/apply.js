import { connectDB, Application } from "./_db.js";

export const config = {
  api: { bodyParser: { sizeLimit: "10mb" } },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    await connectDB();
    const { name, email, phone, resumeFileName, resumeData, resumeMimeType } = req.body;
    if (!name || !email || !phone) return res.status(400).json({ error: "All fields are required." });
    if (!resumeData) return res.status(400).json({ error: "Resume file is required." });

    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    if (!allowed.includes(resumeMimeType)) return res.status(400).json({ error: "Only PDF, Word (.doc/.docx), and TXT files are allowed." });

    const application = await Application.create({ name, email, phone, resumeFileName, resumeData, resumeMimeType });
    res.status(201).json({ message: "Application submitted successfully.", id: application._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error. Please try again." });
  }
}
