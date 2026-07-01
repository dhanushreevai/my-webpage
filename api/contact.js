import { connectDB, Contact } from "./_db.js";
import { rateLimit, getIP, sanitize, isValidEmail, isValidPhone, setSecurityHeaders } from "./_security.js";
import { sendContactEmails } from "./_email.js";

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Rate limit: 5 submissions per IP per 10 minutes
  if (!rateLimit(getIP(req), { limit: 5, windowMs: 600_000 })) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const name  = sanitize(req.body?.name,  100);
  const email = sanitize(req.body?.email, 200);
  const phone = sanitize(req.body?.phone,  20);

  if (!name || !email || !phone) return res.status(400).json({ error: "All fields are required." });
  if (!isValidEmail(email))      return res.status(400).json({ error: "Invalid email address." });
  if (!isValidPhone(phone))      return res.status(400).json({ error: "Invalid phone number." });

  try {
    await connectDB();
    const contact = await Contact.create({ name, email, phone });
    // Fire-and-forget — don't block the response
    sendContactEmails(name, email, phone).catch(err => console.error("Contact email error:", err));
    res.status(201).json({ message: "Contact saved successfully.", id: contact._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
}
