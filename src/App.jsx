import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import logo from "./image/11x-logo.jpeg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Services", id: "services" },
  { label: "Careers",  id: "careers" },
  { label: "Process",  id: "process" },
  { label: "Contact",  id: "contact" },
];

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
    image: "/data-intelligence.png",
  },
  {
    num: "04",
    icon: "🚀",
    title: "Startup Acceleration",
    desc: "Hands-on support for early-stage founders — from MVP to investor-ready product and pitch decks.",
    tags: ["MVP", "Pitch", "Scale"],
    color: "pink",
    image: "/startup-acceleration.png",
  },
  {
    num: "05",
    icon: "🎯",
    title: "Engineering Teams",
    desc: "We source, vet, and deploy high-performing engineering squads — full-time, contract, or project-based.",
    tags: ["Hiring", "Remote", "Teams"],
    color: "emerald",
    image: "/engineering-teams.png",
  },
  {
    num: "06",
    icon: "💡",
    title: "Innovation Workshops",
    desc: "Facilitated design sprints and innovation sessions that solve deep problems in days, not months.",
    tags: ["Sprint", "UX", "Ideation"],
    color: "amber",
    image: "/innovation-workshops.png",
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
  { num: "01", title: "Discovery", desc: "We audit your stack, team, and goals to understand what's holding you back and what's possible.", color: "text-[#f73b20]" },
  { num: "02", title: "Strategy", desc: "A clear, actionable roadmap with milestones, owners, and measurable success criteria.", color: "text-[#360802]" },
  { num: "03", title: "Execution", desc: "Embedded consultants and curated talent work alongside your team to ship results.", color: "text-[#360802]" },
  { num: "04", title: "Scale", desc: "We hand off with documentation, playbooks, and a team ready to multiply the wins.", color: "text-[#f73b20]" },
];

const STATS = [
  { val: "120", unit: "+", label: "Projects Delivered", color: "text-white" },
  { val: "48",  unit: "+", label: "Interns Placed",     color: "text-white" },
  { val: "11",  unit: "x", label: "Average ROI",        color: "text-white" },
  { val: "32",  unit: "+", label: "Partner Companies",  color: "text-white" },
];

const MARQUEE_ITEMS = [
  "Strategic Consulting", "Tech Talent Placement", "Intern Hiring Programs",
  "Software Architecture", "Product Strategy", "Data & Analytics",
  "Digital Transformation", "Team Building",
];

const TESTIMONIALS = [
  {
    quote: "11x Square transformed our engineering culture in just 90 days. Their embedded team approach is unlike anything we've seen — actual results, not slide decks.",
    name: "James Whitfield",
    title: "CTO, NovaBridge Technologies",
    stars: 5,
  },
  {
    quote: "We raised our Series B after implementing 11x Square's data infrastructure recommendations. The ROI was immediate and measurable. Truly elite consulting.",
    name: "Priya Nair",
    title: "CEO, Luminary FinTech",
    stars: 5,
  },
  {
    quote: "Their intern placement program brought us three exceptional engineers who are now full-time leads. The talent quality is exceptional — vetted, sharp, and ready.",
    name: "Daniel Okonkwo",
    title: "Head of Engineering, Scalify",
    stars: 5,
  },
];

const TEAM = [
  {
    emoji: "👩‍💼",
    name: "Dhanushree V",
    role: "Founder & CEO",
    bio: "Serial entrepreneur with 10+ years scaling tech startups across the UK and India. Passionate about bridging elite talent with high-growth companies.",
  },
  {
    emoji: "👨‍💻",
    name: "Arjun Mehta",
    role: "Head of Engineering",
    bio: "Former principal engineer at two unicorns. Leads our technical consulting practice with expertise in distributed systems and cloud architecture.",
  },
  {
    emoji: "👩‍🔬",
    name: "Sophia Reynolds",
    role: "Strategy Director",
    bio: "Ex-McKinsey consultant turned startup advisor. Specialises in product-market fit, OKR frameworks, and go-to-market execution for SaaS companies.",
  },
  {
    emoji: "👨‍🎓",
    name: "Marcus Osei",
    role: "Talent Lead",
    bio: "Built intern and grad hiring programmes at Fortune 500 companies. Leads our talent placement division, connecting exceptional engineers with the right opportunities.",
  },
];

const CASE_STUDIES = [
  {
    client: "FinTech Startup",
    industry: "Financial Services",
    challenge: "Legacy monolith causing 40% downtime, blocking Series B due diligence and preventing international expansion.",
    solution: "Full cloud migration to microservices architecture, implemented CI/CD pipeline, and deployed 99.99% SLA monitoring.",
    metrics: ["340% capacity", "99.99% uptime", "£8M Series B"],
    color: "#222222",
  },
  {
    client: "EdTech Platform",
    industry: "Education Technology",
    challenge: "High churn rate of 35% monthly due to poor UX and lack of personalisation in learning pathways.",
    solution: "Redesigned onboarding flow, built ML-based personalisation engine, and ran 4-week design sprint with the product team.",
    metrics: ["70% less churn", "3x DAU", "90d results"],
    color: "#8B5CF6",
  },
  {
    client: "Global Retailer",
    industry: "E-Commerce & Retail",
    challenge: "Manual inventory management across 12 markets costing £1.8M annually in overstock and stockout losses.",
    solution: "Deployed predictive inventory system with real-time demand forecasting and automated supplier integrations.",
    metrics: ["£1.8M saved", "94% accuracy", "12 markets"],
    color: "#10B981",
  },
];

const BLOG_POSTS = [
  {
    category: "Engineering",
    title: "Why Your Microservices Are Slower Than Your Monolith",
    excerpt: "The promise of microservices is speed and scale — but most teams end up with distributed complexity. Here's how to avoid the common traps.",
    date: "12 Jun 2025",
    readTime: "6 min read",
  },
  {
    category: "Strategy",
    title: "The OKR Framework That Actually Works for Startups",
    excerpt: "Most OKR implementations fail because they're copied from enterprise playbooks. We share the lightweight version that scales with your team.",
    date: "5 Jun 2025",
    readTime: "8 min read",
  },
  {
    category: "Talent",
    title: "How We Vet 1,000 Applicants to Place the Top 1%",
    excerpt: "Our multi-stage evaluation framework goes beyond LeetCode. We look for the engineers who thrive in ambiguous, high-stakes environments.",
    date: "28 May 2025",
    readTime: "5 min read",
  },
  {
    category: "AI & Data",
    title: "Building Production ML Pipelines That Don't Break in 6 Months",
    excerpt: "Most ML projects fail post-deployment. We outline the data contracts, monitoring, and retraining loops that keep models healthy in production.",
    date: "20 May 2025",
    readTime: "10 min read",
  },
  {
    category: "Consulting",
    title: "The Discovery Call That Changes Everything",
    excerpt: "The first client call sets the tone for the entire engagement. We share our 12-question framework that uncovers the real problem, not the stated one.",
    date: "14 May 2025",
    readTime: "4 min read",
  },
  {
    category: "Startup",
    title: "From MVP to Series A: A Technical Roadmap",
    excerpt: "The architecture decisions you make at MVP stage define your ceiling at Series A. Here's how to build for growth without over-engineering.",
    date: "7 May 2025",
    readTime: "9 min read",
  },
];

const CATEGORY_COLORS = {
  Engineering: { bg: "#d4eedd", text: "#1a7a42" },
  Strategy:    { bg: "#e3ebfc", text: "#2d5bac" },
  Talent:      { bg: "#fde8eb", text: "#c41232" },
  "AI & Data": { bg: "#fef0ee", text: "#c0290f" },
  Consulting:  { bg: "#e3ebfc", text: "#2d5bac" },
  Startup:     { bg: "#fde8eb", text: "#c41232" },
};

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

function LoadingScreen() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem("11x_loaded"));
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t1 = setTimeout(() => setFading(true), 2000);
    const t2 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("11x_loaded", "1");
    }, 2650);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visible]);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#ffffff",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: fading ? 0 : 1,
      transition: "opacity 0.65s cubic-bezier(0.4,0,0.2,1)",
      pointerEvents: fading ? "none" : "all",
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Logo with glow */}
        <div style={{ position: "relative", marginBottom: 28 }}>
          <img
            src={logo}
            alt="11x Square"
            className="load-logo-pulse"
            style={{
              position: "relative",
              width: 96, height: 96,
              objectFit: "cover",
              borderRadius: 16,
              border: "1px solid #fbdfd9",
            }}
          />
        </div>

        {/* Brand */}
        <div style={{
          fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
          fontSize: "clamp(2rem, 6vw, 3rem)",
          fontWeight: 500,
          color: "#360802",
          letterSpacing: "0.03em",
          lineHeight: 1,
          marginBottom: 8,
        }}>
          11x<span style={{ color: "#f73b20" }}>Square</span>
        </div>

        <p style={{
          color: "#222222",
          fontSize: 10,
          fontFamily: "monospace",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom: 40,
        }}>
          Consulting · Talent · Technology
        </p>

        {/* Loading bar */}
        <div style={{ width: 160, height: 2, background: "rgba(0,0,0,0.12)", borderRadius: 2, overflow: "hidden" }}>
          <div className="load-bar-fill" />
        </div>
      </div>
    </div>
  );
}

function ParticleField({ className = "" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const PR = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = canvas.offsetWidth * PR;
      canvas.height = canvas.offsetHeight * PR;
      ctx.setTransform(PR, 0, 0, PR, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const COLORS = ["#f73b20","#f73b20","#fbdfd9","#360802","#34c771","#477ee9","#fb2d54"];
    const particles = Array.from({ length: 520 }, () => {
      const w = canvas.offsetWidth || 400;
      const h = canvas.offsetHeight || 480;
      const cx = w * 0.5, cy = h * 0.45;
      const angle = Math.random() * Math.PI * 2;
      const r = 30 + Math.random() * Math.max(w, h) * 0.55;
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r * 0.75,
        size: 1 + Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: Math.floor(Math.random() * 3),
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        alpha: 0.15 + Math.random() * 0.75,
      };
    });
    const draw = ({ x, y, size, color, shape, alpha }) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      if (shape === 0) {
        ctx.arc(x, y, size, 0, Math.PI * 2);
      } else if (shape === 1) {
        ctx.moveTo(x, y - size * 1.5); ctx.lineTo(x + size * 1.3, y + size); ctx.lineTo(x - size * 1.3, y + size); ctx.closePath();
      } else {
        ctx.moveTo(x, y - size * 1.5); ctx.lineTo(x + size * 1.3, y); ctx.lineTo(x, y + size * 1.5); ctx.lineTo(x - size * 1.3, y); ctx.closePath();
      }
      ctx.fill();
    };
    const animate = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -8) p.x = w + 8; if (p.x > w + 8) p.x = -8;
        if (p.y < -8) p.y = h + 8; if (p.y > h + 8) p.y = -8;
        draw(p);
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className={className} style={{ width: "100%", height: "100%", display: "block" }} />;
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
  return <div className="fixed top-0 left-0 z-[60] transition-all duration-100" style={{ height: "2px", width: `${width}%`, background: "#f73b20" }} />;
}

function MouseSpotlight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] opacity-60" style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(247,59,32,0.04), transparent 80%)` }} />
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
      <div className="text-xs uppercase tracking-wide font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>{label}</div>
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

    const multiplier = 12;
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
    indigo:  { bg: "#d4eedd", bgHover: "#c2e5d0", tag: "rgba(52,199,113,0.18)",  tagText: "#1a7a42" },
    orange:  { bg: "#e3ebfc", bgHover: "#d1ddf8", tag: "rgba(71,126,233,0.18)",  tagText: "#2d5bac" },
    purple:  { bg: "#fde8eb", bgHover: "#f9d4d9", tag: "rgba(251,45,84,0.18)",   tagText: "#c41232" },
    pink:    { bg: "#fef0ee", bgHover: "#fde4e0", tag: "rgba(247,59,32,0.18)",   tagText: "#c0290f" },
    emerald: { bg: "#d4eedd", bgHover: "#c2e5d0", tag: "rgba(52,199,113,0.18)",  tagText: "#1a7a42" },
    amber:   { bg: "#e3ebfc", bgHover: "#d1ddf8", tag: "rgba(71,126,233,0.18)",  tagText: "#2d5bac" },
  };
  const theme = THEMES[color] || { bg: "#fef5f3", bgHover: "#fbdfd9", tag: "rgba(247,59,32,0.12)", tagText: "#c0290f" };

  const isResting = rotation.x === 0 && rotation.y === 0;

  return (
    <motion.div
      className="group"
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-30px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={e => { e.currentTarget.style.background = theme.bgHover; }}
        onMouseLeave={e => { handleMouseLeave(); e.currentTarget.style.background = theme.bg; }}
        className="relative p-8 cursor-default overflow-hidden hover:z-10"
        style={{
          transition: isResting ? "background 0.3s ease, transform 0.6s ease-out" : "background 0.3s ease",
          background: theme.bg,
          border: "1px solid #fbdfd9",
          borderRadius: "16px",
        }}
      >
        {image && (
          <img src={image} alt={title} className="w-full object-cover mb-6" style={{ height: "200px", objectPosition: "center top", borderRadius: "8px" }} />
        )}
        <div className="mono text-[10px] tracking-widest mb-4 uppercase" style={{ color: "#888888" }}>{num}</div>
        <h3 className="text-2xl font-bold mb-4 leading-tight" style={{ color: "#000000", letterSpacing: "-0.04em" }}>{title}</h3>
        <p className="text-[15px] leading-relaxed max-w-[280px]" style={{ color: "#444444", fontWeight: 400 }}>{desc}</p>
        <div className="flex flex-wrap gap-2 mt-5">
          {tags.map((t, i) => (
            <span key={i} className="mono text-[10px] px-3 py-1 uppercase tracking-wider font-medium"
              style={{ background: theme.tag, color: theme.tagText, borderRadius: "8px" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function RoleItem({ title, type, location, period, delay, onApply }) {
  return (
    <div
      onClick={onApply}
      className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 transition-all duration-300 cursor-pointer group"
      style={{ background: "#ffffff", borderBottom: "1px solid #fbdfd9" }}
      onMouseEnter={e => e.currentTarget.style.background="#fef0ee"}
      onMouseLeave={e => e.currentTarget.style.background="#ffffff"}
    >
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-bold" style={{ color: "#000000" }}>{title}</span>
        <div className="flex gap-4 font-mono text-[11px]" style={{ color: "#222222" }}>
          <span>{location}</span>
          <span>{period}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-[10px] px-2.5 py-1 rounded-sm uppercase tracking-normal"
          style={type === "intern"
            ? { background: "#d4eedd", color: "#1a7a42", borderRadius: "8px" }
            : { background: "#fde8eb", color: "#c41232", borderRadius: "8px" }
          }
        >
          {type === "intern" ? "Intern" : "Full-time"}
        </span>
        <span className="text-lg transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: "#000000" }}>
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
        <span className={`font-bold ${size === "footer" ? "text-3xl" : "text-[22px]"}`} style={{ color: dark ? "#360802" : "#360802", letterSpacing: "0.02em", lineHeight: 1 }}>
          11x<span style={{ color: "#f73b20" }}>Square</span>
        </span>
        {size === "footer" && (
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: "#444444", marginTop: 2 }}>Consulting · Talent</span>
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
  const colors = ["#f73b20", "#360802", "#34c771", "#477ee9", "#fb2d54", "#fbdfd9"];
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
  green:      "#222222",
  greenLight: "#f73b20",
  greenMid:   "#f73b20",
  brown:      "#444444",
  brownLight: "#CCCCCC",
  beige:      "#222222",
  beigeLight: "#444444",
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
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(14px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-sm rounded-2xl shadow-2xl animate-fadeIn overflow-hidden"
        style={{ background: "#fef5f3", border: "1px solid rgba(0,0,0,0.25)" }}
      >
        <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg,transparent,#f73b20,transparent)" }} />
        <div className="flex flex-col items-center gap-6 px-8 py-12 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.12)", border: "1.5px solid rgba(0,0,0,0.35)" }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="14" stroke="#f73b20" strokeWidth="1.5" strokeOpacity="0.5"/>
              <path d="M8 15.5l5 5 9-10" stroke="#f73b20" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-xl font-black mb-2 tracking-tight" style={{ color: "#000000" }}>{title}</p>
            <p className="text-sm leading-relaxed" style={{ color: "#444444" }}>{subtitle}</p>
          </div>
          <button onClick={onClose}
            className="font-bold text-sm px-10 py-3 rounded-full cursor-pointer transition-all duration-200 border-0"
            style={{ background: "#f73b20", color: "#fff" }}
            onMouseEnter={e => e.target.style.background="#d62f16"}
            onMouseLeave={e => e.target.style.background="#f73b20"}
          >Done</button>
        </div>
      </div>
    </div>,
    document.body
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
      style={{ background: "rgba(254,245,243,0.88)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="modal-container w-full max-w-md rounded-3xl shadow-2xl animate-fadeIn relative flex flex-col"
        style={{ background: "#fef5f3" }}
      >
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
    background: "rgba(0,0,0,0.05)",
    border: "1.5px solid rgba(0,0,0,0.18)",
    borderRadius: "14px",
    color: "#000000",
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
      <div className="relative z-10 px-8 pt-8 pb-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#222222" }}>Let's Connect</p>
            <h3 className="text-2xl font-black leading-tight" style={{ color: "#000000" }}>Start a Project</h3>
          </div>
          <button
            onClick={onClose}
            className="opacity-50 hover:opacity-100 text-xl leading-none transition-opacity bg-transparent border-0 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: "rgba(0,0,0,0.08)", color: "#000000" }}
          >
            ✕
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col flex-1 min-h-0">
        <div className="px-8 pt-5 pb-2 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0" style={{ WebkitOverflowScrolling: "touch" }}>
          {[
            { label: "Full Name", name: "name", type: "text", placeholder: "Jane Doe" },
            { label: "Email Address", name: "email", type: "email", placeholder: "jane@company.com" },
            { label: "Phone Number", name: "phone", type: "tel", placeholder: "+91 98765 43210" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: "#222222" }}>{label}</label>
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                style={inputStyle}
                className="nature-input"
                onFocus={(e) => { e.target.style.border = "1.5px solid #222222"; e.target.style.background = "rgba(0,0,0,0.08)"; }}
                onBlur={(e) => { e.target.style.border = "1.5px solid rgba(0,0,0,0.18)"; e.target.style.background = "rgba(0,0,0,0.05)"; }}
              />
            </div>
          ))}
          {error && <p className="text-sm font-medium" style={{ color: "#ef4444" }}>{error}</p>}
        </div>
        <div className="px-8 pb-4 pt-2 shrink-0">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: "#222222", color: "#000000" }}
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
    background: "rgba(0,0,0,0.05)",
    border: "1.5px solid rgba(0,0,0,0.18)",
    borderRadius: "14px",
    color: "#000000",
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
      <div className="relative z-10 px-8 pt-8 pb-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#222222" }}>Join Our Team</p>
            <h3 className="text-2xl font-black leading-tight" style={{ color: "#000000" }}>Apply Now</h3>
          </div>
          <button
            onClick={onClose}
            className="opacity-50 hover:opacity-100 text-xl leading-none transition-opacity bg-transparent border-0 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: "rgba(0,0,0,0.08)", color: "#000000" }}
          >
            ✕
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col flex-1 min-h-0">
        <div className="px-8 pt-5 pb-2 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0" style={{ WebkitOverflowScrolling: "touch" }}>
          {[
            { label: "Full Name", name: "name", type: "text", placeholder: "Jane Doe" },
            { label: "Email Address", name: "email", type: "email", placeholder: "jane@company.com" },
            { label: "Phone Number", name: "phone", type: "tel", placeholder: "+91 98765 43210" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: "#222222" }}>{label}</label>
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                style={inputStyle}
                className="nature-input"
                onFocus={(e) => { e.target.style.border = "1.5px solid #222222"; e.target.style.background = "rgba(0,0,0,0.08)"; }}
                onBlur={(e) => { e.target.style.border = "1.5px solid rgba(0,0,0,0.18)"; e.target.style.background = "rgba(0,0,0,0.05)"; }}
              />
            </div>
          ))}

          <div>
            <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: "#222222" }}>Resume</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="rounded-2xl p-5 text-center cursor-pointer transition-all duration-200"
              style={{
                border: `2px dashed ${file ? "#222222" : "rgba(0,0,0,0.20)"}`,
                background: file ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.04)",
              }}
            >
              {file ? (
                <div className="flex items-center justify-center gap-2">
                  <span style={{ color: "#222222" }}>📄</span>
                  <p className="text-sm font-semibold truncate max-w-[220px]" style={{ color: "#000000" }}>{file.name}</p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium opacity-70" style={{ color: "#000000" }}>Click to upload resume</p>
                  <p className="text-xs mt-1 opacity-50" style={{ color: "#444444" }}>PDF, Word (.doc/.docx), TXT — max 10 MB</p>
                </>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFile} className="hidden" />
          </div>
          {error && <p className="text-sm font-medium" style={{ color: "#ef4444" }}>{error}</p>}
        </div>
        <div className="px-8 pb-4 pt-2 shrink-0">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: "#222222", color: "#000000" }}
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
  bg:      "#fef5f3",
  panel:   "#fef5f3",
  border:  "rgba(0,0,0,0.25)",
  indigo:  "#222222",
  violet:  "#f73b20",
  muted:   "#CCCCCC",
  text:    "#444444",
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
    background: "rgba(0,0,0,0.05)", border: `1.5px solid ${M.border}`,
    borderRadius: "12px", color: M.text, padding: "11px 15px",
    width: "100%", fontSize: "14px", fontWeight: 500, outline: "none", transition: "border 0.2s, background 0.2s",
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(255,255,255,0.80)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-container w-full max-w-md rounded-2xl shadow-2xl animate-fadeIn flex flex-col" style={{ background: M.bg, border: `1px solid ${M.border}` }}>
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${M.indigo}, ${M.violet})` }} />

        <div className="px-7 pt-6 pb-5" style={{ borderBottom: `1px solid ${M.border}` }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: M.violet }}>Careers · Apply</p>
              <h3 className="text-xl font-black leading-tight" style={{ color: "#000000" }}>{role?.title || "Apply Now"}</h3>
              {role && (
                <p className="text-xs mt-1" style={{ color: M.muted }}>{role.location} · {role.period}</p>
              )}
            </div>
            <button onClick={onClose} className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors bg-transparent border-0 cursor-pointer"
              style={{ background: "rgba(0,0,0,0.08)", color: M.muted }}
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
                    onFocus={(e) => { e.target.style.border = `1.5px solid ${M.indigo}`; e.target.style.background = "rgba(0,0,0,0.12)"; }}
                    onBlur={(e) => { e.target.style.border = `1.5px solid ${M.border}`; e.target.style.background = "rgba(0,0,0,0.05)"; }}
                  />
                </div>
              ))}

              <div>
                <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: M.violet }}>Resume</label>
                <div onClick={() => fileInputRef.current?.click()} className="rounded-xl p-5 text-center cursor-pointer transition-all duration-200"
                  style={{ border: `2px dashed ${file ? M.indigo : M.border}`, background: file ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.03)" }}
                >
                  {file ? (
                    <div className="flex items-center justify-center gap-2">
                      <span style={{ color: M.violet }}>📄</span>
                      <p className="text-sm font-semibold truncate max-w-[220px]" style={{ color: "#000000" }}>{file.name}</p>
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
                style={{ background: `linear-gradient(135deg, ${M.indigo}, ${M.violet})`, color: "#ffffff" }}
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

/* ── Testimonials Section ────────────────────────────────────────────────── */
function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.12)" }}>
      <div className="px-5 md:px-12 py-14 md:py-20">
        <div className="eyebrow mb-3">Client Stories</div>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter leading-[1] mb-12" style={{ color: "#000000" }}>
          What our clients say
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl flex flex-col gap-5 transition-all duration-300"
              style={{ background: "#fef5f3", border: "1px solid #fbdfd9" }}
              onMouseEnter={e => e.currentTarget.style.background="#fef0ee"}
              onMouseLeave={e => e.currentTarget.style.background="#fef5f3"}
            >
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <span key={s} style={{ color: "#f73b20", fontSize: "14px" }}>★</span>
                ))}
              </div>
              <p className="text-[15px] leading-relaxed font-medium flex-1" style={{ color: "#444444" }}>
                "{t.quote}"
              </p>
              <div>
                <p className="font-bold text-sm" style={{ color: "#000000" }}>{t.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "#222222" }}>{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Scroll Reveal Hook (handles both legacy + Lusion classes) ─────────────── */
function useGSAPAnimations() {
  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem("11x_loaded");
    const heroDelay = alreadyLoaded ? 0.15 : 2.85;

    const ctx = gsap.context(() => {
      // ── Hero: timeline on page load (not scroll-triggered) ──
      gsap.timeline({ delay: heroDelay })
        .from("#home .lusion-fade.d1", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" })
        .from("#home .lusion-line-inner", { y: "110%", duration: 1.1, stagger: 0.15, ease: "power4.out" }, "-=0.3")
        .from(
          "#home .lusion-fade:not(.d1)",
          { y: 44, opacity: 0, duration: 0.9, stagger: 0.13, ease: "power3.out" },
          "-=0.85"
        );

      // ── All other sections: scroll-triggered ──
      ["services", "careers", "process", "testimonials", "contact"].forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const lineInners = section.querySelectorAll(".lusion-line-inner");
        const clips      = section.querySelectorAll(".lusion-clip");
        const fades      = section.querySelectorAll(".lusion-fade");
        const reveals    = section.querySelectorAll(".scroll-reveal");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });

        if (lineInners.length)
          tl.from(lineInners, { y: "110%", duration: 1.1, stagger: 0.15, ease: "power4.out" });
        if (clips.length)
          tl.from(clips, { clipPath: "inset(0 0 100% 0)", y: 20, opacity: 0, duration: 1.1, stagger: 0.14, ease: "power4.out" }, lineInners.length ? "<0.2" : ">");
        if (fades.length)
          tl.from(fades, { y: 44, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }, "<0.2");
        if (reveals.length)
          tl.from(reveals, { y: 36, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "<0.15");
      });

      // ── Wolf cinematic sections ──
      gsap.utils.toArray(".wolf-heading").forEach((el) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);
}

/* ── Custom cursor (dot + lagging ring) ─────────────────────────────────── */
function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const ringPos = useRef({ x: 0, y: 0 });
  const mouse   = useRef({ x: 0, y: 0 });
  const animId  = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${e.clientX - 3}px,${e.clientY - 3}px,0)`;
    };
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    window.addEventListener("mousemove", onMove);
    const addHover = () => document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    addHover();
    const lerp = (a, b, n) => a + (b - a) * n;
    const loop = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x - 16, 0.13);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y - 16, 0.13);
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringPos.current.x}px,${ringPos.current.y}px,0)`;
      animId.current = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(animId.current); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring${hovered ? " hovered" : ""}`} />
    </>
  );
}

/* ── Exit Intent Popup ────────────────────────────────────────────────────── */
function ExitIntentPopup({ onContact }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("exitShown")) return;
    const handle = (e) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem("exitShown", "1");
      }
    };
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: "rgba(254,245,243,0.88)", backdropFilter: "blur(6px)" }}>
      <div className="relative w-full max-w-md rounded-2xl p-8 text-center" style={{ background: "#fef5f3", border: "1px solid rgba(0,0,0,0.3)", boxShadow: "0 0 60px rgba(0,0,0,0.15)" }}>
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-xl bg-transparent border-0 cursor-pointer" style={{ color: "#444444" }}>✕</button>
        <div className="text-4xl mb-4">🎯</div>
        <div className="eyebrow mb-2 justify-center">Wait — before you go!</div>
        <h3 className="text-2xl font-black tracking-tighter mb-3" style={{ color: "#000000" }}>Get a FREE 30-min Strategy Session</h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "#444444" }}>No commitment. Just clarity on what's possible for your business. Our consultants have helped 120+ companies unlock breakthrough growth.</p>
        <button
          onClick={() => { setShow(false); onContact(); }}
          className="w-full font-bold text-base py-3 rounded-xl transition-all duration-200 cursor-pointer"
          style={{ background: "linear-gradient(135deg,#222222,#f73b20)", color: "#000000", border: "none" }}
          onMouseEnter={e => e.target.style.opacity="0.9"}
          onMouseLeave={e => e.target.style.opacity="1"}
        >
          Claim Free Session →
        </button>
        <button onClick={() => setShow(false)} className="mt-3 text-xs bg-transparent border-0 cursor-pointer underline" style={{ color: "#222222" }}>No thanks, I'll pass</button>
      </div>
    </div>
  );
}

/* ── Cookie Consent Banner ────────────────────────────────────────────────── */
function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("cookieConsent")) setShow(true);
  }, []);
  const accept = () => { localStorage.setItem("cookieConsent", "accepted"); setShow(false); };
  const decline = () => { localStorage.setItem("cookieConsent", "declined"); setShow(false); };
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: "rgba(254,245,243,0.97)", borderTop: "1px solid rgba(0,0,0,0.2)", backdropFilter: "blur(12px)" }}>
      <p className="text-sm text-center sm:text-left" style={{ color: "#444444" }}>
        🍪 We use cookies to improve your experience on 11xsquare.com. <span style={{ color: "#222222" }}>By continuing, you agree to our cookie policy.</span>
      </p>
      <div className="flex gap-3 flex-shrink-0">
        <button onClick={decline} className="text-sm font-bold px-5 py-2 rounded-full cursor-pointer transition-all" style={{ background: "transparent", border: "1px solid rgba(0,0,0,0.25)", color: "#444444" }}>Decline</button>
        <button onClick={accept} className="text-sm font-bold px-5 py-2 rounded-full cursor-pointer transition-all" style={{ background: "#222222", color: "#000000", border: "none" }}>Accept All</button>
      </div>
    </div>
  );
}

/* ── FAQ Accordion ────────────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  { q: "What types of companies do you work with?", a: "We work with startups (Seed to Series B), scale-ups, and enterprise teams across the UK and India. Our sweet spot is companies with 10–200 employees ready to scale their technology or talent." },
  { q: "How long does a typical engagement last?", a: "Project-based engagements typically run 8–16 weeks. Ongoing retainers are month-to-month. Talent placements are permanent or contract-based depending on your needs." },
  { q: "What does it cost?", a: "Engagements start from £3,000/month for advisory work, with project-based pricing available. Fill out our contact form for a custom proposal tailored to your goals." },
  { q: "How quickly can you start?", a: "Most engagements kick off within 1–2 weeks of signing. For urgent talent needs, we can activate our network within 48 hours." },
  { q: "Do you work remotely or on-site?", a: "Both. Most consulting is delivered remotely, with optional on-site days for strategy sessions and workshops. We have teams in the UK and India." },
  { q: "What makes 11x Square different from other consultancies?", a: "We're a hybrid — part consulting firm, part talent network, part technology partner. We don't just advise; we embed, execute, and deliver measurable results. Our average client sees 11x ROI on their engagement." },
];

function FaqAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <section className="px-5 md:px-12 py-16 md:py-20 scroll-reveal" style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.12)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="eyebrow mb-3">FAQ</div>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter leading-[1] mb-10" style={{ color: "#000000" }}>Common questions</h2>
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="rounded-xl overflow-hidden transition-all duration-300" style={{ background: open === i ? "#fbdfd9" : "#fef5f3", border: `1px solid ${open === i ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.12)"}` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-transparent border-0 cursor-pointer gap-4"
              >
                <span className="font-bold text-base" style={{ color: "#000000" }}>{item.q}</span>
                <span className="flex-shrink-0 text-xl font-light transition-transform duration-300" style={{ color: "#222222", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed" style={{ color: "#444444" }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
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

  const sendMessage = async (msg) => {
    const text = (typeof msg === "string" ? msg : input).trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { text, from: "user", time: new Date().toISOString() }]);
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

  const C = { bg: "#fef5f3", header: "#fef5f3", accent: "#222222", moss: "#fbdfd9", text: "#000000", muted: "#444444" };

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col items-end gap-3">
      {/* WhatsApp floating button */}
      <div style={{ position: "relative" }} className="group/wa">
        <a
          href="https://wa.me/447778303743?text=Hi%20there!%20I%20found%20you%20on%2011xSquare.com%20and%20I%27m%20interested%20in%20your%20services.%20Can%20we%20connect%3F"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#25D366",
            boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.55)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)"; }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.665 4.8 1.822 6.8L2 30l7.4-1.8A13.934 13.934 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2Z" fill="#25D366"/>
            <path d="M23.5 19.8c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.86 1.2 3.06c.15.2 2.07 3.17 5.02 4.44.7.3 1.25.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.73-.71 1.97-1.4.24-.69.24-1.28.17-1.4-.07-.12-.27-.19-.57-.34Z" fill="white"/>
          </svg>
        </a>
        {/* Tooltip */}
        <div
          style={{
            position: "absolute",
            right: "68px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#1a1a1a",
            color: "#000000",
            fontSize: "12px",
            fontWeight: 600,
            padding: "6px 12px",
            borderRadius: "8px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.2s",
            border: "1px solid rgba(0,0,0,0.15)",
          }}
          className="group-hover/wa:opacity-100"
        >
          Chat on WhatsApp
          <div style={{
            position: "absolute",
            right: "-5px",
            top: "50%",
            transform: "translateY(-50%)",
            width: 0,
            height: 0,
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
            borderLeft: "5px solid #1a1a1a",
          }} />
        </div>
      </div>

      {isOpen && (
        <div className="rounded-2xl overflow-hidden shadow-2xl animate-fadeIn flex flex-col"
          style={{ width: 340, height: 480, background: C.bg, border: "1px solid rgba(0,0,0,0.2)" }}
        >
          {/* header */}
          <div className="px-5 py-4 flex items-center justify-between shrink-0" style={{ background: C.header, borderBottom: "1px solid rgba(0,0,0,0.2)" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#222222" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.02 2 11c0 2.4.96 4.6 2.54 6.24L3 21l4.1-1.3A10.1 10.1 0 0012 20c5.52 0 10-4.02 10-9S17.52 2 12 2Z" fill="#ffffff" stroke="#ffffff" strokeWidth="1.5"/>
                  <circle cx="8.5" cy="11" r="1.1" fill="#222222"/><circle cx="12" cy="11" r="1.1" fill="#222222"/><circle cx="15.5" cy="11" r="1.1" fill="#222222"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold leading-tight" style={{ color: "#000000" }}>11x Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                  <span className="text-xs" style={{ color: C.moss }}>Always online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-lg text-sm bg-transparent border-0 cursor-pointer"
              style={{ background: "rgba(0,0,0,0.08)", color: C.muted }}
            >✕</button>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "bot" && (
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs mr-2 shrink-0 mt-0.5" style={{ background: "#222222", color: "#fff", fontWeight: 700, fontSize: 10 }}>11x</div>
                )}
                <div className="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
                  style={msg.from === "user"
                    ? { background: "linear-gradient(135deg,#222222,#f73b20)", color: "#fff", borderBottomRightRadius: 4 }
                    : { background: "rgba(0,0,0,0.12)", color: C.text, borderBottomLeftRadius: 4, border: "1px solid rgba(0,0,0,0.2)" }
                  }
                >{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0" style={{ background: "#222222", color: "#fff", fontWeight: 700, fontSize: 10 }}>11x</div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1" style={{ background: "rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.2)" }}>
                  {[0,1,2].map((j) => <span key={j} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: C.moss, animationDelay: `${j*0.15}s` }} />)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* quick reply chips */}
          <div className="px-4 pt-2.5 pb-1.5 flex flex-wrap gap-1.5 shrink-0" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            {["Services", "Careers", "Pricing", "Contact Us"].map((label) => (
              <button
                key={label}
                onClick={() => sendMessage(label)}
                disabled={isTyping}
                className="text-xs px-3 py-1 rounded-full cursor-pointer border-0 transition-all duration-150 disabled:opacity-40"
                style={{ background: "rgba(0,0,0,0.10)", color: "#222222", border: "1px solid rgba(0,0,0,0.22)", fontWeight: 600 }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.22)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.10)"; }}
              >{label}</button>
            ))}
          </div>

          {/* input */}
          <div className="px-4 py-3 shrink-0 flex gap-2" style={{ borderTop: "1px solid rgba(0,0,0,0.12)" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Type a message…"
              className="nature-input flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{ background: "rgba(0,0,0,0.08)", border: "1.5px solid rgba(0,0,0,0.25)", color: C.text, fontWeight: 500 }}
            />
            <button onClick={sendMessage} disabled={!input.trim()} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 border-0 shrink-0"
              style={{ background: "linear-gradient(135deg,#222222,#f73b20)" }}
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
        style={{ background: "linear-gradient(135deg, #222222, #f73b20)", border: "1px solid rgba(0,0,0,0.4)" }}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="#222222" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.02 2 11c0 2.4.96 4.6 2.54 6.24L3 21l4.1-1.3A10.1 10.1 0 0012 20c5.52 0 10-4.02 10-9S17.52 2 12 2Z" fill="#222222" stroke="#222222" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="8.5" cy="11" r="1.2" fill="#222222"/>
            <circle cx="12" cy="11" r="1.2" fill="#222222"/>
            <circle cx="15.5" cy="11" r="1.2" fill="#222222"/>
          </svg>
        )}
      </button>
    </div>
  );
}

/* ── Newsletter Section ───────────────────────────────────────────────────── */
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed.");
      setStatus("success");
      setMessage(data.message || "You're subscribed!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <section style={{ background: "#fef5f3", borderTop: "1px solid rgba(0,0,0,0.15)", borderBottom: "1px solid rgba(0,0,0,0.15)" }}>
      <div className="px-5 md:px-12 py-12 md:py-16">
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <div className="eyebrow mb-3">Stay Informed</div>
          <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-black tracking-tighter mb-3" style={{ color: "#000000" }}>
            Insights delivered to your inbox
          </h2>
          <p className="text-sm font-medium mb-8" style={{ color: "#444444" }}>
            Strategy, engineering, and talent — one newsletter, no noise.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl" style={{ background: "rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.3)" }}>
              <span style={{ color: "#222222", fontSize: "20px" }}>✓</span>
              <p className="font-bold text-sm" style={{ color: "#222222" }}>{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="nature-input"
                style={{
                  flex: "1 1 240px",
                  maxWidth: "360px",
                  background: "rgba(0,0,0,0.05)",
                  border: "1.5px solid rgba(0,0,0,0.25)",
                  borderRadius: "12px",
                  color: "#000000",
                  padding: "12px 18px",
                  fontSize: "14px",
                  fontWeight: 500,
                  outline: "none",
                  transition: "border 0.2s, background 0.2s",
                }}
                onFocus={e => { e.target.style.border = "1.5px solid #222222"; e.target.style.background = "rgba(0,0,0,0.1)"; }}
                onBlur={e => { e.target.style.border = "1.5px solid rgba(0,0,0,0.25)"; e.target.style.background = "rgba(0,0,0,0.05)"; }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  background: "#222222",
                  color: "#000000",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px 28px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "background 0.2s",
                  whiteSpace: "nowrap",
                  opacity: status === "loading" ? 0.7 : 1,
                }}
                onMouseEnter={e => { e.target.style.background = "#f73b20"; }}
                onMouseLeave={e => { e.target.style.background = "#222222"; }}
              >
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm font-medium" style={{ color: "#f87171" }}>{message}</p>
          )}
        </div>
      </div>
    </section>
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
          className="wolf-heading font-black tracking-tighter leading-none mb-6 text-white"
          style={{ fontSize: "clamp(3rem,8vw,6rem)", textShadow: "0 2px 24px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,1)", fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif", textTransform: "uppercase", letterSpacing: "0.03em" }}
        >
          {heading}
        </h2>
        <p className="wolf-heading text-lg font-medium max-w-md mx-auto" style={{ color: "rgba(255,237,215,0.85)", textShadow: "0 1px 8px rgba(0,0,0,0.95)" }}>
          {sub}
        </p>
      </div>
    </section>
  );
}

const SECTION_ORDER = ["home", "services", "careers", "process", "testimonials", "contact"];

function ScrollToContinue({ activeSection }) {
  const idx = SECTION_ORDER.indexOf(activeSection);
  const nextId = SECTION_ORDER[idx + 1];

  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let t;
    const onScroll = () => {
      setVisible(false);
      clearTimeout(t);
      t = setTimeout(() => setVisible(true), 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, []);

  if (!nextId) return null;

  const handleClick = () => {
    const el = document.getElementById(nextId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        bottom: 36,
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? 0 : 12}px)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease, transform 0.4s ease",
        zIndex: 49,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 22px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.72)",
        border: "1px solid rgba(0,0,0,0.35)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "#000000",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        cursor: "pointer",
        boxShadow: "0 4px 32px rgba(0,0,0,0.12)",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.7)"; e.currentTarget.style.boxShadow = "0 4px 32px rgba(0,0,0,0.25)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.35)"; e.currentTarget.style.boxShadow = "0 4px 32px rgba(0,0,0,0.12)"; }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: "scrollBounce 1.6s ease-in-out infinite" }}>
        <path d="M2 4.5L7 9.5L12 4.5" stroke="#222222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Scroll to continue
    </button>
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
      style={{ background: status.available ? "rgba(0,0,0,0.10)" : "rgba(0,0,0,0.06)", border: `1px solid ${status.available ? "rgba(0,0,0,0.30)" : "rgba(0,0,0,0.15)"}` }}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status.available ? "bg-emerald-400 animate-pulse" : "bg-gray-500"}`} />
      <span style={{ color: status.available ? "#444444" : "#6B7280" }}>
        {status.available ? "Team available" : "Offline"} · {status.timeStr} IST
      </span>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [careersApplyRole, setCareersApplyRole] = useState(null);
  const statsRef = useRef(null);
  const lastScrollY = useRef(0);
  useGSAPAnimations();


  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > lastScrollY.current && y > 80) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
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

  useEffect(() => {
    const ids = ["home", "services", "careers", "process", "testimonials", "contact"];
    const secObs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) secObs.observe(el); });
    return () => secObs.disconnect();
  }, []);

  const scrollToSection = useCallback((id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: "#ffffff", color: "#000000" }}>
      <LoadingScreen />
      <CustomCursor />
      <MouseSpotlight />
      <ScrollProgress />

      {/* Floating Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[130px] animate-pulse" style={{ background: "rgba(247,59,32,0.06)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[130px] animate-pulse" style={{ background: "rgba(251,223,217,0.35)", animationDelay: "2s" }} />
        <div className="absolute top-[40%] left-[55%] w-[30%] h-[30%] rounded-full blur-[110px] animate-pulse" style={{ background: "rgba(247,59,32,0.04)", animationDelay: "4s" }} />
      </div>

      {/* NAV */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12"
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: navHidden ? -72 : 0, opacity: navHidden ? 0 : 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: 64,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(247,59,32,0.15)" : "none",
        }}
      >
        <Logo onClick={() => scrollToSection("home")} dark={false} />

        <ul className="hidden md:flex gap-8 list-none">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className="transition-all duration-200 bg-transparent border-0 cursor-pointer"
                style={{
                  color: scrolled ? (activeSection === id ? "#360802" : "#888888") : (activeSection === id ? "#ffffff" : "rgba(255,255,255,0.75)"),
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "1.44px",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                }}
                onMouseEnter={e => { e.target.style.color = scrolled ? "#360802" : "#ffffff"; }}
                onMouseLeave={e => { e.target.style.color = scrolled ? (activeSection === id ? "#360802" : "#888888") : (activeSection === id ? "#ffffff" : "rgba(255,255,255,0.75)"); }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => scrollToSection("contact")}
          className="hidden md:block"
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "1.44px",
            textTransform: "uppercase",
            color: scrolled ? "#f73b20" : "#ffffff",
            padding: "10px 22px",
            background: "transparent",
            border: `1.5px solid ${scrolled ? "#f73b20" : "rgba(255,255,255,0.70)"}`,
            borderRadius: "16px",
            cursor: "pointer",
            transition: "color 0.3s, border-color 0.3s",
          }}
        >
          Get Started ↗
        </button>

        <button
          className="md:hidden bg-transparent border-0 cursor-pointer text-2xl"
          style={{ color: "#222222" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </motion.nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 backdrop-blur-xl flex flex-col items-center justify-center gap-8" style={{ background: "#ffffff" }}>
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-2xl font-bold transition-colors duration-200 bg-transparent border-0 cursor-pointer"
              style={{ color: "#444444" }}
              onMouseEnter={e => e.target.style.color="#222222"}
              onMouseLeave={e => e.target.style.color="#888888"}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <main>

        {/* ── HOME ─────────────────────────────────────────────────────── */}
        <section id="home" className="relative flex flex-col justify-center px-5 md:px-12 pt-20 pb-10 md:pt-28 md:pb-12 overflow-hidden z-10" style={{ height: "100svh" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #f8a4a4 0%, #f73b20 55%, #f5a060 100%)" }} />
          <div className="absolute inset-0 grid-bg pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
            <div className="flex-1 min-w-0">
              <div className="eyebrow mb-7 lusion-fade d1" style={{ color: "rgba(255,255,255,0.90)" }}>Consulting · Talent · Technology</div>

              <h1 className="text-[clamp(3rem,8vw,7.5rem)] display-headline mb-6 md:mb-10"
                style={{ color: "#ffffff" }}>
                <span className="lusion-line d2"><span className="lusion-line-inner">Scale your</span></span>
                <span className="lusion-line d3"><span className="lusion-line-inner" style={{ color: "#fbdfd9" }}>
                  <TypingText words={["ambition", "vision", "growth", "impact"]} />
                </span></span>
              </h1>

              <p className="text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.6] max-w-xl mb-10 lusion-fade d3"
                style={{ color: "rgba(255,255,255,0.80)", fontWeight: 400 }}>
                Bridging the gap between elite engineering and strategic growth with a platform-first approach.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center lusion-fade d4">
                <MagneticButton
                  onClick={() => scrollToSection("services")}
                  className="text-center"
                  style={{ padding: "14px 32px", background: "#ffffff", color: "#360802", border: "1.5px solid rgba(255,255,255,0.80)", borderRadius: "16px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
                >
                  Start Building ↗
                </MagneticButton>
                <MagneticButton
                  onClick={() => scrollToSection("careers")}
                  className="text-center"
                  style={{ padding: "14px 28px", color: "#ffffff", fontSize: 12, fontWeight: 500, letterSpacing: "1.44px", textTransform: "uppercase", background: "transparent", border: "1.5px solid rgba(255,255,255,0.60)", borderRadius: "16px" }}
                >
                  Explore Roles
                </MagneticButton>
              </div>

              <motion.div
                ref={statsRef}
                className="mt-8 md:mt-10 pt-7 md:pt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-10"
                style={{ borderTop: "1px solid rgba(255,255,255,0.20)" }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: sessionStorage.getItem("11x_loaded") ? 0.9 : 3.6 }}
              >
                {STATS.map((s) => (
                  <StatCard key={s.label} {...s} animate={statsVisible} />
                ))}
              </motion.div>
            </div>

            <motion.div
              className="hidden lg:flex flex-shrink-0 items-center justify-center"
              initial={{ opacity: 0, scale: 0.88, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: sessionStorage.getItem("11x_loaded") ? 0.4 : 3.1 }}
            >
              <img src={logo} alt="11x Square" className="object-cover"
                style={{ width: 320, height: 320, borderRadius: 40, border: "2px solid rgba(255,255,255,0.45)" }} />
            </motion.div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="py-4 overflow-hidden z-20 relative" style={{ background: "#360802", borderTop: "1px solid rgba(247,59,32,0.30)", borderBottom: "1px solid rgba(247,59,32,0.30)" }}>
          <div className="marquee-track flex gap-14 w-max">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="mono text-[11px] font-medium uppercase tracking-widest whitespace-nowrap flex items-center gap-4" style={{ color: "#fbdfd9" }}>
                {item}
                <span className="text-[8px]" style={{ color: "rgba(247,59,32,0.70)" }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── SERVICES ──────────────────────────────────────────────────── */}
        <section id="services" className="px-5 md:px-12 py-14 md:py-20" style={{ background: "#ffffff" }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="eyebrow mb-4 lusion-fade d1">Our Solutions</div>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter leading-[0.9]" style={{ color: "#000000" }}>
                <span className="lusion-clip d2" style={{ display: "block" }}>Consulting for the</span>
                <span className="lusion-clip d3" style={{ display: "block" }}>bold &amp; ambitious</span>
              </h2>
            </div>
            <p className="text-lg md:text-xl font-medium leading-relaxed max-w-md lusion-fade d4" style={{ color: "#444444" }}>
              Platform-driven consulting that solves deep engineering and product problems in record time.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lusion-fade d5">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.num} {...s} delay={0.1 * i} />
            ))}
          </div>
        </section>

        {/* Wolf break 1 */}
        <WolfSection
          src="/Group_of_wolves_on_path_202606211412.mp4"
          heading="Run with the pack"
          sub="Join a team that hunts for excellence and never settles for less."
        />

        {/* ── CAREERS ───────────────────────────────────────────────────── */}
        <section id="careers" className="relative px-5 md:px-12 py-14 md:py-20 overflow-hidden" style={{ minHeight: "100svh", background: "#ffffff" }}>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <div>
              <div className="eyebrow mb-4 lusion-fade d1">Careers</div>
              <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tighter leading-[1] mb-6" style={{ color: "#000000" }}>
                <span className="lusion-clip d2" style={{ display: "block" }}>Find your next</span>
                <span className="lusion-clip d3" style={{ display: "block" }}>challenge at <span style={{ color: "#222222" }}>11x</span></span>
              </h2>
              <p className="text-lg font-medium leading-relaxed mb-10 max-w-md lusion-fade d4" style={{ color: "#444444" }}>
                Whether you're a seasoned consultant or a fresh grad ready to make your mark — we have a seat for you.
              </p>

              <div className="p-7 rounded-2xl lusion-fade d5" style={{ background: "#fef5f3", border: "1px solid #fbdfd9" }}>
                <p className="mono text-[10px] font-medium uppercase tracking-[0.15em] mb-4" style={{ color: "#888888" }}>Intern Program Highlights</p>
                <ul className="flex flex-col gap-3">
                  {[
                    "3-month structured cohort program",
                    "Real client projects from day one",
                    "Mentorship from senior consultants",
                    "Full-time conversion for top performers",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm" style={{ color: "#222222", fontWeight: 400 }}>
                      <span className="flex-shrink-0 text-base" style={{ color: "#000000" }}>→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col lusion-fade d5 rounded-2xl overflow-hidden" style={{ border: "1px solid #fbdfd9" }}>
              {ROLES.map((r, i) => (
                <RoleItem key={r.title} {...r} delay={0.1 * i} onApply={() => setCareersApplyRole(r)} />
              ))}
            </div>
          </div>
        </section>

        {/* Wolf break 2 */}
        <WolfSection
          src="/Wolf_mouth_fire_video_202606211302.mp4"
          heading="Forged in fire"
          sub="Our process is battle-tested. Results that speak louder than slides."
        />

        {/* ── PROCESS ───────────────────────────────────────────────────── */}
        <section id="process" className="relative flex flex-col justify-center px-5 md:px-12 py-20 md:py-28 overflow-hidden" style={{ minHeight: "100svh", background: "#ffffff" }}>
          <div className="relative z-10">
            <div className="eyebrow mb-3 lusion-fade d1">The Process</div>
            <h2 className="text-[clamp(1.5rem,5vw,4rem)] font-black tracking-tighter leading-[1.05] mb-6 md:mb-14 max-w-xl"
              style={{ color: "#000000" }}>
              <span className="lusion-clip d2" style={{ display: "block" }}>From discovery</span>
              <span className="lusion-clip d3" style={{ display: "block" }}>to results in weeks</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden lusion-fade d4" style={{ border: "1px solid #fbdfd9" }}>
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-40px" }}
                  style={{
                    background: "#ffffff",
                    borderRight: i < STEPS.length - 1 ? "1px solid #fbdfd9" : undefined,
                    borderBottom: "1px solid #fbdfd9",
                  }}
                  className="p-5 sm:p-6 lg:p-8 relative group transition-colors duration-300"
                  onMouseEnter={e => e.currentTarget.style.background="#fef0ee"}
                  onMouseLeave={e => e.currentTarget.style.background="#ffffff"}
                >
                  <div className="text-[40px] sm:text-[56px] lg:text-[72px] font-black leading-none mb-3 tracking-tighter" style={{ color: "rgba(0,0,0,0.30)" }}>{s.num}</div>
                  <h4 className="text-sm sm:text-base font-bold mb-2" style={{ color: "#000000" }}>{s.title}</h4>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#444444" }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
        <TestimonialsSection />

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        {/* ── CONTACT ───────────────────────────────────────────────────── */}
        <section id="contact" className="px-5 md:px-12 relative overflow-hidden flex flex-col justify-center" style={{ minHeight: "100svh", background: "#ffffff" }}>
          <div className="absolute -top-10 -right-10 w-64 h-64 opacity-10 leaf-sway" style={{ transformOrigin: "bottom center" }}>
            <svg viewBox="0 0 200 200" fill="none"><path d="M100 10 C30 10 10 80 40 140 C70 200 160 180 170 120 C180 60 170 10 100 10Z" fill="#f73b20"/><path d="M100 10 L100 160" stroke="#f73b20" strokeWidth="2"/></svg>
          </div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 opacity-10" style={{ transform: "rotate(45deg)" }}>
            <svg viewBox="0 0 200 200" fill="none"><path d="M100 10 C30 10 10 80 40 140 C70 200 160 180 170 120 C180 60 170 10 100 10Z" fill="#fbdfd9"/></svg>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16 relative z-10">
            <div>
              <div className="eyebrow mb-3 lusion-fade d1">Get In Touch</div>
              <h2 className="text-[clamp(1.6rem,4vw,3rem)] font-black tracking-tight leading-[1.1] max-w-xl" style={{ color: "#000000" }}>
                <span className="lusion-clip d2" style={{ display: "block" }}>Accelerate your team's</span>
                <span className="lusion-clip d3" style={{ display: "block" }}>potential today.</span>
              </h2>
              <p className="text-[18px] font-medium mt-4 max-w-md lusion-fade d4" style={{ color: "#444444" }}>
                Connect with our leadership to explore high-impact consulting or talent solutions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 lusion-fade d5">
              <button onClick={() => setActiveModal("project")} className="btn-gradient" style={{ padding: "16px 44px", fontSize: 13 }}>
                Start a Project ↗
              </button>
              <button onClick={() => setActiveModal("apply")} className="ghost-aurora"
                style={{ padding: "16px 44px", color: "#000000", fontSize: 12, fontWeight: 500, letterSpacing: "1.44px", textTransform: "uppercase" }}>
                Apply Now
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* MODALS */}
      <AnimatePresence>
        {activeModal === "project" && (
          <motion.div key="modal-project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <StartProjectModal onClose={() => setActiveModal(null)} />
          </motion.div>
        )}
        {activeModal === "apply" && (
          <motion.div key="modal-apply" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <ApplyNowModal onClose={() => setActiveModal(null)} />
          </motion.div>
        )}
        {careersApplyRole && (
          <motion.div key="modal-careers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <CareersApplyModal role={careersApplyRole} onClose={() => setCareersApplyRole(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHATBOT + WHATSAPP */}
      <ChatBot />

      <CookieBanner />

      {/* FOOTER — cinematic bento */}
      <footer className="relative overflow-hidden" style={{ minHeight: "400px" }}>
        <video
          src="/Group_of_wolves_on_path_202606211412.mp4"
          autoPlay muted playsInline loop
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.48)" }} />

        <div className="relative z-10 px-6 md:px-14 py-14 md:py-20">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}>
            {/* Logo card */}
            <div style={{ background: "#fef5f3", borderRadius: 16, padding: "18px 18px" }}>
              <Logo onClick={() => scrollToSection("home")} size="footer" dark={false} />
              <p className="mt-3 text-xs leading-relaxed" style={{ color: "#666666", fontWeight: 400 }}>
                Bridging elite consulting with the next generation of tech talent.
              </p>
            </div>

            {/* Quicklinks */}
            <div style={{ background: "#fef5f3", borderRadius: 16, padding: "18px 18px" }}>
              <p className="mono text-[9px] font-medium uppercase tracking-widest mb-3" style={{ color: "#888888" }}>Quicklinks</p>
              <ul className="flex flex-col gap-2 list-none">
                {[
                  { label: "Services", dest: "services" },
                  { label: "Careers",  dest: "careers" },
                  { label: "Process",  dest: "process" },
                  { label: "Contact",  dest: "contact" },
                ].map(({ label, dest }) => (
                  <li key={label}>
                    <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(dest); }}
                      className="text-sm no-underline transition-colors" style={{ color: "#222222", fontWeight: 400 }}
                      onMouseEnter={e => e.target.style.color="#000000"}
                      onMouseLeave={e => e.target.style.color="#222222"}
                    >{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div style={{ background: "#fbdfd9", borderRadius: 16, padding: "18px 18px" }}>
              <p className="mono text-[9px] font-medium uppercase tracking-widest mb-3" style={{ color: "#888888" }}>Services</p>
              <ul className="flex flex-col gap-1.5 list-none">
                {["Tech Consulting", "Product & Strategy", "Data & Intelligence", "Startup Acceleration"].map((s) => (
                  <li key={s}>
                    <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}
                      className="text-xs no-underline transition-colors" style={{ color: "#444444" }}
                      onMouseEnter={e => e.target.style.color="#000000"}
                      onMouseLeave={e => e.target.style.color="#444444"}
                    >{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div style={{ background: "#fef5f3", borderRadius: 16, padding: "18px 18px" }}>
              <p className="mono text-[9px] font-medium uppercase tracking-widest mb-3" style={{ color: "#888888" }}>Location</p>
              <div style={{ marginBottom: 12 }}>
                <p className="text-sm font-semibold" style={{ color: "#000000", letterSpacing: "-0.02em" }}>Chennai</p>
                <p className="text-xs mt-0.5" style={{ color: "#666666" }}>India · Hybrid</p>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#000000", letterSpacing: "-0.02em" }}>United Kingdom</p>
                <p className="text-xs mt-0.5" style={{ color: "#666666" }}>Remote · Global</p>
              </div>
            </div>

            {/* Contact */}
            <div style={{ background: "#fde8eb", borderRadius: 16, padding: "18px 18px" }}>
              <p className="mono text-[9px] font-medium uppercase tracking-widest mb-3" style={{ color: "#888888" }}>Contact</p>
              <a href="mailto:11xsquarebusiness@gmail.com"
                className="text-xs no-underline block mb-4" style={{ color: "#000000", wordBreak: "break-all", lineHeight: 1.5 }}>
                11xsquarebusiness@gmail.com
              </a>
              <div className="flex gap-2">
                {["LinkedIn", "X"].map((s) => (
                  <a key={s} href="#"
                    className="mono text-[9px] no-underline px-2.5 py-1.5"
                    style={{ background: "#f73b20", color: "#ffffff", borderRadius: 8 }}
                  >{s}</a>
                ))}
              </div>
            </div>

            {/* Legal + copyright */}
            <div style={{ background: "#fef5f3", borderRadius: 16, padding: "18px 18px" }}>
              <p className="mono text-[9px] font-medium uppercase tracking-widest mb-3" style={{ color: "#888888" }}>Legal</p>
              <ul className="flex flex-col gap-1.5 list-none">
                {["Privacy Policy", "Terms & Conditions", "Cookie Policy"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-xs no-underline transition-colors" style={{ color: "#444444" }}
                      onMouseEnter={e => e.target.style.color="#000000"}
                      onMouseLeave={e => e.target.style.color="#444444"}
                    >{l}</a>
                  </li>
                ))}
              </ul>
              <p className="mono text-[9px] mt-4" style={{ color: "#888888" }}>
                © 2025 11x Square Inc.<br/>All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
