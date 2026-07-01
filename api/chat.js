import Anthropic from "@anthropic-ai/sdk";
import { rateLimit, getIP, sanitize, setSecurityHeaders } from "./_security.js";

const SYSTEM_PROMPT = `You are a friendly, concise virtual assistant for 11x Square — an elite technology consulting, talent placement, and digital transformation company based in the UK with operations in India.

Keep every reply to 2–4 short sentences max. Be warm, professional, and always guide users toward taking action (contacting us, applying, exploring services). Never make up information not listed here.

── ABOUT ──
11x Square bridges elite engineering and strategic growth with a platform-first approach.
Email: 11xsquarebusiness@gmail.com | WhatsApp: +447778303743
Stats: 120+ projects delivered · 48+ interns placed · 11x avg ROI · 32+ partner companies

── SERVICES ──
1. Technology Consulting — architecture reviews, tech stack decisions, digital transformation roadmaps
2. Product & Strategy — market positioning, product-market fit, go-to-market strategy
3. Data & Intelligence — data pipelines, dashboards, ML systems, business intelligence
4. Startup Acceleration — MVP to investor-ready product, pitch decks, hands-on founder support
5. Engineering Teams — source, vet, and deploy engineering squads (full-time / contract / project)
6. Innovation Workshops — design sprints and innovation sessions that solve deep problems in days

── OPEN ROLES ──
• Software Engineering Intern — Hybrid · Chennai (Summer 2025)
• Product Strategy Intern — Remote (Summer 2025)
• Data & Analytics Intern — Hybrid · Bangalore (Fall 2025)
• Senior Consultant — Full-time · Chennai
• Tech Lead — Full-time · Remote
• UX Researcher — Contract · Remote

── PRICING ──
Custom proposals based on project scope. Direct users to fill the "Start a Project" form on the Contact page for a tailored quote.

── PROCESS ──
Discovery → Strategy → Execution → Scale

If you don't know the answer, direct users to email 11xsquarebusiness@gmail.com.`;

const client = new Anthropic();

export default async function handler(req, res) {
  setSecurityHeaders(res);
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!rateLimit(getIP(req), { limit: 20, windowMs: 60_000 })) {
    return res.status(429).json({ error: "Too many messages. Slow down!" });
  }

  const text = sanitize(req.body?.text, 500);
  if (!text) return res.status(400).json({ error: "Message is required." });

  // Build conversation history from previous messages (last 10 for context)
  const rawHistory = Array.isArray(req.body?.history) ? req.body.history : [];
  const history = rawHistory
    .slice(-10)
    .filter((m) => m.from && m.text)
    .map((m) => ({
      role: m.from === "user" ? "user" : "assistant",
      content: String(m.text).slice(0, 500),
    }));

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [...history, { role: "user", content: text }],
    });

    const reply =
      response.content[0]?.text ??
      "I'm not sure about that! Email us at 11xsquarebusiness@gmail.com and we'll get right back to you.";

    res.json({ text: reply, time: new Date().toISOString() });
  } catch (err) {
    console.error("Claude API error:", err.message);
    res.status(500).json({
      text: "I'm having a hiccup right now. Email us at 11xsquarebusiness@gmail.com and we'll help you directly!",
      time: new Date().toISOString(),
    });
  }
}
