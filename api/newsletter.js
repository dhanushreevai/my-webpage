import { connectDB } from "./_db.js";
import { rateLimit, getIP, sanitize, isValidEmail, setSecurityHeaders } from "./_security.js";
import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  { email: { type: String, required: true, unique: true, lowercase: true, trim: true } },
  { timestamps: true }
);
const Newsletter = mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema);

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!rateLimit(getIP(req), { limit: 3, windowMs: 600_000 })) {
    return res.status(429).json({ error: "Too many requests." });
  }
  const email = sanitize(req.body?.email, 200).toLowerCase();
  if (!isValidEmail(email)) return res.status(400).json({ error: "Invalid email address." });
  try {
    await connectDB();
    await Newsletter.create({ email });
    res.status(201).json({ message: "Subscribed!" });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: "Already subscribed!" });
    res.status(500).json({ error: "Server error." });
  }
}
