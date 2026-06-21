import { connectDB, Application } from "./_db.js";
import { rateLimit, getIP, sanitize, isValidEmail, isValidPhone, setSecurityHeaders } from "./_security.js";

export const config = {
  api: { bodyParser: { sizeLimit: "5mb" } },
};

const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Rate limit: 3 applications per IP per 10 minutes
  if (!rateLimit(getIP(req), { limit: 3, windowMs: 600_000 })) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const name           = sanitize(req.body?.name,           100);
  const email          = sanitize(req.body?.email,          200);
  const phone          = sanitize(req.body?.phone,           20);
  const resumeFileName = sanitize(req.body?.resumeFileName, 200);
  const resumeData     = req.body?.resumeData     ?? null;
  const resumeMimeType = req.body?.resumeMimeType ?? "";

  if (!name || !email || !phone) return res.status(400).json({ error: "All fields are required." });
  if (!isValidEmail(email))      return res.status(400).json({ error: "Invalid email address." });
  if (!isValidPhone(phone))      return res.status(400).json({ error: "Invalid phone number." });
  if (!resumeData)               return res.status(400).json({ error: "Resume file is required." });
  if (!ALLOWED_MIME.includes(resumeMimeType)) {
    return res.status(400).json({ error: "Only PDF, Word (.doc/.docx), and TXT files are allowed." });
  }

  // Sanity-check base64 size (5 MB decoded ≈ 6.67 MB base64)
  if (typeof resumeData === "string" && resumeData.length > 7_000_000) {
    return res.status(400).json({ error: "File too large. Maximum size is 5 MB." });
  }

  try {
    await connectDB();
    const application = await Application.create({ name, email, phone, resumeFileName, resumeData, resumeMimeType });
    res.status(201).json({ message: "Application submitted successfully.", id: application._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
}
