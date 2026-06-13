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
    image: "https://picsum.photos/seed/tech/400/300",
  },
  {
    num: "02",
    icon: "📊",
    title: "Product & Strategy",
    desc: "Market positioning, product-market fit analysis, and go-to-market strategies that build lasting competitive advantage.",
    tags: ["GTM", "Research", "OKRs"],
    color: "orange", 
    image: "https://picsum.photos/seed/product/400/300",
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
  { num: "01", title: "Discovery", desc: "We audit your stack, team, and goals to understand what's holding you back and what's possible.", color: "text-[#0284C7]" },
  { num: "02", title: "Strategy", desc: "A clear, actionable roadmap with milestones, owners, and measurable success criteria.", color: "text-[#38BDF8]" },
  { num: "03", title: "Execution", desc: "Embedded consultants and curated talent work alongside your team to ship results.", color: "text-[#38BDF8]" },
  { num: "04", title: "Scale", desc: "We hand off with documentation, playbooks, and a team ready to multiply the wins.", color: "text-[#5C3D2E]" },
];

const STATS = [
  { val: "120", unit: "+", label: "Projects Delivered", color: "text-[#0284C7]" },
  { val: "48",  unit: "+", label: "Interns Placed",     color: "text-[#334155]" },
  { val: "11",  unit: "x", label: "Average ROI",        color: "text-[#0C2340]" },
  { val: "32",  unit: "+", label: "Partner Companies",  color: "text-[#E0F2FE]" },
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
  return <div className="fixed top-0 left-0 h-1 z-[60] transition-all duration-100" style={{ width: `${width}%`, background: "linear-gradient(90deg,#0284C7,#0284C7)" }} />;
}

function MouseSpotlight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] opacity-50" style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(2,132,199,0.07), transparent 80%)` }} />
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
      <div className="text-xs uppercase tracking-wide font-medium" style={{ color: "#334155" }}>{label}</div>
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
    indigo:  { bar: "bg-[#0284C7]", tag: "rgba(2,132,199,0.18)",  tagText: "#BAE6FD" },
    orange:  { bar: "bg-[#EA580C]", tag: "rgba(234,88,12,0.18)",  tagText: "#FED7AA" },
    purple:  { bar: "bg-[#9333EA]", tag: "rgba(147,51,234,0.18)", tagText: "#E9D5FF" },
    pink:    { bar: "bg-[#DB2777]", tag: "rgba(219,39,119,0.18)", tagText: "#FBCFE8" },
    emerald: { bar: "bg-[#0F766E]", tag: "rgba(15,118,110,0.18)", tagText: "#99F6E4" },
    amber:   { bar: "bg-[#B45309]", tag: "rgba(180,83,9,0.18)",   tagText: "#FDE68A" },
  };
  const theme = THEMES[color] || { bar: "bg-[#0284C7]", tag: "rgba(2,132,199,0.18)", tagText: "#BAE6FD" };

  const isResting = rotation.x === 0 && rotation.y === 0;

  return (
    <div
      className="group fade-up"
      style={{ animationDelay: `${delay}s`, perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={e => { e.currentTarget.style.background = "#DBEAFE"; }}
        onMouseLeave={e => { handleMouseLeave(); e.currentTarget.style.background = "#FFFFFF"; }}
        className="relative p-8 cursor-default overflow-hidden hover:z-10"
        style={{
          transform: `translateY(${isResting ? 0 : -8}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isResting ? "transform 0.6s ease-out" : "none",
          transformStyle: "preserve-3d",
          background: "#FFFFFF",
          borderBottom: "1px solid rgba(2,132,199,0.2)",
          borderRight: "1px solid rgba(2,132,199,0.2)",
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
        <div className="font-mono text-[11px] tracking-wider mb-4 translate-z-10" style={{ color: "#0369A1" }}>{num}</div>
        <h3 className="text-2xl font-black mb-4 tracking-tighter leading-none group-hover:translate-z-30 transition-transform duration-500" style={{ color: "#0C2340" }}>{title}</h3>
        <p className="text-[15px] font-medium leading-relaxed max-w-[280px] group-hover:translate-z-20 transition-transform duration-500" style={{ color: "#334155" }}>{desc}</p>
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
      className="flex items-center justify-between px-8 py-5 transition-all duration-300 cursor-pointer group"
      style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(2,132,199,0.2)" }}
      onMouseEnter={e => e.currentTarget.style.background="#DBEAFE"}
      onMouseLeave={e => e.currentTarget.style.background="#FFFFFF"}
    >
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-bold" style={{ color: "#0C2340" }}>{title}</span>
        <div className="flex gap-4 font-mono text-[11px]" style={{ color: "#0369A1" }}>
          <span>{location}</span>
          <span>{period}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-[10px] px-2.5 py-1 rounded-sm uppercase tracking-normal"
          style={type === "intern"
            ? { background: "rgba(2,132,199,0.12)", color: "#0284C7", border: "1px solid rgba(2,132,199,0.3)" }
            : { background: "rgba(251,113,133,0.08)", color: "#38BDF8", border: "1px solid rgba(251,113,133,0.25)" }
          }
        >
          {type === "intern" ? "Intern" : "Full-time"}
        </span>
        <span className="text-2xl transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: "#0284C7" }}>
          ↗
        </span>
      </div>
    </div>
  );
}

function Logo({ onClick, className = "", size = "nav" }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 cursor-pointer transition-all duration-300 hover:opacity-80 active:scale-95 ${className}`}
    >
      <img
        src={logo}
        alt="11x Logo Icon"
        className={size === "footer" ? "h-14 w-auto rounded-xl" : "h-8 w-auto rounded-lg hidden sm:block"}
        style={{ mixBlendMode: "multiply" }}
      />
      <span className={`font-black tracking-tighter ${size === "footer" ? "text-3xl" : "text-xl"}`} style={{ color: "#0C2340" }}>
        11x<span style={{ color: "#0284C7" }}>Square</span>
      </span>
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
  const colors = ["#0284C7", "#0284C7", "#334155", "#0C2340", "#38BDF8", "#E0F2FE"];
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
  green:      "#0284C7",
  greenLight: "#38BDF8",
  greenMid:   "#0369A1",
  brown:      "#334155",
  brownLight: "#94A3B8",
  beige:      "#0284C7",
  beigeLight: "#E0F2FE",
  cream:      "#0C2340",
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
        style={{ background: "#0C2340", border: "1px solid rgba(56,189,248,0.2)" }}
      >
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg,transparent,#38BDF8,transparent)" }} />
        <div className="flex flex-col items-center gap-6 px-8 py-12 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(56,189,248,0.12)", border: "1.5px solid rgba(56,189,248,0.3)" }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="14" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.5"/>
              <path d="M8 15.5l5 5 9-10" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-xl font-black text-white mb-2 tracking-tight">{title}</p>
            <p className="text-sm leading-relaxed" style={{ color: "#7ABFDC" }}>{subtitle}</p>
          </div>
          <button onClick={onClose}
            className="font-bold text-sm px-10 py-3 rounded-full cursor-pointer transition-all duration-200 border-0"
            style={{ background: "#0284C7", color: "#fff" }}
            onMouseEnter={e => e.target.style.background="#38BDF8"}
            onMouseLeave={e => e.target.style.background="#0284C7"}
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
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(12,35,64,0.88)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-fadeIn relative"
        style={{ background: "#0C2340" }}
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
      <form onSubmit={handleSubmit} className="relative z-10 px-8 py-6 flex flex-col gap-4">
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

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: N.beige, color: N.green }}
        >
          {status === "loading" ? "Submitting…" : "Submit →"}
        </button>
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
      <form onSubmit={handleSubmit} className="relative z-10 px-8 py-6 flex flex-col gap-4">
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

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: N.beige, color: N.green }}
        >
          {status === "loading" ? "Submitting…" : "Submit Application →"}
        </button>
      </form>
    </NatureModal>
  );
}

/* ── Careers Apply Modal — Midnight / Indigo theme ───────────────────────── */
const M = {
  bg:      "#0C2340",
  panel:   "#0E2A4A",
  border:  "rgba(56,189,248,0.2)",
  indigo:  "#0284C7",
  violet:  "#38BDF8",
  muted:   "#7ABFDC",
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
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-fadeIn" style={{ background: M.bg, border: `1px solid ${M.border}` }}>
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
          <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "Jane Doe" },
              { label: "Email Address", name: "email", type: "email", placeholder: "jane@company.com" },
              { label: "Phone Number", name: "phone", type: "tel", placeholder: "+91 98765 43210" },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: M.violet }}>{label}</label>
                <input name={name} type={type} value={form[name]} onChange={handleChange} required placeholder={placeholder}
                  style={inputSt} className="nature-input"
                  onFocus={(e) => { e.target.style.border = `1.5px solid ${M.indigo}`; e.target.style.background = "rgba(2,132,199,0.12)"; }}
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

            <button type="submit" disabled={status === "loading"} className="mt-1 font-bold text-sm px-8 py-3.5 rounded-full cursor-pointer disabled:opacity-50 transition-all"
              style={{ background: `linear-gradient(135deg, ${M.indigo}, ${M.violet})`, color: "#fff" }}
            >
              {status === "loading" ? "Submitting…" : "Submit Application →"}
            </button>
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

  const C = { bg: "#F0F9FF", header: "#0284C7", accent: "#0284C7", moss: "#BAE6FD", text: "#0C2340", muted: "#7ABFDC" };

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="rounded-2xl overflow-hidden shadow-2xl animate-fadeIn flex flex-col"
          style={{ width: 340, height: 480, background: C.bg, border: "1px solid rgba(2,132,199,0.2)" }}
        >
          {/* header */}
          <div className="px-5 py-4 flex items-center justify-between shrink-0" style={{ background: C.header, borderBottom: "1px solid rgba(56,189,248,0.2)" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#0284C7" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.02 2 11c0 2.4.96 4.6 2.54 6.24L3 21l4.1-1.3A10.1 10.1 0 0012 20c5.52 0 10-4.02 10-9S17.52 2 12 2Z" fill="#0284C7" stroke="#0284C7" strokeWidth="1.5"/>
                  <circle cx="8.5" cy="11" r="1.1" fill="#0284C7"/><circle cx="12" cy="11" r="1.1" fill="#0284C7"/><circle cx="15.5" cy="11" r="1.1" fill="#0284C7"/>
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
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs mr-2 shrink-0 mt-0.5" style={{ background: "#0284C7", color: "#fff", fontWeight: 700, fontSize: 10 }}>11x</div>
                )}
                <div className="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
                  style={msg.from === "user"
                    ? { background: "linear-gradient(135deg,#0284C7,#38BDF8)", color: "#fff", borderBottomRightRadius: 4 }
                    : { background: "#fff", color: C.text, borderBottomLeftRadius: 4, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }
                  }
                >{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0" style={{ background: "#0284C7", color: "#fff", fontWeight: 700, fontSize: 10 }}>11x</div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                  {[0,1,2].map((j) => <span key={j} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: C.moss, animationDelay: `${j*0.15}s` }} />)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* input */}
          <div className="px-4 py-3 shrink-0 flex gap-2" style={{ borderTop: "1px solid rgba(2,132,199,0.12)" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Type a message…"
              className="nature-input flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{ background: "#fff", border: "1.5px solid rgba(2,132,199,0.25)", color: C.text, fontWeight: 500 }}
            />
            <button onClick={sendMessage} disabled={!input.trim()} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 border-0 shrink-0"
              style={{ background: "linear-gradient(135deg,#0284C7,#38BDF8)" }}
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
        style={{ background: "linear-gradient(135deg, #FFFFFF, #0284C7)", border: "1px solid rgba(2,132,199,0.3)" }}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.02 2 11c0 2.4.96 4.6 2.54 6.24L3 21l4.1-1.3A10.1 10.1 0 0012 20c5.52 0 10-4.02 10-9S17.52 2 12 2Z" fill="#0284C7" stroke="#0284C7" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="8.5" cy="11" r="1.2" fill="#0284C7"/>
            <circle cx="12" cy="11" r="1.2" fill="#0284C7"/>
            <circle cx="15.5" cy="11" r="1.2" fill="#0284C7"/>
          </svg>
        )}
      </button>
    </div>
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
      style={{ background: status.available ? "rgba(2,132,199,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${status.available ? "rgba(2,132,199,0.35)" : "rgba(255,255,255,0.08)"}` }}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status.available ? "bg-emerald-400 animate-pulse" : "bg-gray-500"}`} />
      <span style={{ color: status.available ? "#334155" : "#6B7280" }}>
        {status.available ? "Team available" : "Offline"} · {status.timeStr} IST
      </span>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [careersApplyRole, setCareersApplyRole] = useState(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
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
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: "#FFFFFF", color: "#0C2340" }}>
      <ScrollProgress />
      <MouseSpotlight />
      
      {/* Floating Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse" style={{ background: "rgba(2,132,199,0.12)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse" style={{ background: "rgba(3,105,161,0.10)", animationDelay: "2s" }} />
        <div className="absolute top-[50%] left-[60%] w-[25%] h-[25%] rounded-full blur-[100px] animate-pulse" style={{ background: "rgba(2,132,199,0.08)", animationDelay: "4s" }} />
      </div>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-3 transition-all duration-300 mx-auto max-w-[1440px]"
        style={{
          backdropFilter: "blur(16px)",
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
          borderBottom: "1px solid rgba(2,132,199,0.25)",
          borderLeft: "1px solid rgba(2,132,199,0.1)",
          borderRight: "1px solid rgba(2,132,199,0.1)",
        }}
      >
        <Logo onClick={() => navigateTo("Home")} dark={true} />

        <ul className="hidden md:flex gap-9 list-none">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                onClick={() => navigateTo(l)}
                className="text-[14px] font-bold tracking-tight transition-all duration-200 bg-transparent border-0 cursor-pointer"
                style={{ color: view === l ? "#0284C7" : "#334155" }}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        <BusinessHours />

        <button
          onClick={() => navigateTo("Contact")}
          className="hidden md:block text-[14px] font-bold px-6 py-2.5 rounded-full transition-all duration-200"
          style={{ background: "#0284C7", color: "#FFFFFF" }}
          onMouseEnter={e => { e.target.style.background = "#BAE6FD"; }}
          onMouseLeave={e => { e.target.style.background = "#0284C7"; }}
        >
          Get Started
        </button>

        <button
          className="md:hidden bg-transparent border-0 cursor-pointer text-2xl"
          style={{ color: "#0284C7" }}
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
        <div id="mobile-menu" className="fixed inset-0 z-40 backdrop-blur-xl flex flex-col items-center justify-center gap-8" style={{ background: "rgba(255,255,255,0.97)" }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => navigateTo(l)}
              className="text-2xl font-bold transition-colors duration-200 bg-transparent border-0 cursor-pointer"
              style={{ color: "#334155" }}
              onMouseEnter={e => e.target.style.color="#0284C7"}
              onMouseLeave={e => e.target.style.color="#334155"}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      <main key={view} className="page-transition">
      {view === "Home" && (
        <>
        <section id="home" className="relative min-h-screen flex flex-col justify-center px-8 md:px-12 pt-28 pb-12 overflow-hidden mx-auto max-w-[1440px] z-10" style={{ background: "linear-gradient(160deg,#C5E8F7 0%,#E0F2FE 50%,#F0F9FF 100%)", borderLeft: "1px solid rgba(2,132,199,0.1)", borderRight: "1px solid rgba(2,132,199,0.1)" }}>
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

        <p className="mono text-[11px] font-bold uppercase tracking-[0.15em] mb-7 flex items-center gap-3 fade-up d1" style={{ color: "#38BDF8" }}>
          <span className="block w-12 h-[2px]" style={{ background: "#0284C7" }} />
          Consulting · Talent · Technology
        </p>

        <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.85] tracking-[-0.06em] max-w-6xl mb-12 fade-up d2" style={{ color: "#0C2340" }}>
          Scale your
          <br />
          <span className="text-stroke cursor-default inline-block" style={{ WebkitTextStroke: "2px #0284C7" }}>
            <TypingText words={["ambition", "vision", "growth", "impact"]} />
          </span>
          <br />
          with <span style={{ color: "#0284C7" }}>11x Square</span>
        </h1>

        <p className="text-[clamp(1rem,2vw,1.3rem)] font-medium leading-[1.5] max-w-2xl mb-14 fade-up d3" style={{ color: "#334155" }}>
          Bridging the gap between elite engineering and strategic growth with a platform-first approach.
        </p>

        <div className="flex flex-wrap gap-4 items-center fade-up d4">
          <MagneticButton
            onClick={() => navigateTo("Services")}
            className="font-bold text-[clamp(14px,1.5vw,16px)] px-10 py-4 rounded-full shadow-xl transition-all duration-200"
            style={{ background: "#0284C7", color: "#FFFFFF" }}
          >
            Start Building
          </MagneticButton>
          <MagneticButton
            onClick={() => navigateTo("Careers")}
            className="font-bold text-[clamp(14px,1.5vw,16px)] px-10 py-4 rounded-full shadow-sm transition-all duration-200"
            style={{ background: "transparent", border: "1.5px solid rgba(2,132,199,0.4)", color: "#0284C7" }}
          >
            Explore Roles
          </MagneticButton>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-12 pt-8 flex flex-wrap gap-12 fade-up d5" style={{ borderTop: "1px solid rgba(2,132,199,0.15)" }}>
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} animate={statsVisible} />
          ))}
        </div>
        </section>

        {/* MARQUEE - Now part of Home View only */}
        <div className="py-4 overflow-hidden z-20 relative" style={{ background: "#FFFFFF", borderTop: "1px solid rgba(2,132,199,0.3)", borderBottom: "1px solid rgba(2,132,199,0.3)" }}>
          <div className="marquee-track flex gap-14 w-max">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="mono text-[12px] font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-4" style={{ color: "#0284C7" }}>
                {item}
                <span className="text-[10px]" style={{ color: "#38BDF8" }}>✦</span>
              </span>
            ))}
          </div>
        </div>
        </>
      )}

      {view === "Services" && (
        <section id="services" className="px-8 md:px-12 py-20 mx-auto max-w-[1440px]" style={{ background: "#FFFFFF", borderLeft: "1px solid rgba(2,132,199,0.15)", borderRight: "1px solid rgba(2,132,199,0.15)" }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 fade-up d1">
          <div className="fade-up d2">
            <p className="mono text-[11px] uppercase tracking-[0.18em] mb-4 fade-up d3" style={{ color: "#334155" }}>// Our Solutions</p>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter leading-[0.9] fade-up d4" style={{ color: "#0C2340" }}>
              Consulting for the<br />bold & ambitious
            </h2>
          </div>
          <p className="text-lg md:text-xl font-medium leading-relaxed max-w-md fade-up d5" style={{ color: "#334155" }}>
            Platform-driven consulting that solves deep engineering and product problems in record time.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 fade-up d6" style={{ borderTop: "1px solid rgba(2,132,199,0.15)", borderLeft: "1px solid rgba(2,132,199,0.15)" }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} {...s} delay={0.1 * i} />
          ))}
        </div>
        </section>
      )}

      {view === "Careers" && (
        <section id="careers" className="px-8 md:px-12 py-20 mx-auto max-w-[1440px]" style={{ background: "#EBF8FF", borderTop: "1px solid rgba(2,132,199,0.2)", borderLeft: "1px solid rgba(2,132,199,0.15)", borderRight: "1px solid rgba(2,132,199,0.15)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div className="fade-up d1">
            <p className="mono text-[11px] uppercase tracking-[0.18em] mb-4 fade-up d2" style={{ color: "#334155" }}>// Careers</p>
            <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tighter leading-[1] mb-6 fade-up d3" style={{ color: "#0C2340" }}>
              Find your next<br />challenge at <span style={{ color: "#0284C7" }}>11x</span>
            </h2>
            <p className="text-lg font-medium leading-relaxed mb-10 max-w-md fade-up d4" style={{ color: "#334155" }}>
              Whether you're a seasoned consultant or a fresh grad ready to make your mark — we have a seat for you.
            </p>

            <div className="p-7 rounded-xl shadow-sm fade-up d5" style={{ background: "#FFFFFF", border: "1px solid rgba(2,132,199,0.3)" }}>
              <p className="mono text-[10px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#0284C7" }}>Intern Program Highlights</p>
              <ul className="flex flex-col gap-3">
                {[
                  "3-month structured cohort program",
                  "Real client projects from day one",
                  "Mentorship from senior consultants",
                  "Full-time conversion for top performers",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-medium" style={{ color: "#334155" }}>
                    <span className="flex-shrink-0 text-xl" style={{ color: "#38BDF8" }}>→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col border-t border-zinc-200 fade-up d6">
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
        <section id="process" className="px-8 md:px-12 py-24 fade-up d1" style={{ background: "#FFFFFF" }}>
        <p className="mono text-[11px] uppercase tracking-[0.18em] mb-4 fade-up d2" style={{ color: "#334155" }}>// The Process</p>
        <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tighter leading-[1] mb-16 max-w-xl fade-up d3" style={{ color: "#0C2340" }}>
          From discovery to results in weeks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden shadow-sm fade-up d4" style={{ border: "1px solid rgba(2,132,199,0.2)" }}>
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              style={{ animationDelay: `${0.1 * i}s`, background: "#FFFFFF", borderRight: i < STEPS.length - 1 ? "1px solid rgba(2,132,199,0.2)" : undefined, borderBottom: "1px solid rgba(2,132,199,0.2)" }}
              className="p-8 relative group transition-all duration-500 fade-up"
              onMouseEnter={e => e.currentTarget.style.background="#DBEAFE"}
              onMouseLeave={e => e.currentTarget.style.background="#FFFFFF"}
            >
              <div className="text-[80px] font-black leading-none mb-6 tracking-tighter group-hover:scale-110 transition-all duration-700" style={{ color: "rgba(2,132,199,0.15)" }}>
                {s.num}
              </div>
              <h4 className="text-base font-bold mb-3" style={{ color: "#0C2340" }}>{s.title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: "#334155" }}>{s.desc}</p>
            </div>
          ))}
        </div>
        </section>
      )}

      {view === "Contact" && (
        <section id="contact" className="px-8 md:px-12 py-24 fade-up d1 relative overflow-hidden" style={{ background: "#FFFFFF" }}>
          {/* decorative leaves */}
          <div className="absolute -top-10 -right-10 w-64 h-64 opacity-10 leaf-sway" style={{ transformOrigin: "bottom center" }}>
            <svg viewBox="0 0 200 200" fill="none"><path d="M100 10 C30 10 10 80 40 140 C70 200 160 180 170 120 C180 60 170 10 100 10Z" fill="white"/><path d="M100 10 L100 160" stroke="white" strokeWidth="2"/></svg>
          </div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 opacity-10" style={{ transform: "rotate(45deg)" }}>
            <svg viewBox="0 0 200 200" fill="none"><path d="M100 10 C30 10 10 80 40 140 C70 200 160 180 170 120 C180 60 170 10 100 10Z" fill="white"/></svg>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 fade-up d2 relative z-10">
          <div className="fade-up d3">
            <p className="mono text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "#334155" }}>// Get In Touch</p>
            <h2 className="text-[clamp(1.6rem,4vw,3rem)] font-black tracking-tight leading-[1.1] max-w-xl fade-up d4" style={{ color: "#0C2340" }}>
              Accelerate your team's potential today.
            </h2>
            <p className="text-[18px] font-medium mt-4 max-w-md fade-up d5" style={{ color: "#334155" }}>
              Connect with our leadership to explore high-impact consulting or talent solutions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 fade-up d6">
            <button
              onClick={() => setActiveModal("project")}
              className="font-bold text-lg px-12 py-5 rounded-xl transition-all duration-200 cursor-pointer"
              style={{ background: "#0284C7", color: "#FFFFFF" }}
              onMouseEnter={e => e.target.style.background="#BAE6FD"}
              onMouseLeave={e => e.target.style.background="#0284C7"}
            >
              Start a Project
            </button>
            <button
              onClick={() => setActiveModal("apply")}
              className="font-bold text-lg px-12 py-5 rounded-xl transition-all duration-200 cursor-pointer"
              style={{ background: "transparent", color: "#0C2340", border: "2px solid rgba(245,239,230,0.3)" }}
              onMouseEnter={e => { e.target.style.background="rgba(245,239,230,0.1)"; }}
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
      <footer className="px-8 md:px-12 pt-14 pb-10 fade-up d1" style={{ background: "linear-gradient(160deg,#C5E8F7 0%,#E0F2FE 100%)", borderTop: "1px solid rgba(2,132,199,0.2)" }}>
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-10 fade-up d2">
          <div className="max-w-xs fade-up d3">
            <Logo onClick={() => navigateTo("Home")} className="mb-4" size="footer" />
            <p className="text-sm leading-relaxed" style={{ color: "#6B8EA8" }}>
              Bridging elite consulting with the next generation of tech talent.
            </p>
          </div>

          <div className="flex flex-wrap gap-16 fade-up d4">
            {[
              { heading: "Company", links: ["About", "Services", "Process", "Blog"] },
              { heading: "Careers", links: ["Internships", "Full-time", "Freelance"] },
              { heading: "Contact", links: ["hello@11xsquare.com", "Chennai, India", "LinkedIn", "Twitter"] },
            ].map((col) => (
              <div key={col.heading}>
                <h5 className="mono text-[10px] font-bold uppercase tracking-[0.18em] mb-5" style={{ color: "#0284C7" }}>{col.heading}</h5>
                <ul className="flex flex-col gap-1.5 list-none">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" onClick={(e) => { e.preventDefault(); navigateTo("Home"); }}
                        className="text-sm transition-colors duration-200 no-underline" style={{ color: "#6B8EA8" }}
                        onMouseEnter={e => e.target.style.color="#0284C7"}
                        onMouseLeave={e => e.target.style.color="#6B8EA8"}
                      >{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(2,132,199,0.2)" }}>
          <p className="mono text-[11px]" style={{ color: "#94A3B8" }}>
            © 2025 <span style={{ color: "#0284C7" }}>11x Square</span>. All rights reserved.
          </p>
          <p className="mono text-[11px]" style={{ color: "#94A3B8" }}>✦ Built for the bold.</p>
        </div>
      </footer>
    </div>
  );
}
