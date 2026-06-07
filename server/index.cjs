require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");

const Contact = require("./models/Contact.js");
const Application = require("./models/Application.js");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ── Rate limiter ──────────────────────────────────────────────────────────────
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 min window
  max: 15,                     // max 15 submissions per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again after 15 minutes." },
});

// ── File upload ───────────────────────────────────────────────────────────────
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) =>
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`),
});
const fileFilter = (_req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only PDF, Word (.doc/.docx), and TXT files are allowed."), false);
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

// ── Routes ────────────────────────────────────────────────────────────────────
app.post("/api/contact", formLimiter, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone)
      return res.status(400).json({ error: "All fields are required." });
    const contact = new Contact({ name, email, phone });
    await contact.save();
    res.status(201).json({ message: "Contact saved successfully.", id: contact._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

app.post("/api/apply", formLimiter, upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone)
      return res.status(400).json({ error: "All fields are required." });
    if (!req.file)
      return res.status(400).json({ error: "Resume file is required." });
    const application = new Application({
      name, email, phone,
      resumeFileName: req.file.originalname,
      resumePath: req.file.path,
      resumeMimeType: req.file.mimetype,
    });
    await application.save();
    res.status(201).json({ message: "Application submitted successfully.", id: application._id });
  } catch (err) {
    if (err.message?.includes("Only PDF"))
      return res.status(400).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// ── Chatbot via Socket.io ─────────────────────────────────────────────────────
const BOT = {
  hello:    "👋 Hi there! Welcome to 11x Square. How can I help you?",
  hi:       "👋 Hey! Great to see you. What can I help you with?",
  hey:      "👋 Hey! Great to see you. What can I help you with?",
  service:  "🚀 We offer:\n• Technology Consulting\n• Product & Strategy\n• Data & Intelligence\n• Startup Acceleration\n• Engineering Teams\n• Innovation Workshops\n\nWhich interests you?",
  career:   "💼 We have internships and full-time roles open. Head to the Careers page and click any role to apply!",
  intern:   "🎓 Our intern program:\n• 3-month structured cohort\n• Real client projects from day one\n• Mentorship from senior consultants\n• Full-time conversion for top performers",
  apply:    "📝 Click any role on the Careers page to open the application form directly!",
  contact:  "📧 Reach us at hello@11xsquare.com or use the 'Start a Project' form on the Contact page.",
  price:    "💰 Pricing depends on your project scope. Fill out the 'Start a Project' form and we'll send a custom proposal!",
  thanks:   "😊 You're welcome! Anything else I can help with?",
  thank:    "😊 You're welcome! Anything else I can help with?",
  bye:      "👋 Goodbye! Feel free to come back anytime. Have a great day!",
};

function botReply(text) {
  const lower = text.toLowerCase();
  for (const [key, reply] of Object.entries(BOT)) {
    if (lower.includes(key)) return reply;
  }
  return "🤔 Great question! For detailed inquiries email us at hello@11xsquare.com or use the Start a Project form. Anything else I can help with?";
}

// Per-socket rate limit: max 30 messages per minute
const socketMsgCount = new Map();

io.on("connection", (socket) => {
  console.log(`[Chat] Connected: ${socket.id}`);
  socketMsgCount.set(socket.id, { count: 0, resetAt: Date.now() + 60_000 });

  socket.emit("bot-message", {
    text: "👋 Welcome to 11x Square! I'm your virtual assistant. Ask me about our services, careers, or how to get in touch!",
    time: new Date().toISOString(),
  });

  socket.on("user-message", (data) => {
    // per-socket rate limit
    const now = Date.now();
    const rec = socketMsgCount.get(socket.id) || { count: 0, resetAt: now + 60_000 };
    if (now > rec.resetAt) { rec.count = 0; rec.resetAt = now + 60_000; }
    rec.count++;
    socketMsgCount.set(socket.id, rec);

    if (rec.count > 30) {
      socket.emit("bot-message", { text: "⚠️ You're sending messages too fast. Please slow down.", time: new Date().toISOString() });
      return;
    }

    setTimeout(() => {
      socket.emit("bot-message", { text: botReply(data.text), time: new Date().toISOString() });
    }, 300);
  });

  socket.on("disconnect", () => {
    socketMsgCount.delete(socket.id);
    console.log(`[Chat] Disconnected: ${socket.id}`);
  });
});

// ── MongoDB + start ───────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
