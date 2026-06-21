import { useState, useEffect, useRef, useCallback } from "react";
import logo from "./image/11x-logo.jpeg";

const NAV_LINKS = ["Services", "Careers", "Process", "Contact"];

const SERVICES = [
  {
    num: "01",
    icon: "⚡",
    title: "Technology Consulting",
    desc: "Architecture reviews, tech stack decisions, and digital transformation roadmaps tailored to your growth stage.",
    tags: ["Cloud", "AI/ML", "Infra"],
    color: "indigo",
    image: "/tech-consulting.png",
  },
  {
    num: "02",
    icon: "📊",
    title: "Product & Strategy",
    desc: "Market positioning, product-market fit analysis, and go-to-market strategies that build lasting competitive advantage.",
    tags: ["GTM", "Research", "OKRs"],
    color: "orange", 
    image: "/product-strategy.png",
  },
  {
    num: "03",
    icon: "🔬",
    title: "Data & Intelligence",
    desc: "Build data pipelines, dashboards, and ML systems that turn raw numbers into actionable business intelligence.",
    tags: ["Analytics", "BI", "Python"],
    color: "purple", 
    image: "https://picsum.photos/seed/data/400/300",
  },
  {
    num: "04",
    icon: "🚀",
    title: "Startup Acceleration",
    desc: "Hands-on support for early-stage founders — from MVP to investor-ready product and pitch decks.",
    tags: ["MVP", "Pitch", "Scale"],
    color: "pink", 
    image: "https://picsum.photos/seed/startup/400/300",
  },
  {
    num: "05",
    icon: "🎯",
    title: "Engineering Teams",
    desc: "We source, vet, and deploy high-performing engineering squads — full-time, contract, or project-based.",
    tags: ["Hiring", "Remote", "Teams"],
    color: "emerald", 
    image: "https://picsum.photos/seed/engineering/400/300",
  },
  {
    num: "06",
    icon: "💡",
    title: "Innovation Workshops",
    desc: "Facilitated design sprints and innovation sessions that solve deep problems in days, not months.",
    tags: ["Sprint", "UX", "Ideation"],
    color: "amber", 
    image: "https://picsum.photos/seed/innovation/400/300",
  },
];

const ROLES = [
  { title: "Software Engineering Intern", type: "intern", location: "Hybrid · Chennai", period: "Summer 2025" },
  { title: "Product Strategy Intern", type: "intern", location: "Remote", period: "Summer 2025" },
  { title: "Data & Analytics Intern", type: "intern", location: "Hybrid · Bangalore", period: "Fall 2025" },
  { title: "Senior Consultant", type: "full", location: "Full-time · Chennai", period: "Open" },
  { title: "Tech Lead", type: "full", location: "Full-time · Remote", period: "Open" },
  { title: "UX Researcher", type: "full", location: "Contract · Remote", period: "Open" },
];

const STEPS = [
  { num: "01", title: "Discovery", desc: "We audit your stack, team, and goals to understand what's holding you back and what's possible.", color: "text-[#0EA5E9]" },
  { num: "02", title: "Strategy", desc: "A clear, actionable roadmap with milestones, owners, and measurable success criteria.", color: "text-[#0284C7]" },
  { num: "03", title: "Execution", desc: "Embedded consultants and curated talent work alongside your team to ship results.", color: "text-[#0284C7]" },
  { num: "04", title: "Scale", desc: "We hand off with documentation, playbooks, and a team ready to multiply the wins.", color: "text-[#38BDF8]" },
];

const STATS = [
  { val: "120", unit: "+", label: "Projects Delivered", color: "text-[#38BDF8]" },
  { val: "48",  unit: "+", label: "Interns Placed",     color: "text-[#E2E8F0]" },
  { val: "11",  unit: "x", label: "Average ROI",        color: "text-[#FFFFFF]" },
  { val: "32",  unit: "+", label: "Partner Companies",  color: "text-[#0EA5E9]" },
];

const MARQUEE_ITEMS = [
  "Strategic Consulting", "Tech Talent Placement", "Intern Hiring Programs",
  "Software Architecture", "Product Strategy", "Data & Analytics",
  "Digital Transformation", "Team Building",
];

function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const t = parseInt(target);
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * t));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function MagneticButton({ children, className = "", onClick, style: customStyle = {} }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <div className="magnetic-area" onMouseMove={handleMouseMove} onMouseLeave={reset}>
      <button
        ref={buttonRef}
        onClick={onClick}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: position.x === 0 ? "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)" : "none",
          ...customStyle
        }}
        className={className}
      >
        {children}
      </button>
    </div>
  );
}

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setWidth((winScroll / height) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <div className="fixed top-0 left-0 h-1 z-[60] transition-all duration-100" style={{ width: `${width}%`, background: "linear-gradient(90deg,#0EA5E9,#0EA5E9)" }} />;
}

function MouseSpotlight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] opacity-50" style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14,165,233,0.07), transparent 80%)` }} />
  );
}

function StatCard({ val, unit, label, animate, color, delay }) {
  const num = useCountUp(val, 1200, animate);
  return (
    <div className="flex flex-col gap-1">
      <div className={`text-4xl font-black tracking-tight leading-none ${color || "text-zinc-900"}`}>
        {animate ? num : val}
        <span className="opacity-60">{unit}</span>
      </div>
      <div className="text-xs uppercase tracking-wide font-medium" style={{ color: "#94A3B8" }}>{label}</div>
    </div>
  );
}

function ServiceCard({ num, title, desc, tags, color, image, delay }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const multiplier = 12; // Controls tilt intensity
    const xRotation = (multiplier * (y - rect.height / 2)) / rect.height;
    const yRotation = (multiplier * (rect.width / 2 - x)) / rect.width;

    setRotation({ x: xRotation, y: yRotation });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare(g => ({ ...g, opacity: 0 }));
  };

  const THEMES = {
    indigo:  { bar: "bg-[#0EA5E9]", tag: "rgba(14,165,233,0.12)",  tagText: "#0369A1" },
    orange:  { bar: "bg-[#F97316]", tag: "rgba(249,115,22,0.10)",  tagText: "#C2410C" },
    purple:  { bar: "bg-[#8B5CF6]", tag: "rgba(139,92,246,0.10)",  tagText: "#6D28D9" },
    pink:    { bar: "bg-[#14B8A6]", tag: "rgba(20,184,166,0.10)",  tagText: "#0F766E" },
    emerald: { bar: "bg-[#10B981]", tag: "rgba(16,185,129,0.10)",  tagText: "#047857" },
    amber:   { bar: "bg-[#F59E0B]", tag: "rgba(245,158,11,0.10)",  tagText: "#B45309" },
  };
  const theme = THEMES[color] || { bar: "bg-[#0EA5E9]", tag: "rgba(14,165,233,0.12)", tagText: "#0369A1" };

  const isResting = rotation.x === 0 && rotation.y === 0;

  return (
    <div
      className="group fade-up"
      style={{ animationDelay: `${delay}s`, perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={e => { e.currentTarget.style.background = "#1E293B"; }}
        onMouseLeave={e => { handleMouseLeave(); e.currentTarget.style.background = "#111827"; }}
        className="relative p-8 cursor-default overflow-hidden hover:z-10"
        style={{
          transform: `translateY(${isResting ? 0 : -8}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isResting ? "transform 0.6s ease-out" : "none",
          transformStyle: "preserve-3d",
          background: "#111827",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 80%)`,
            opacity: glare.opacity
          }}
        />
        <div
          className={`absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500 ${theme.bar}`}
        />
        {image && (
          <img src={image} alt={title} className="w-full h-32 object-cover mb-6 rounded-md translate-z-10" />
        )}
        <div className="font-mono text-[11px] tracking-wider mb-4 translate-z-10" style={{ color: "#0EA5E9" }}>{num}</div>
        <h3 className="text-2xl font-black mb-4 tracking-tighter leading-none group-hover:translate-z-30 transition-transform duration-500" style={{ color: "#FFFFFF" }}>{title}</h3>
        <p className="text-[15px] font-medium leading-relaxed max-w-[280px] group-hover:translate-z-20 transition-transform duration-500" style={{ color: "#94A3B8" }}>{desc}</p>
        <div className="flex flex-wrap gap-2 mt-5 group-hover:translate-z-10 transition-transform duration-500">
          {tags.map((t, i) => (
            <span key={i} className="font-mono text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-bold"
              style={{ background: theme.tag, color: theme.tagText }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoleItem({ title, type, location, period, delay, onApply }) {
  return (
    <div
      onClick={onApply}
      className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 transition-all duration-300 cursor-pointer group"
      style={{ background: "rgba(13,17,23,0.80)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      onMouseEnter={e => e.currentTarget.style.background="rgba(30,41,59,0.88)"}
      onMouseLeave={e => e.currentTarget.style.background="rgba(13,17,23,0.80)"}
    >
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-bold" style={{ color: "#FFFFFF" }}>{title}</span>
        <div className="flex gap-4 font-mono text-[11px]" style={{ color: "#0EA5E9" }}>
          <span>{location}</span>
          <span>{period}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-[10px] px-2.5 py-1 rounded-sm uppercase tracking-normal"
          style={type === "intern"
            ? { background: "rgba(14,165,233,0.12)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.3)" }
            : { background: "rgba(251,113,133,0.08)", color: "#0284C7", border: "1px solid rgba(251,113,133,0.25)" }
          }
        >
          {type === "intern" ? "Intern" : "Full-time"}
        </span>
        <span className="text-2xl transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: "#0EA5E9" }}>
          ↗
        </span>
      </div>
    </div>
  );
}

function Logo({ onClick, className = "", size = "nav", dark = false }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2.5 cursor-pointer active:scale-95 ${className}`}
      style={{ transition: "opacity 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >
      {size === "footer" && (
        <img
          src={logo}
          alt="11x Logo"
          className="h-12 w-auto rounded-xl"
        />
      )}
      <div className="flex flex-col leading-none">
        <span className={`font-black tracking-tighter ${size === "footer" ? "text-3xl" : "text-[22px]"}`} style={{ color: dark ? "#1A1A1A" : "#FFFFFF", lineHeight: 1 }}>
          11x<span style={{ color: "#0284C7" }}>Square</span>
        </span>
        {size === "footer" && (
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: "#AAAAAA", marginTop: 2 }}>Consulting · Talent</span>
        )}
      </div>
    </div>
  );
}

const API_BASE = "/api";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

function launchConfetti() {
  const colors = ["#0EA5E9", "#38BDF8", "#7DD3FC", "#FFFFFF", "#0284C7", "#BAE6FD"];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    const size = 5 + Math.random() * 8;
    el.style.cssText = `position:fixed;pointer-events:none;z-index:9999;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>0.5?"50%":"2px"};left:${5+Math.random()*90}%;top:-10px;animation:confettiFall ${1.5+Math.random()*1.5}s ease-in forwards;animation-delay:${Math.random()*0.6}s;transform:rotate(${Math.random()*360}deg)`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

function TypingText({ words = [] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const timer = setTimeout(() => {
      if (!deleting) {
        if (displayed.length < word.length) setDisplayed(word.slice(0, displayed.length + 1));
        else setTimeout(() => setDeleting(true), 1800);
      } else {
        if (displayed.length > 0) setDisplayed(displayed.slice(0, -1));
        else { setDeleting(false); setIdx((i) => (i + 1) % words.length); }
      }
    }, deleting ? 60 : 110);
    return () => clearTimeout(timer);
  }, [displayed, deleting, idx, words]);
  return <>{displayed}<span className="typing-cursor">|</span></>;
}

/* Nature palette */
const N = {
  green:      "#0EA5E9",
  greenLight: "#0284C7",
  greenMid:   "#0369A1",
  brown:      "#888888",
  brownLight: "#CCCCCC",
  beige:      "#0EA5E9",
  beigeLight: "#E0F2FE",
  cream:      "#FFFFFF",
  leaf:       "rgba(255,255,255,0.08)",
};

function LeafDecor({ className = "" }) {
  return (
    <svg className={`absolute pointer-events-none opacity-20 ${className}`} viewBox="0 0 120 120" fill="none">
      <path d="M60 10 C20 10 10 50 30 80 C50 110 90 100 100 70 C110 40 100 10 60 10Z" fill="white"/>
      <path d="M60 10 L60 90" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M60 30 Q40 50 35 65" stroke="white" strokeWidth="1" strokeLinecap="round"/>
      <path d="M60 30 Q80 50 85 65" stroke="white" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function SuccessModal({ onClose, title, subtitle }) {
  useEffect(() => {
    const k = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(5,10,15,0.88)", backdropFilter: "blur(14px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-sm rounded-2xl shadow-2xl animate-fadeIn overflow-hidden"
        style={{ background: "#0D1B2E", border: "1px solid rgba(14,165,233,0.25)" }}
      >
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg,transparent,#0284C7,transparent)" }} />
        <div className="flex flex-col items-center gap-6 px-8 py-12 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(14,165,233,0.12)", border: "1.5px solid rgba(14,165,233,0.35)" }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="14" stroke="#0284C7" strokeWidth="1.5" strokeOpacity="0.5"/>
              <path d="M8 15.5l5 5 9-10" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-xl font-black text-white mb-2 tracking-tight">{title}</p>
            <p className="text-sm leading-relaxed" style={{ color: "#CCCCCC" }}>{subtitle}</p>
          </div>
          <button onClick={onClose}
            className="font-bold text-sm px-10 py-3 rounded-full cursor-pointer transition-all duration-200 border-0"
            style={{ background: "#0EA5E9", color: "#fff" }}
            onMouseEnter={e => e.target.style.background="#0284C7"}
            onMouseLeave={e => e.target.style.background="#0EA5E9"}
          >Done</button>
        </div>
      </div>
    </div>
  );
}

function NatureModal({ onClose, children }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => { document.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(12,35,64,0.88)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="modal-container w-full max-w-md rounded-3xl shadow-2xl animate-fadeIn relative flex flex-col"
        style={{ background: "#0D1B2E" }}
      >
        {/* decorative leaves */}
        <LeafDecor className="w-32 h-32 -top-6 -right-6 rotate-45" />
        <LeafDecor className="w-20 h-20 -bottom-4 -left-4 -rotate-12" />
        {children}
      </div>
    </div>
  );
}

function StartProjectModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setStatus("success");
      launchConfetti();
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.12)",
    border: "1.5px solid rgba(255,255,255,0.2)",
    borderRadius: "14px",
    color: "#fff",
    padding: "12px 16px",
    width: "100%",
    fontSize: "14px",
    fontWeight: 500,
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
  };

  if (status === "success") return <SuccessModal onClose={onClose} title="Details received!" subtitle="Our team will reach out to you shortly." />;

  return (
    <NatureModal onClose={onClose}>
      {/* header */}
      <div className="relative z-10 px-8 pt-8 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: N.beigeLight }}>Let's Connect</p>
            <h3 className="text-2xl font-black text-white leading-tight">Start a Project</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white opacity-50 hover:opacity-100 text-xl leading-none transition-opacity bg-transparent border-0 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* form */}
      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col flex-1 min-h-0">
        <div className="px-8 pt-5 pb-2 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0" style={{ WebkitOverflowScrolling: "touch" }}>
          {[
            { label: "Full Name", name: "name", type: "text", placeholder: "Jane Doe" },
            { label: "Email Address", name: "email", type: "email", placeholder: "jane@company.com" },
            { label: "Phone Number", name: "phone", type: "tel", placeholder: "+91 98765 43210" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: N.beigeLight }}>{label}</label>
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                style={inputStyle}
                className="nature-input"
                onFocus={(e) => { e.target.style.border = `1.5px solid ${N.beige}`; e.target.style.background = "rgba(255,255,255,0.18)"; }}
                onBlur={(e) => { e.target.style.border = "1.5px solid rgba(255,255,255,0.2)"; e.target.style.background = "rgba(255,255,255,0.12)"; }}
              />
            </div>
          ))}
          {error && <p className="text-sm font-medium" style={{ color: "#ffb3a7" }}>{error}</p>}
        </div>
        <div className="px-8 pb-4 pt-2 shrink-0">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: "#0EA5E9", color: "#FFFFFF" }}
          >
            {status === "loading" ? "Submitting…" : "Submit →"}
          </button>
        </div>
      </form>
    </NatureModal>
  );
}

function ApplyNowModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    if (!allowed.includes(selected.type)) {
      setError("Only PDF, Word (.doc/.docx), or TXT files are accepted.");
      return;
    }
    setError("");
    setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setError("Please attach your resume."); return; }
    setStatus("loading");
    setError("");
    try {
      const resumeData = await toBase64(file);
      const res = await fetch(`${API_BASE}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, resumeFileName: file.name, resumeData, resumeMimeType: file.type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setStatus("success");
      launchConfetti();
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.12)",
    border: "1.5px solid rgba(255,255,255,0.2)",
    borderRadius: "14px",
    color: "#fff",
    padding: "12px 16px",
    width: "100%",
    fontSize: "14px",
    fontWeight: 500,
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
  };

  if (status === "success") return <SuccessModal onClose={onClose} title="Application received!" subtitle="We'll review your profile and get back to you soon." />;

  return (
    <NatureModal onClose={onClose}>
      {/* header */}
      <div className="relative z-10 px-8 pt-8 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: N.beigeLight }}>Join Our Team</p>
            <h3 className="text-2xl font-black text-white leading-tight">Apply Now</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white opacity-50 hover:opacity-100 text-xl leading-none transition-opacity bg-transparent border-0 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* form */}
      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col flex-1 min-h-0">
        <div className="px-8 pt-5 pb-2 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0" style={{ WebkitOverflowScrolling: "touch" }}>
          {[
            { label: "Full Name", name: "name", type: "text", placeholder: "Jane Doe" },
            { label: "Email Address", name: "email", type: "email", placeholder: "jane@company.com" },
            { label: "Phone Number", name: "phone", type: "tel", placeholder: "+91 98765 43210" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: N.beigeLight }}>{label}</label>
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                style={inputStyle}
                className="nature-input"
                onFocus={(e) => { e.target.style.border = `1.5px solid ${N.beige}`; e.target.style.background = "rgba(255,255,255,0.18)"; }}
                onBlur={(e) => { e.target.style.border = "1.5px solid rgba(255,255,255,0.2)"; e.target.style.background = "rgba(255,255,255,0.12)"; }}
              />
            </div>
          ))}

          {/* resume upload */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: N.beigeLight }}>Resume</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="rounded-2xl p-5 text-center cursor-pointer transition-all duration-200"
              style={{
                border: `2px dashed ${file ? N.beige : "rgba(255,255,255,0.25)"}`,
                background: file ? "rgba(200,169,122,0.12)" : "rgba(255,255,255,0.06)",
              }}
            >
              {file ? (
                <div className="flex items-center justify-center gap-2">
                  <span style={{ color: N.beige }}>📄</span>
                  <p className="text-sm font-semibold text-white truncate max-w-[220px]">{file.name}</p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-white opacity-70">Click to upload resume</p>
                  <p className="text-xs mt-1 opacity-40 text-white">PDF, Word (.doc/.docx), TXT — max 10 MB</p>
                </>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFile} className="hidden" />
          </div>
          {error && <p className="text-sm font-medium" style={{ color: "#ffb3a7" }}>{error}</p>}
        </div>
        <div className="px-8 pb-4 pt-2 shrink-0">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: "#0EA5E9", color: "#FFFFFF" }}
          >
            {status === "loading" ? "Submitting…" : "Submit Application →"}
          </button>
        </div>
      </form>
    </NatureModal>
  );
}

/* ── Careers Apply Modal — Midnight / Indigo theme ───────────────────────── */
const M = {
  bg:      "#0D1B2E",
  panel:   "#13253C",
  border:  "rgba(14,165,233,0.25)",
  indigo:  "#0EA5E9",
  violet:  "#0284C7",
  muted:   "#CCCCCC",
  text:    "#E0F2FE",
};

function CareersApplyModal({ role, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFile = (e) => {
    const sel = e.target.files[0];
    if (!sel) return;
    const allowed = ["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","text/plain"];
    if (!allowed.includes(sel.type)) { setError("Only PDF, Word, or TXT files accepted."); return; }
    setError(""); setFile(sel);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setError("Please attach your resume."); return; }
    setStatus("loading"); setError("");
    try {
      const resumeData = await toBase64(file);
      const res = await fetch(`${API_BASE}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, resumeFileName: file.name, resumeData, resumeMimeType: file.type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setStatus("success");
      launchConfetti();
    } catch (err) { setError(err.message); setStatus("idle"); }
  };

  useEffect(() => {
    const k = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);

  const inputSt = {
    background: "rgba(255,255,255,0.06)", border: `1.5px solid ${M.border}`,
    borderRadius: "12px", color: M.text, padding: "11px 15px",
    width: "100%", fontSize: "14px", fontWeight: 500, outline: "none", transition: "border 0.2s, background 0.2s",
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(5,8,20,0.80)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-container w-full max-w-md rounded-2xl shadow-2xl animate-fadeIn flex flex-col" style={{ background: M.bg, border: `1px solid ${M.border}` }}>
        {/* top accent bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${M.indigo}, ${M.violet})` }} />

        {/* header */}
        <div className="px-7 pt-6 pb-5" style={{ borderBottom: `1px solid ${M.border}` }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: M.violet }}>Careers · Apply</p>
              <h3 className="text-xl font-black text-white leading-tight">{role?.title || "Apply Now"}</h3>
              {role && (
                <p className="text-xs mt-1" style={{ color: M.muted }}>{role.location} · {role.period}</p>
              )}
            </div>
            <button onClick={onClose} className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors bg-transparent border-0 cursor-pointer"
              style={{ background: "rgba(255,255,255,0.06)", color: M.muted }}
            >✕</button>
          </div>
        </div>

        {status === "success" ? (
          <SuccessModal onClose={onClose} title="Application Submitted!" subtitle="We'll review your profile and get back to you soon." />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <div className="px-7 pt-5 pb-2 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0" style={{ WebkitOverflowScrolling: "touch" }}>
              {[
                { label: "Full Name", name: "name", type: "text", placeholder: "Jane Doe" },
                { label: "Email Address", name: "email", type: "email", placeholder: "jane@company.com" },
                { label: "Phone Number", name: "phone", type: "tel", placeholder: "+91 98765 43210" },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: M.violet }}>{label}</label>
                  <input name={name} type={type} value={form[name]} onChange={handleChange} required placeholder={placeholder}
                    style={inputSt} className="nature-input"
                    onFocus={(e) => { e.target.style.border = `1.5px solid ${M.indigo}`; e.target.style.background = "rgba(14,165,233,0.12)"; }}
                    onBlur={(e) => { e.target.style.border = `1.5px solid ${M.border}`; e.target.style.background = "rgba(255,255,255,0.06)"; }}
                  />
                </div>
              ))}

              <div>
                <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: M.violet }}>Resume</label>
                <div onClick={() => fileInputRef.current?.click()} className="rounded-xl p-5 text-center cursor-pointer transition-all duration-200"
                  style={{ border: `2px dashed ${file ? M.indigo : M.border}`, background: file ? `${M.indigo}12` : "rgba(255,255,255,0.03)" }}
                >
                  {file ? (
                    <div className="flex items-center justify-center gap-2">
                      <span style={{ color: M.violet }}>📄</span>
                      <p className="text-sm font-semibold text-white truncate max-w-[220px]">{file.name}</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-medium" style={{ color: M.muted }}>Click to upload resume</p>
                      <p className="text-xs mt-1" style={{ color: `${M.muted}99` }}>PDF, Word (.doc/.docx), TXT — max 10 MB</p>
                    </>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFile} className="hidden" />
              </div>
              {error && <p className="text-sm font-medium" style={{ color: "#f87171" }}>{error}</p>}
            </div>
            <div className="px-7 pb-4 pt-2 shrink-0">
              <button type="submit" disabled={status === "loading"} className="w-full font-bold text-sm px-8 py-3.5 rounded-full cursor-pointer disabled:opacity-50 transition-all"
                style={{ background: `linear-gradient(135deg, ${M.indigo}, ${M.violet})`, color: "#fff" }}
              >
                {status === "loading" ? "Submitting…" : "Submit Application →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── Chatbot Widget ───────────────────────────────────────────────────────── */
function ChatBot() {
  const WELCOME = { text: "👋 Welcome to 11x Square! I'm your virtual assistant. Ask me about our services, careers, or how to get in touch!", from: "bot", time: new Date().toISOString() };
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((prev) => [...prev, { text, from: "user", time: new Date().toISOString() }]);
    setInput("");
    setIsTyping(true);
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.text, from: "bot", time: data.time }]);
    } catch {
      setMessages((prev) => [...prev, { text: "⚠️ Couldn't reach the server. Please try again.", from: "bot", time: new Date().toISOString() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const C = { bg: "#0D1B2E", header: "#102040", accent: "#0EA5E9", moss: "#BAE6FD", text: "#FFFFFF", muted: "#AAAAAA" };

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="rounded-2xl overflow-hidden shadow-2xl animate-fadeIn flex flex-col"
          style={{ width: 340, height: 480, background: C.bg, border: "1px solid rgba(14,165,233,0.2)" }}
        >
          {/* header */}
          <div className="px-5 py-4 flex items-center justify-between shrink-0" style={{ background: C.header, borderBottom: "1px solid rgba(14,165,233,0.2)" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#0EA5E9" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.02 2 11c0 2.4.96 4.6 2.54 6.24L3 21l4.1-1.3A10.1 10.1 0 0012 20c5.52 0 10-4.02 10-9S17.52 2 12 2Z" fill="#0EA5E9" stroke="#0EA5E9" strokeWidth="1.5"/>
                  <circle cx="8.5" cy="11" r="1.1" fill="#0EA5E9"/><circle cx="12" cy="11" r="1.1" fill="#0EA5E9"/><circle cx="15.5" cy="11" r="1.1" fill="#0EA5E9"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold leading-tight text-white">11x Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                  <span className="text-xs" style={{ color: C.moss }}>Always online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-lg text-sm bg-transparent border-0 cursor-pointer"
              style={{ background: "rgba(255,255,255,0.06)", color: C.moss }}
            >✕</button>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "bot" && (
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs mr-2 shrink-0 mt-0.5" style={{ background: "#0EA5E9", color: "#fff", fontWeight: 700, fontSize: 10 }}>11x</div>
                )}
                <div className="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
                  style={msg.from === "user"
                    ? { background: "linear-gradient(135deg,#0EA5E9,#0284C7)", color: "#fff", borderBottomRightRadius: 4 }
                    : { background: "rgba(14,165,233,0.12)", color: C.text, borderBottomLeftRadius: 4, border: "1px solid rgba(14,165,233,0.2)" }
                  }
                >{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0" style={{ background: "#0EA5E9", color: "#fff", fontWeight: 700, fontSize: 10 }}>11x</div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1" style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.2)" }}>
                  {[0,1,2].map((j) => <span key={j} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: C.moss, animationDelay: `${j*0.15}s` }} />)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* input */}
          <div className="px-4 py-3 shrink-0 flex gap-2" style={{ borderTop: "1px solid rgba(14,165,233,0.12)" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Type a message…"
              className="nature-input flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{ background: "rgba(14,165,233,0.08)", border: "1.5px solid rgba(14,165,233,0.25)", color: C.text, fontWeight: 500 }}
            />
            <button onClick={sendMessage} disabled={!input.trim()} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 border-0 shrink-0"
              style={{ background: "linear-gradient(135deg,#0EA5E9,#0284C7)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h12M9 3l5 5-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* toggle button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center border-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-green-900/40"
        style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)", border: "1px solid rgba(14,165,233,0.4)" }}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="#0EA5E9" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.02 2 11c0 2.4.96 4.6 2.54 6.24L3 21l4.1-1.3A10.1 10.1 0 0012 20c5.52 0 10-4.02 10-9S17.52 2 12 2Z" fill="#0EA5E9" stroke="#0EA5E9" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="8.5" cy="11" r="1.2" fill="#0EA5E9"/>
            <circle cx="12" cy="11" r="1.2" fill="#0EA5E9"/>
            <circle cx="15.5" cy="11" r="1.2" fill="#0EA5E9"/>
          </svg>
        )}
      </button>
    </div>
  );
}

function WolfSection({ src, heading, sub }) {
  return (
    <section className="relative overflow-hidden flex items-center justify-center" style={{ height: "100vh" }}>
      <video
        src={src} autoPlay muted playsInline loop
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.88 }}
      />
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h2
          className="font-black tracking-tighter leading-none mb-6 text-white"
          style={{ fontSize: "clamp(3rem,8vw,6rem)", textShadow: "0 2px 24px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,1)", fontFamily: "'Cinzel', serif", textTransform: "uppercase", letterSpacing: "0.04em" }}
        >
          {heading}
        </h2>
        <p className="text-lg font-medium max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 8px rgba(0,0,0,0.95)" }}>
          {sub}
        </p>
      </div>
    </section>
  );
}

function BusinessHours() {
  const [status, setStatus] = useState({ available: false, timeStr: "" });
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600000);
      const day = ist.getDay();
      const hour = ist.getHours();
      const timeStr = ist.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
      setStatus({ available: day >= 1 && day <= 5 && hour >= 9 && hour < 19, timeStr });
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hidden lg:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full"
      style={{ background: status.available ? "rgba(14,165,233,0.10)" : "rgba(255,255,255,0.05)", border: `1px solid ${status.available ? "rgba(14,165,233,0.30)" : "rgba(255,255,255,0.10)"}` }}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status.available ? "bg-emerald-400 animate-pulse" : "bg-gray-500"}`} />
      <span style={{ color: status.available ? "#888888" : "#6B7280" }}>
        {status.available ? "Team available" : "Offline"} · {status.timeStr} IST
      </span>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [careersApplyRole, setCareersApplyRole] = useState(null);
  const statsRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > lastScrollY.current && y > 80) {
        setNavHidden(true);   // scrolling down → hide
      } else {
        setNavHidden(false);  // scrolling up → show
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const navigateTo = (v) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: "#080B12", color: "#F0F7FF" }}>
      <MouseSpotlight />
      
      {/* Floating Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse" style={{ background: "rgba(14,165,233,0.12)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse" style={{ background: "rgba(2,132,199,0.10)", animationDelay: "2s" }} />
        <div className="absolute top-[50%] left-[60%] w-[25%] h-[25%] rounded-full blur-[100px] animate-pulse" style={{ background: "rgba(14,165,233,0.08)", animationDelay: "4s" }} />
      </div>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 py-3"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: scrolled ? "rgba(8,11,18,0.98)" : "rgba(8,11,18,0.70)",
          boxShadow: scrolled ? "0 1px 24px rgba(14,165,233,0.15)" : "none",
          transform: navHidden ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s, box-shadow 0.3s",
        }}
      >
        <Logo onClick={() => navigateTo("Home")} dark={false} />

        <ul className="hidden md:flex gap-9 list-none">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                onClick={() => navigateTo(l)}
                className="text-[14px] font-bold tracking-tight transition-all duration-200 bg-transparent border-0 cursor-pointer"
                style={{ color: view === l ? "#0EA5E9" : "#94A3B8" }}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>


        <button
          onClick={() => navigateTo("Contact")}
          className="hidden md:block text-[14px] font-bold px-6 py-2.5 rounded-full transition-all duration-200"
          style={{ background: "#0EA5E9", color: "#FFFFFF" }}
          onMouseEnter={e => { e.target.style.background = "#0369A1"; }}
          onMouseLeave={e => { e.target.style.background = "#0EA5E9"; }}
        >
          Get Started
        </button>

        <button
          className="md:hidden bg-transparent border-0 cursor-pointer text-2xl"
          style={{ color: "#0EA5E9" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 backdrop-blur-xl flex flex-col items-center justify-center gap-8" style={{ background: "rgba(8,11,18,0.98)" }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => navigateTo(l)}
              className="text-2xl font-bold transition-colors duration-200 bg-transparent border-0 cursor-pointer"
              style={{ color: "#94A3B8" }}
              onMouseEnter={e => e.target.style.color="#0EA5E9"}
              onMouseLeave={e => e.target.style.color="#94A3B8"}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      <main key={view} className="page-transition">
      {view === "Home" && (
        <>
        <section id="home" className="relative flex flex-col justify-center px-5 md:px-12 pt-20 pb-10 md:pt-28 md:pb-12 overflow-hidden z-10" style={{ height: "100svh" }}>
        {/* Wolf howling video background */}
        <video
          src="/wolf_howling_in_moon_202606211229.mp4"
          autoPlay muted playsInline loop
          style={{ position: "absolute", top: "50%", left: "50%", minWidth: "100%", minHeight: "100%", width: "auto", height: "auto", transform: "translate(-50%,-50%)", objectFit: "cover", objectPosition: "center 30%", opacity: 0.75 }}
        />
        {/* Dark overlay — stronger at edges for text legibility */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,11,18,0.60) 0%, rgba(13,24,38,0.30) 40%, rgba(8,11,18,0.65) 100%)" }} />
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">

          {/* Left: text content */}
          <div className="flex-1 min-w-0">
            <p className="mono text-[11px] font-bold uppercase tracking-[0.15em] mb-7 flex items-center gap-3 fade-up d1" style={{ color: "#0369A1" }}>
              <span className="block w-12 h-[2px]" style={{ background: "#0EA5E9" }} />
              Consulting · Talent · Technology
            </p>

            <h1 className="text-[clamp(2rem,7vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em] mb-6 md:mb-10 fade-up d2" style={{ color: "#FFFFFF" }}>
              Scale your
              <br />
              <span className="text-stroke cursor-default inline-block" style={{ WebkitTextStroke: "2px #0EA5E9" }}>
                <TypingText words={["ambition", "vision", "growth", "impact"]} />
              </span>
              <br />
              with <span className="gradient-text">11x Square</span>
            </h1>

            <p className="text-[clamp(1rem,1.6vw,1.2rem)] font-medium leading-[1.6] max-w-xl mb-10 fade-up d3" style={{ color: "#94A3B8" }}>
              Bridging the gap between elite engineering and strategic growth with a platform-first approach.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center fade-up d4">
              <MagneticButton
                onClick={() => navigateTo("Services")}
                className="font-bold text-[15px] px-9 py-4 rounded-full shadow-xl transition-all duration-200 text-center"
                style={{ background: "linear-gradient(135deg,#0EA5E9,#0284C7)", color: "#FFFFFF" }}
              >
                Start Building
              </MagneticButton>
              <MagneticButton
                onClick={() => navigateTo("Careers")}
                className="font-bold text-[15px] px-9 py-4 rounded-full shadow-sm transition-all duration-200 text-center"
                style={{ background: "transparent", border: "1.5px solid rgba(14,165,233,0.6)", color: "#0EA5E9" }}
              >
                Explore Roles
              </MagneticButton>
            </div>

            <div ref={statsRef} className="mt-8 md:mt-10 pt-7 md:pt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-10 fade-up d5" style={{ borderTop: "1px solid rgba(14,165,233,0.15)" }}>
              {STATS.map((s) => (
                <StatCard key={s.label} {...s} animate={statsVisible} />
              ))}
            </div>
          </div>

          {/* Right: large logo — hidden on mobile */}
          <div className="hidden lg:flex flex-shrink-0 items-center justify-center fade-up d3">
            <div className="relative">
              {/* outer glow ring */}
              <div className="absolute -inset-4 rounded-[2.5rem] blur-2xl opacity-40" style={{ background: "linear-gradient(135deg,#BAE6FD,#0EA5E9)" }} />
              <img
                src={logo}
                alt="11x Square"
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] object-cover rounded-[2rem] shadow-2xl"
                style={{ border: "4px solid rgba(14,165,233,0.35)" }}
              />
              {/* label badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full shadow-lg whitespace-nowrap"
                style={{ background: "#0EA5E9", color: "#FFFFFF" }}>
                <span className="font-black text-sm tracking-tight">11x Square</span>
                <span className="font-medium text-xs ml-2 opacity-80">Consulting · Talent</span>
              </div>
            </div>
          </div>

        </div>
        </section>

        {/* MARQUEE - Now part of Home View only */}
        <div className="py-4 overflow-hidden z-20 relative" style={{ background: "#0D1117", borderTop: "1px solid rgba(14,165,233,0.2)", borderBottom: "1px solid rgba(14,165,233,0.2)" }}>
          <div className="marquee-track flex gap-14 w-max">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="mono text-[12px] font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-4" style={{ color: "#0EA5E9" }}>
                {item}
                <span className="text-[10px]" style={{ color: "#0284C7" }}>✦</span>
              </span>
            ))}
          </div>
        </div>
        </>
      )}

      {view === "Services" && (
        <section id="services" className="px-5 md:px-12 py-14 md:py-20" style={{ background: "#080B12" }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 fade-up d1">
          <div className="fade-up d2">
            <p className="mono text-[11px] uppercase tracking-[0.18em] mb-4 fade-up d3" style={{ color: "#888888" }}>// Our Solutions</p>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter leading-[0.9] fade-up d4" style={{ color: "#FFFFFF" }}>
              Consulting for the<br />bold & ambitious
            </h2>
          </div>
          <p className="text-lg md:text-xl font-medium leading-relaxed max-w-md fade-up d5" style={{ color: "#94A3B8" }}>
            Platform-driven consulting that solves deep engineering and product problems in record time.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 fade-up d6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} {...s} delay={0.1 * i} />
          ))}
        </div>
        </section>
      )}

      {view === "Careers" && (
        <section id="careers" className="relative px-5 md:px-12 py-14 md:py-20 overflow-hidden" style={{ height: "100svh" }}>
          {/* Group of wolves video background */}
          <video
            src="/Group_of_wolves_on_path_202606211412.mp4"
            autoPlay muted playsInline loop
            style={{ position: "absolute", top: "50%", left: "50%", minWidth: "100%", minHeight: "100%", width: "auto", height: "auto", transform: "translate(-50%,-50%)", objectFit: "cover", objectPosition: "center center", opacity: 0.75 }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,11,18,0.65) 0%, rgba(8,11,18,0.35) 50%, rgba(8,11,18,0.70) 100%)" }} />

        <div className="relative z-10 h-full overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start" style={{ maxHeight: "calc(100svh - 8rem)" }}>
          <div className="fade-up d1">
            <p className="mono text-[11px] uppercase tracking-[0.18em] mb-4 fade-up d2" style={{ color: "#888888" }}>// Careers</p>
            <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tighter leading-[1] mb-6 fade-up d3" style={{ color: "#FFFFFF" }}>
              Find your next<br />challenge at <span style={{ color: "#0EA5E9" }}>11x</span>
            </h2>
            <p className="text-lg font-medium leading-relaxed mb-10 max-w-md fade-up d4" style={{ color: "#94A3B8" }}>
              Whether you're a seasoned consultant or a fresh grad ready to make your mark — we have a seat for you.
            </p>

            <div className="p-7 rounded-xl shadow-sm fade-up d5" style={{ background: "rgba(17,24,39,0.80)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(14,165,233,0.25)" }}>
              <p className="mono text-[10px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#0EA5E9" }}>Intern Program Highlights</p>
              <ul className="flex flex-col gap-3">
                {[
                  "3-month structured cohort program",
                  "Real client projects from day one",
                  "Mentorship from senior consultants",
                  "Full-time conversion for top performers",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-medium" style={{ color: "#888888" }}>
                    <span className="flex-shrink-0 text-xl" style={{ color: "#0284C7" }}>→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col fade-up d6 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(14,165,233,0.20)" }}>
            {ROLES.map((r, i) => (
              <RoleItem
                key={r.title} {...r} delay={0.1 * i}
                onApply={() => setCareersApplyRole(r)}
              />
            ))}
          </div>
        </div>
        </section>
      )}

      {view === "Process" && (
        <section id="process" className="relative flex flex-col justify-center px-5 md:px-12 py-20 md:py-28 overflow-hidden" style={{ minHeight: "100svh" }}>
          {/* Fire wolf video background */}
          <video
            src="/Wolf_mouth_fire_video_202606211302.mp4"
            autoPlay muted playsInline loop
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center center", opacity: 0.80 }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,11,18,0.65) 0%, rgba(8,11,18,0.30) 50%, rgba(8,11,18,0.70) 100%)" }} />

          <div className="relative z-10">
            <p className="mono text-[11px] uppercase tracking-[0.18em] mb-3 fade-up d1" style={{ color: "#94A3B8" }}>// The Process</p>
            <h2 className="text-[clamp(1.5rem,5vw,4rem)] font-black tracking-tighter leading-[1.05] mb-6 md:mb-14 max-w-xl fade-up d2"
              style={{ color: "#FFFFFF", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,1)" }}>
              From discovery<br />to results in weeks
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden fade-up d3" style={{ border: "1px solid rgba(14,165,233,0.25)" }}>
              {STEPS.map((s, i) => (
                <div
                  key={s.num}
                  style={{
                    animationDelay: `${0.1 * i}s`,
                    background: "rgba(8,11,18,0.82)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderRight: i < STEPS.length - 1 ? "1px solid rgba(14,165,233,0.2)" : undefined,
                    borderBottom: "1px solid rgba(14,165,233,0.15)",
                  }}
                  className="p-5 sm:p-6 lg:p-8 relative group transition-all duration-500"
                  onMouseEnter={e => e.currentTarget.style.background="rgba(30,41,59,0.88)"}
                  onMouseLeave={e => e.currentTarget.style.background="rgba(8,11,18,0.82)"}
                >
                  <div className="text-[40px] sm:text-[56px] lg:text-[72px] font-black leading-none mb-3 tracking-tighter" style={{ color: "rgba(14,165,233,0.30)" }}>
                    {s.num}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold mb-2" style={{ color: "#FFFFFF" }}>{s.title}</h4>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#CBD5E1" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {view === "Contact" && (
        <section id="contact" className="px-5 md:px-12 py-16 md:py-24 fade-up d1 relative overflow-hidden" style={{ background: "#080B12" }}>
          {/* decorative leaves */}
          <div className="absolute -top-10 -right-10 w-64 h-64 opacity-10 leaf-sway" style={{ transformOrigin: "bottom center" }}>
            <svg viewBox="0 0 200 200" fill="none"><path d="M100 10 C30 10 10 80 40 140 C70 200 160 180 170 120 C180 60 170 10 100 10Z" fill="white"/><path d="M100 10 L100 160" stroke="white" strokeWidth="2"/></svg>
          </div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 opacity-10" style={{ transform: "rotate(45deg)" }}>
            <svg viewBox="0 0 200 200" fill="none"><path d="M100 10 C30 10 10 80 40 140 C70 200 160 180 170 120 C180 60 170 10 100 10Z" fill="white"/></svg>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16 fade-up d2 relative z-10">
          <div className="fade-up d3">
            <p className="mono text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "#0EA5E9" }}>// Get In Touch</p>
            <h2 className="text-[clamp(1.6rem,4vw,3rem)] font-black tracking-tight leading-[1.1] max-w-xl fade-up d4" style={{ color: "#FFFFFF" }}>
              Accelerate your team's potential today.
            </h2>
            <p className="text-[18px] font-medium mt-4 max-w-md fade-up d5" style={{ color: "#94A3B8" }}>
              Connect with our leadership to explore high-impact consulting or talent solutions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 fade-up d6">
            <button
              onClick={() => setActiveModal("project")}
              className="font-bold text-lg px-12 py-5 rounded-xl transition-all duration-200 cursor-pointer"
              style={{ background: "#0EA5E9", color: "#FFFFFF" }}
              onMouseEnter={e => e.target.style.background="#0369A1"}
              onMouseLeave={e => e.target.style.background="#0EA5E9"}
            >
              Start a Project
            </button>
            <button
              onClick={() => setActiveModal("apply")}
              className="font-bold text-lg px-12 py-5 rounded-xl transition-all duration-200 cursor-pointer"
              style={{ background: "transparent", color: "#0284C7", border: "2px solid rgba(14,165,233,0.5)" }}
              onMouseEnter={e => { e.target.style.background="rgba(14,165,233,0.08)"; }}
              onMouseLeave={e => { e.target.style.background="transparent"; }}
            >
              Apply Now
            </button>
          </div>
        </div>
        </section>
      )}
      </main>

      {/* MODALS */}
      {activeModal === "project" && <StartProjectModal onClose={() => setActiveModal(null)} />}
      {activeModal === "apply" && <ApplyNowModal onClose={() => setActiveModal(null)} />}
      {careersApplyRole && <CareersApplyModal role={careersApplyRole} onClose={() => setCareersApplyRole(null)} />}

      {/* CHATBOT */}
      <ChatBot />

      {/* FOOTER */}
      <footer className="px-5 md:px-12 pt-10 pb-8 md:pt-14 md:pb-10 fade-up d1" style={{ background: "#0D1117", borderTop: "1px solid rgba(14,165,233,0.2)" }}>
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16 mb-8 md:mb-10 fade-up d2">
          <div className="max-w-xs fade-up d3">
            <Logo onClick={() => navigateTo("Home")} className="mb-4" size="footer" dark={false} />
            <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
              Bridging elite consulting with the next generation of tech talent.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 sm:gap-16 fade-up d4">
            {[
              { heading: "Company", links: [
                  { label: "About",    dest: "Home" },
                  { label: "Services", dest: "Services" },
                  { label: "Process",  dest: "Process" },
                  { label: "Blog",     dest: "Home" },
              ]},
              { heading: "Careers", links: [
                  { label: "Internships", dest: "Careers" },
                  { label: "Full-time",   dest: "Careers" },
                  { label: "Freelance",   dest: "Careers" },
              ]},
              { heading: "Contact", links: [
                  { label: "11xsquarebusiness@gmail.com", dest: "Contact" },
                  { label: "United Kingdom",       dest: "Contact" },
                  { label: "LinkedIn",             dest: "Contact" },
                  { label: "Twitter",              dest: "Contact" },
              ]},
            ].map((col) => (
              <div key={col.heading}>
                <h5 className="mono text-[10px] font-bold uppercase tracking-[0.18em] mb-5" style={{ color: "#0EA5E9" }}>{col.heading}</h5>
                <ul className="flex flex-col gap-1.5 list-none">
                  {col.links.map(({ label, dest }) => (
                    <li key={label}>
                      <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(dest); }}
                        className="text-sm transition-colors duration-200 no-underline" style={{ color: "#94A3B8" }}
                        onMouseEnter={e => e.target.style.color="#0EA5E9"}
                        onMouseLeave={e => e.target.style.color="#94A3B8"}
                      >{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(14,165,233,0.2)" }}>
          <p className="mono text-[11px]" style={{ color: "#94A3B8" }}>
            © 2025 <span style={{ color: "#0EA5E9" }}>11x Square</span>. All rights reserved.
          </p>
          <p className="mono text-[11px]" style={{ color: "#94A3B8" }}>✦ Built for the bold.</p>
        </div>
      </footer>
    </div>
  );
}
