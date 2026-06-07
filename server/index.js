require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Contact = require("./models/Contact.js");
const Application = require("./models/Application.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${file.originalname}`);
  },
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

app.post("/api/contact", async (req, res) => {
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

app.post("/api/apply", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone)
      return res.status(400).json({ error: "All fields are required." });
    if (!req.file)
      return res.status(400).json({ error: "Resume file is required." });
    const application = new Application({
      name,
      email,
      phone,
      resumeFileName: req.file.originalname,
      resumePath: req.file.path,
      resumeMimeType: req.file.mimetype,
    });
    await application.save();
    res.status(201).json({ message: "Application submitted successfully.", id: application._id });
  } catch (err) {
    if (err.message && err.message.includes("Only PDF"))
      return res.status(400).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
