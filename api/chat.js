import { rateLimit, getIP, sanitize, setSecurityHeaders } from "./_security.js";

const BOT = {
  hello:   "Hi there! Welcome to 11x Square. How can I help you?",
  hi:      "Hey! Great to see you. What can I help you with?",
  hey:     "Hey! What can I help you with?",
  service: "We offer:\n• Technology Consulting\n• Product & Strategy\n• Data & Intelligence\n• Startup Acceleration\n• Engineering Teams\n• Innovation Workshops\n\nWhich interests you?",
  career:  "We have internships and full-time roles open. Head to the Careers page and click any role to apply!",
  intern:  "Our intern program:\n• 3-month structured cohort\n• Real client projects from day one\n• Mentorship from senior consultants\n• Full-time conversion for top performers",
  apply:   "Click any role on the Careers page to open the application form!",
  contact: "Reach us at 11xsquarebusiness@gmail.com or use the 'Start a Project' form on the Contact page.",
  price:   "Pricing depends on your project scope. Fill out the 'Start a Project' form and we'll send a custom proposal!",
  thanks:  "You're welcome! Anything else I can help with?",
  thank:   "You're welcome! Anything else I can help with?",
  bye:     "Goodbye! Feel free to come back anytime. Have a great day!",
};

function botReply(text) {
  const lower = text.toLowerCase();
  for (const [key, reply] of Object.entries(BOT)) {
    if (lower.includes(key)) return reply;
  }
  return "Great question! For detailed inquiries email us at 11xsquarebusiness@gmail.com or use the Start a Project form.";
}

export default function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Rate limit: 30 messages per IP per minute
  if (!rateLimit(getIP(req), { limit: 30, windowMs: 60_000 })) {
    return res.status(429).json({ error: "Too many messages. Slow down!" });
  }

  const text = sanitize(req.body?.text, 500);
  if (!text) return res.status(400).json({ error: "Message is required." });

  res.json({ text: botReply(text), time: new Date().toISOString() });
}
