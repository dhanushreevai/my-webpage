import { connectDB, Contact } from "./_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    await connectDB();
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) return res.status(400).json({ error: "All fields are required." });
    const contact = await Contact.create({ name, email, phone });
    res.status(201).json({ message: "Contact saved successfully.", id: contact._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error. Please try again." });
  }
}
