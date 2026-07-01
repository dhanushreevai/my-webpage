import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import logo from "./image/11x-logo.jpeg";

const NAV_LINKS = ["Services", "About", "Careers", "Process", "Contact"];

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
  { num: "01", title: "Discovery", desc: "We audit your stack, team, and goals to understand what's holding you back and what's possible.", color: "text-[#8052ff]" },
  { num: "02", title: "Strategy", desc: "A clear, actionable roadmap with milestones, owners, and measurable success criteria.", color: "text-[#6b3fd4]" },
  { num: "03", title: "Execution", desc: "Embedded consultants and curated talent work alongside your team to ship results.", color: "text-[#6b3fd4]" },
  { num: "04", title: "Scale", desc: "We hand off with documentation, playbooks, and a team ready to multiply the wins.", color: "text-[#a78bff]" },
];

const STATS = [
  { val: "120", unit: "+", label: "Projects Delivered", color: "text-[#a78bff]" },
  { val: "48",  unit: "+", label: "Interns Placed",     color: "text-[#E2E8F0]" },
  { val: "11",  unit: "x", label: "Average ROI",        color: "text-[#FFFFFF]" },
  { val: "32",  unit: "+", label: "Partner Companies",  color: "text-[#8052ff]" },
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
    color: "#8052ff",
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
  Engineering: { bg: "rgba(128,82,255,0.12)", text: "#8052ff" },
  Strategy:    { bg: "rgba(245,158,11,0.12)",  text: "#F59E0B" },
  Talent:      { bg: "rgba(16,185,129,0.12)",  text: "#10B981" },
  "AI & Data": { bg: "rgba(139,92,246,0.12)", text: "#8B5CF6" },
  Consulting:  { bg: "rgba(249,115,22,0.12)",  text: "#F97316" },
  Startup:     { bg: "rgba(20,184,166,0.12)",  text: "#14B8A6" },
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
      background: "#000000",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: fading ? 0 : 1,
      transition: "opacity 0.65s cubic-bezier(0.4,0,0.2,1)",
      pointerEvents: fading ? "none" : "all",
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Logo with glow */}
        <div style={{ position: "relative", marginBottom: 28 }}>
          <div style={{
            position: "absolute", inset: -16,
            borderRadius: 44,
            background: "radial-gradient(circle, rgba(128,82,255,0.35) 0%, transparent 70%)",
            filter: "blur(16px)",
          }} />
          <img
            src={logo}
            alt="11x Square"
            className="load-logo-pulse"
            style={{
              position: "relative",
              width: 96, height: 96,
              objectFit: "cover",
              borderRadius: 22,
              border: "2px solid rgba(128,82,255,0.5)",
              boxShadow: "0 0 32px rgba(128,82,255,0.25), 0 8px 32px rgba(0,0,0,0.5)",
            }}
          />
        </div>

        {/* Brand */}
        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(2rem, 6vw, 3rem)",
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          lineHeight: 1,
          marginBottom: 8,
        }}>
          11x<span style={{ color: "#8052ff" }}>Square</span>
        </div>

        <p style={{
          color: "#64748B",
          fontSize: 10,
          fontFamily: "monospace",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom: 40,
        }}>
          Consulting · Talent · Technology
        </p>

        {/* Loading bar */}
        <div style={{ width: 160, height: 2, background: "rgba(128,82,255,0.12)", borderRadius: 2, overflow: "hidden" }}>
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
    const COLORS = ["#8052ff","#a78bff","#c4b5fd","#ffb829","#15846e","#ffffff","#6b3fd4"];
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
  return <div className="fixed top-0 left-0 h-1 z-[60] transition-all duration-100" style={{ width: `${width}%`, background: "linear-gradient(90deg,#8052ff,#8052ff)" }} />;
}

function MouseSpotlight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] opacity-50" style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(128,82,255,0.07), transparent 80%)` }} />
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
      <div className="text-xs uppercase tracking-wide font-medium" style={{ color: "#9a9a9a" }}>{label}</div>
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
    indigo:  { bar: "bg-[#8052ff]", tag: "rgba(128,82,255,0.12)",  tagText: "#5b2fd4" },
    orange:  { bar: "bg-[#F97316]", tag: "rgba(249,115,22,0.10)",  tagText: "#C2410C" },
    purple:  { bar: "bg-[#8B5CF6]", tag: "rgba(139,92,246,0.10)",  tagText: "#6D28D9" },
    pink:    { bar: "bg-[#14B8A6]", tag: "rgba(20,184,166,0.10)",  tagText: "#0F766E" },
    emerald: { bar: "bg-[#10B981]", tag: "rgba(16,185,129,0.10)",  tagText: "#047857" },
    amber:   { bar: "bg-[#F59E0B]", tag: "rgba(245,158,11,0.10)",  tagText: "#B45309" },
  };
  const theme = THEMES[color] || { bar: "bg-[#8052ff]", tag: "rgba(128,82,255,0.12)", tagText: "#5b2fd4" };

  const isResting = rotation.x === 0 && rotation.y === 0;

  return (
    <div
      className="group fade-up"
      style={{ animationDelay: `${delay}s`, perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={e => { e.currentTarget.style.background = "#1a1a1a"; }}
        onMouseLeave={e => { handleMouseLeave(); e.currentTarget.style.background = "#111111"; }}
        className="relative p-8 cursor-default overflow-hidden hover:z-10"
        style={{
          transform: `translateY(${isResting ? 0 : -8}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isResting ? "transform 0.6s ease-out" : "none",
          transformStyle: "preserve-3d",
          background: "#111111",
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
          <img src={image} alt={title} className="w-full object-cover mb-6 rounded-md translate-z-10" style={{ height: "200px", objectPosition: "center top" }} />
        )}
        <div className="font-mono text-[11px] tracking-wider mb-4 translate-z-10" style={{ color: "#8052ff" }}>{num}</div>
        <h3 className="text-2xl font-black mb-4 tracking-tighter leading-none group-hover:translate-z-30 transition-transform duration-500" style={{ color: "#FFFFFF" }}>{title}</h3>
        <p className="text-[15px] font-medium leading-relaxed max-w-[280px] group-hover:translate-z-20 transition-transform duration-500" style={{ color: "#9a9a9a" }}>{desc}</p>
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
        <div className="flex gap-4 font-mono text-[11px]" style={{ color: "#8052ff" }}>
          <span>{location}</span>
          <span>{period}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-[10px] px-2.5 py-1 rounded-sm uppercase tracking-normal"
          style={type === "intern"
            ? { background: "rgba(128,82,255,0.12)", color: "#8052ff", border: "1px solid rgba(128,82,255,0.3)" }
            : { background: "rgba(251,113,133,0.08)", color: "#6b3fd4", border: "1px solid rgba(251,113,133,0.25)" }
          }
        >
          {type === "intern" ? "Intern" : "Full-time"}
        </span>
        <span className="text-2xl transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: "#8052ff" }}>
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
          11x<span style={{ color: "#6b3fd4" }}>Square</span>
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
  const colors = ["#8052ff", "#a78bff", "#7DD3FC", "#FFFFFF", "#6b3fd4", "#c4b5fd"];
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
  green:      "#8052ff",
  greenLight: "#6b3fd4",
  greenMid:   "#5b2fd4",
  brown:      "#888888",
  brownLight: "#CCCCCC",
  beige:      "#8052ff",
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
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(5,10,15,0.88)", backdropFilter: "blur(14px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-sm rounded-2xl shadow-2xl animate-fadeIn overflow-hidden"
        style={{ background: "#0D1B2E", border: "1px solid rgba(128,82,255,0.25)" }}
      >
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg,transparent,#6b3fd4,transparent)" }} />
        <div className="flex flex-col items-center gap-6 px-8 py-12 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(128,82,255,0.12)", border: "1.5px solid rgba(128,82,255,0.35)" }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="14" stroke="#6b3fd4" strokeWidth="1.5" strokeOpacity="0.5"/>
              <path d="M8 15.5l5 5 9-10" stroke="#6b3fd4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-xl font-black text-white mb-2 tracking-tight">{title}</p>
            <p className="text-sm leading-relaxed" style={{ color: "#CCCCCC" }}>{subtitle}</p>
          </div>
          <button onClick={onClose}
            className="font-bold text-sm px-10 py-3 rounded-full cursor-pointer transition-all duration-200 border-0"
            style={{ background: "#8052ff", color: "#fff" }}
            onMouseEnter={e => e.target.style.background="#6b3fd4"}
            onMouseLeave={e => e.target.style.background="#8052ff"}
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
      style={{ background: "rgba(12,35,64,0.88)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="modal-container w-full max-w-md rounded-3xl shadow-2xl animate-fadeIn relative flex flex-col"
        style={{ background: "#0D1B2E" }}
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
            style={{ background: "#8052ff", color: "#FFFFFF" }}
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
            style={{ background: "#8052ff", color: "#FFFFFF" }}
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
  border:  "rgba(128,82,255,0.25)",
  indigo:  "#8052ff",
  violet:  "#6b3fd4",
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
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${M.indigo}, ${M.violet})` }} />

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
                    onFocus={(e) => { e.target.style.border = `1.5px solid ${M.indigo}`; e.target.style.background = "rgba(128,82,255,0.12)"; }}
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

/* ── Testimonials Section ────────────────────────────────────────────────── */
function TestimonialsSection() {
  return (
    <section style={{ background: "#000000", borderTop: "1px solid rgba(128,82,255,0.12)" }}>
      <div className="px-5 md:px-12 py-14 md:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3" style={{ color: "#888888" }}>// Client Stories</p>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter leading-[1] mb-12" style={{ color: "#FFFFFF" }}>
          What our clients say
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl flex flex-col gap-5 transition-all duration-300"
              style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={e => e.currentTarget.style.background="#1a1a1a"}
              onMouseLeave={e => e.currentTarget.style.background="#111111"}
            >
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <span key={s} style={{ color: "#F59E0B", fontSize: "16px" }}>★</span>
                ))}
              </div>
              <p className="text-[15px] leading-relaxed font-medium flex-1" style={{ color: "#9a9a9a" }}>
                "{t.quote}"
              </p>
              <div>
                <p className="font-bold text-sm" style={{ color: "#FFFFFF" }}>{t.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "#8052ff" }}>{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Scroll Reveal Hook ───────────────────────────────────────────────────── */
function useScrollReveal(dep) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); observer.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [dep]);
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div className="relative w-full max-w-md rounded-2xl p-8 text-center" style={{ background: "#0D1117", border: "1px solid rgba(128,82,255,0.3)", boxShadow: "0 0 60px rgba(128,82,255,0.15)" }}>
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-xl bg-transparent border-0 cursor-pointer" style={{ color: "#9a9a9a" }}>✕</button>
        <div className="text-4xl mb-4">🎯</div>
        <p className="font-mono text-[11px] uppercase tracking-widest mb-2" style={{ color: "#8052ff" }}>Wait — before you go!</p>
        <h3 className="text-2xl font-black tracking-tighter mb-3" style={{ color: "#FFFFFF" }}>Get a FREE 30-min Strategy Session</h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "#9a9a9a" }}>No commitment. Just clarity on what's possible for your business. Our consultants have helped 120+ companies unlock breakthrough growth.</p>
        <button
          onClick={() => { setShow(false); onContact(); }}
          className="w-full font-bold text-base py-3 rounded-xl transition-all duration-200 cursor-pointer"
          style={{ background: "linear-gradient(135deg,#8052ff,#6b3fd4)", color: "#FFFFFF", border: "none" }}
          onMouseEnter={e => e.target.style.opacity="0.9"}
          onMouseLeave={e => e.target.style.opacity="1"}
        >
          Claim Free Session →
        </button>
        <button onClick={() => setShow(false)} className="mt-3 text-xs bg-transparent border-0 cursor-pointer underline" style={{ color: "#64748B" }}>No thanks, I'll pass</button>
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
    <div className="fixed bottom-0 left-0 right-0 z-[9998] px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: "rgba(13,17,23,0.97)", borderTop: "1px solid rgba(128,82,255,0.2)", backdropFilter: "blur(12px)" }}>
      <p className="text-sm text-center sm:text-left" style={{ color: "#9a9a9a" }}>
        🍪 We use cookies to improve your experience on 11xsquare.com. <span style={{ color: "#64748B" }}>By continuing, you agree to our cookie policy.</span>
      </p>
      <div className="flex gap-3 flex-shrink-0">
        <button onClick={decline} className="text-sm font-bold px-5 py-2 rounded-full cursor-pointer transition-all" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#9a9a9a" }}>Decline</button>
        <button onClick={accept} className="text-sm font-bold px-5 py-2 rounded-full cursor-pointer transition-all" style={{ background: "#8052ff", color: "#FFFFFF", border: "none" }}>Accept All</button>
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
    <section className="px-5 md:px-12 py-16 md:py-20 scroll-reveal" style={{ background: "#000000", borderTop: "1px solid rgba(128,82,255,0.12)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3" style={{ color: "#8052ff" }}>// FAQ</p>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter leading-[1] mb-10" style={{ color: "#FFFFFF" }}>Common questions</h2>
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="rounded-xl overflow-hidden transition-all duration-300" style={{ background: open === i ? "#111111" : "rgba(17,24,39,0.6)", border: `1px solid ${open === i ? "rgba(128,82,255,0.3)" : "rgba(255,255,255,0.07)"}` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-transparent border-0 cursor-pointer gap-4"
              >
                <span className="font-bold text-base" style={{ color: "#FFFFFF" }}>{item.q}</span>
                <span className="flex-shrink-0 text-xl font-light transition-transform duration-300" style={{ color: "#8052ff", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed" style={{ color: "#9a9a9a" }}>{item.a}</p>
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

  const C = { bg: "#0D1B2E", header: "#102040", accent: "#8052ff", moss: "#c4b5fd", text: "#FFFFFF", muted: "#AAAAAA" };

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
            color: "#FFFFFF",
            fontSize: "12px",
            fontWeight: 600,
            padding: "6px 12px",
            borderRadius: "8px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.2s",
            border: "1px solid rgba(255,255,255,0.1)",
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
          style={{ width: 340, height: 480, background: C.bg, border: "1px solid rgba(128,82,255,0.2)" }}
        >
          {/* header */}
          <div className="px-5 py-4 flex items-center justify-between shrink-0" style={{ background: C.header, borderBottom: "1px solid rgba(128,82,255,0.2)" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#8052ff" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.02 2 11c0 2.4.96 4.6 2.54 6.24L3 21l4.1-1.3A10.1 10.1 0 0012 20c5.52 0 10-4.02 10-9S17.52 2 12 2Z" fill="#8052ff" stroke="#8052ff" strokeWidth="1.5"/>
                  <circle cx="8.5" cy="11" r="1.1" fill="#8052ff"/><circle cx="12" cy="11" r="1.1" fill="#8052ff"/><circle cx="15.5" cy="11" r="1.1" fill="#8052ff"/>
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
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs mr-2 shrink-0 mt-0.5" style={{ background: "#8052ff", color: "#fff", fontWeight: 700, fontSize: 10 }}>11x</div>
                )}
                <div className="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
                  style={msg.from === "user"
                    ? { background: "linear-gradient(135deg,#8052ff,#6b3fd4)", color: "#fff", borderBottomRightRadius: 4 }
                    : { background: "rgba(128,82,255,0.12)", color: C.text, borderBottomLeftRadius: 4, border: "1px solid rgba(128,82,255,0.2)" }
                  }
                >{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0" style={{ background: "#8052ff", color: "#fff", fontWeight: 700, fontSize: 10 }}>11x</div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1" style={{ background: "rgba(128,82,255,0.12)", border: "1px solid rgba(128,82,255,0.2)" }}>
                  {[0,1,2].map((j) => <span key={j} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: C.moss, animationDelay: `${j*0.15}s` }} />)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* quick reply chips */}
          <div className="px-4 pt-2.5 pb-1.5 flex flex-wrap gap-1.5 shrink-0" style={{ borderTop: "1px solid rgba(128,82,255,0.08)" }}>
            {["Services", "Careers", "Pricing", "Contact Us"].map((label) => (
              <button
                key={label}
                onClick={() => sendMessage(label)}
                disabled={isTyping}
                className="text-xs px-3 py-1 rounded-full cursor-pointer border-0 transition-all duration-150 disabled:opacity-40"
                style={{ background: "rgba(128,82,255,0.10)", color: "#a78bff", border: "1px solid rgba(128,82,255,0.22)", fontWeight: 600 }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(128,82,255,0.22)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(128,82,255,0.10)"; }}
              >{label}</button>
            ))}
          </div>

          {/* input */}
          <div className="px-4 py-3 shrink-0 flex gap-2" style={{ borderTop: "1px solid rgba(128,82,255,0.12)" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Type a message…"
              className="nature-input flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{ background: "rgba(128,82,255,0.08)", border: "1.5px solid rgba(128,82,255,0.25)", color: C.text, fontWeight: 500 }}
            />
            <button onClick={sendMessage} disabled={!input.trim()} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 border-0 shrink-0"
              style={{ background: "linear-gradient(135deg,#8052ff,#6b3fd4)" }}
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
        style={{ background: "linear-gradient(135deg, #8052ff, #6b3fd4)", border: "1px solid rgba(128,82,255,0.4)" }}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="#8052ff" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.02 2 11c0 2.4.96 4.6 2.54 6.24L3 21l4.1-1.3A10.1 10.1 0 0012 20c5.52 0 10-4.02 10-9S17.52 2 12 2Z" fill="#8052ff" stroke="#8052ff" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="8.5" cy="11" r="1.2" fill="#8052ff"/>
            <circle cx="12" cy="11" r="1.2" fill="#8052ff"/>
            <circle cx="15.5" cy="11" r="1.2" fill="#8052ff"/>
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
    <section style={{ background: "#0D1117", borderTop: "1px solid rgba(128,82,255,0.15)", borderBottom: "1px solid rgba(128,82,255,0.15)" }}>
      <div className="px-5 md:px-12 py-12 md:py-16">
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3" style={{ color: "#8052ff" }}>// Stay Informed</p>
          <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-black tracking-tighter mb-3" style={{ color: "#FFFFFF" }}>
            Insights delivered to your inbox
          </h2>
          <p className="text-sm font-medium mb-8" style={{ color: "#9a9a9a" }}>
            Strategy, engineering, and talent — one newsletter, no noise.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl" style={{ background: "rgba(128,82,255,0.12)", border: "1px solid rgba(128,82,255,0.3)" }}>
              <span style={{ color: "#8052ff", fontSize: "20px" }}>✓</span>
              <p className="font-bold text-sm" style={{ color: "#8052ff" }}>{message}</p>
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
                  background: "rgba(255,255,255,0.06)",
                  border: "1.5px solid rgba(128,82,255,0.25)",
                  borderRadius: "12px",
                  color: "#FFFFFF",
                  padding: "12px 18px",
                  fontSize: "14px",
                  fontWeight: 500,
                  outline: "none",
                  transition: "border 0.2s, background 0.2s",
                }}
                onFocus={e => { e.target.style.border = "1.5px solid #8052ff"; e.target.style.background = "rgba(128,82,255,0.1)"; }}
                onBlur={e => { e.target.style.border = "1.5px solid rgba(128,82,255,0.25)"; e.target.style.background = "rgba(255,255,255,0.06)"; }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  background: "#8052ff",
                  color: "#FFFFFF",
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
                onMouseEnter={e => { e.target.style.background = "#6b3fd4"; }}
                onMouseLeave={e => { e.target.style.background = "#8052ff"; }}
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
      style={{ background: status.available ? "rgba(128,82,255,0.10)" : "rgba(255,255,255,0.05)", border: `1px solid ${status.available ? "rgba(128,82,255,0.30)" : "rgba(255,255,255,0.10)"}` }}
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
  useScrollReveal(view);

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

  const navigateTo = (v) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: "#000000", color: "#ffffff" }}>
      <LoadingScreen />
      <MouseSpotlight />

      {/* Floating Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse" style={{ background: "rgba(128,82,255,0.12)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse" style={{ background: "rgba(107,63,212,0.10)", animationDelay: "2s" }} />
        <div className="absolute top-[50%] left-[60%] w-[25%] h-[25%] rounded-full blur-[100px] animate-pulse" style={{ background: "rgba(128,82,255,0.08)", animationDelay: "4s" }} />
      </div>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 py-3"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: scrolled ? "rgba(0,0,0,0.98)" : "rgba(0,0,0,0.70)",
          boxShadow: scrolled ? "0 1px 24px rgba(128,82,255,0.15)" : "none",
          transform: navHidden ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s, box-shadow 0.3s",
        }}
      >
        <Logo onClick={() => navigateTo("Home")} dark={false} />

        <ul className="hidden md:flex gap-7 list-none">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                onClick={() => navigateTo(l)}
                className="text-[13px] font-bold tracking-tight transition-all duration-200 bg-transparent border-0 cursor-pointer"
                style={{ color: view === l ? "#8052ff" : "#9a9a9a" }}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigateTo("Contact")}
          className="hidden md:block text-[14px] font-bold px-6 py-2.5 rounded-full transition-all duration-200"
          style={{ background: "#8052ff", color: "#FFFFFF" }}
          onMouseEnter={e => { e.target.style.background = "#5b2fd4"; }}
          onMouseLeave={e => { e.target.style.background = "#8052ff"; }}
        >
          Get Started
        </button>

        <button
          className="md:hidden bg-transparent border-0 cursor-pointer text-2xl"
          style={{ color: "#8052ff" }}
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
        <div id="mobile-menu" className="fixed inset-0 z-40 backdrop-blur-xl flex flex-col items-center justify-center gap-8" style={{ background: "rgba(0,0,0,0.98)" }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => navigateTo(l)}
              className="text-2xl font-bold transition-colors duration-200 bg-transparent border-0 cursor-pointer"
              style={{ color: "#9a9a9a" }}
              onMouseEnter={e => e.target.style.color="#8052ff"}
              onMouseLeave={e => e.target.style.color="#9a9a9a"}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      <main key={view} className="page-transition">
      {view === "Home" && (
        <>
        <section id="home" className="relative flex flex-col justify-center px-5 md:px-12 pt-20 pb-10 md:pt-28 md:pb-12 overflow-hidden z-10" style={{ minHeight: "100svh" }}>
        <video
          src="/wolf_howling_in_moon_202606211229.mp4"
          autoPlay muted playsInline loop
          style={{ position: "absolute", top: "50%", left: "50%", minWidth: "100%", minHeight: "100%", width: "auto", height: "auto", transform: "translate(-50%,-50%)", objectFit: "cover", objectPosition: "center 30%", opacity: 0.75 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,11,18,0.60) 0%, rgba(13,24,38,0.30) 40%, rgba(8,11,18,0.65) 100%)" }} />
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">

          <div className="flex-1 min-w-0">
            <p className="mono text-[11px] font-bold uppercase tracking-[0.15em] mb-7 flex items-center gap-3 fade-up d1" style={{ color: "#9a9a9a" }}>
              <span className="block w-12 h-[1px]" style={{ background: "#9a9a9a" }} />
              Consulting · Talent · Technology
            </p>

            <h1 className="text-[clamp(2rem,7vw,6.5rem)] display-headline mb-6 md:mb-10 fade-up d2" style={{ color: "#ffffff" }}>
              Scale your
              <br />
              <span style={{ color: "#8052ff" }}>
                <TypingText words={["ambition", "vision", "growth", "impact"]} />
              </span>
              <br />
              with <span style={{ color: "#ffffff" }}>11x Square</span>
            </h1>

            <p className="text-[clamp(1rem,1.6vw,1.2rem)] font-medium leading-[1.6] max-w-xl mb-10 fade-up d3" style={{ color: "#9a9a9a" }}>
              Bridging the gap between elite engineering and strategic growth with a platform-first approach.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center fade-up d4">
              <MagneticButton
                onClick={() => navigateTo("Services")}
                className="font-semibold text-[13px] uppercase tracking-[0.05em] px-9 py-4 rounded-[24px] transition-all duration-200 text-center"
                style={{ background: "#8052ff", color: "#ffffff" }}
              >
                Start Building
              </MagneticButton>
              <MagneticButton
                onClick={() => navigateTo("Careers")}
                className="font-bold text-[15px] px-9 py-4 rounded-full shadow-sm transition-all duration-200 text-center"
                style={{ background: "transparent", border: "1.5px solid rgba(128,82,255,0.6)", color: "#8052ff" }}
              >
                Explore Roles
              </MagneticButton>
            </div>

            <div ref={statsRef} className="mt-8 md:mt-10 pt-7 md:pt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-10 fade-up d5" style={{ borderTop: "1px solid rgba(128,82,255,0.15)" }}>
              {STATS.map((s) => (
                <StatCard key={s.label} {...s} animate={statsVisible} />
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-shrink-0 items-center justify-center fade-up d3">
            <img
              src={logo}
              alt="11x Square"
              className="object-cover"
              style={{ width: 320, height: 320, borderRadius: 40, border: "1px solid rgba(128,82,255,0.35)" }}
            />
          </div>

        </div>
        </section>

        {/* MARQUEE */}
        <div className="py-4 overflow-hidden z-20 relative" style={{ background: "#060606", borderTop: "1px solid rgba(128,82,255,0.2)", borderBottom: "1px solid rgba(128,82,255,0.2)" }}>
          <div className="marquee-track flex gap-14 w-max">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="mono text-[12px] font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-4" style={{ color: "#8052ff" }}>
                {item}
                <span className="text-[10px]" style={{ color: "#6b3fd4" }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        </>
      )}

      {view === "Services" && (
        <section id="services" className="scroll-reveal px-5 md:px-12 py-14 md:py-20" style={{ background: "#000000" }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 fade-up d1">
          <div className="fade-up d2">
            <p className="mono text-[11px] uppercase tracking-[0.18em] mb-4 fade-up d3" style={{ color: "#888888" }}>// Our Solutions</p>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter leading-[0.9] fade-up d4" style={{ color: "#FFFFFF" }}>
              Consulting for the<br />bold & ambitious
            </h2>
          </div>
          <p className="text-lg md:text-xl font-medium leading-relaxed max-w-md fade-up d5" style={{ color: "#9a9a9a" }}>
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

      {/* ABOUT VIEW */}
      {view === "About" && (
        <section id="about" className="px-5 md:px-12 py-14 md:py-20" style={{ background: "#000000" }}>
          {/* Case Studies */}
          <div className="mb-20 fade-up d2">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3" style={{ color: "#888888" }}>// Impact</p>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-black tracking-tighter leading-[1] mb-12" style={{ color: "#FFFFFF" }}>
              Case studies
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {CASE_STUDIES.map((cs, i) => (
                <div
                  key={i}
                  className="p-7 rounded-2xl flex flex-col gap-5 transition-all duration-300"
                  style={{ background: "#111111", border: `1px solid rgba(255,255,255,0.07)`, borderTop: `3px solid ${cs.color}` }}
                  onMouseEnter={e => e.currentTarget.style.background="#1a1a1a"}
                  onMouseLeave={e => e.currentTarget.style.background="#111111"}
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: `${cs.color}18`, color: cs.color }}>{cs.industry}</span>
                    <h3 className="font-black text-xl mt-3" style={{ color: "#FFFFFF" }}>{cs.client}</h3>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: "#9a9a9a" }}>Challenge</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#9a9a9a" }}>{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: "#9a9a9a" }}>Solution</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#9a9a9a" }}>{cs.solution}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    {cs.metrics.map((m, j) => (
                      <span key={j} className="font-mono text-[11px] font-bold px-3 py-1.5 rounded-lg" style={{ background: `${cs.color}18`, color: cs.color }}>{m}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials reused */}
          <TestimonialsSection />
        </section>
      )}

      {view === "Careers" && (
        <section id="careers" className="relative px-5 md:px-12 py-14 md:py-20 overflow-hidden" style={{ height: "100svh" }}>
          <video
            src="/Group_of_wolves_on_path_202606211412.mp4"
            autoPlay muted playsInline loop
            style={{ position: "absolute", top: "50%", left: "50%", minWidth: "100%", minHeight: "100%", width: "auto", height: "auto", transform: "translate(-50%,-50%)", objectFit: "cover", objectPosition: "center center", opacity: 0.75 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,11,18,0.65) 0%, rgba(8,11,18,0.35) 50%, rgba(0,0,0,0.70) 100%)" }} />

        <div className="relative z-10 h-full overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start" style={{ maxHeight: "calc(100svh - 8rem)" }}>
          <div className="fade-up d1">
            <p className="mono text-[11px] uppercase tracking-[0.18em] mb-4 fade-up d2" style={{ color: "#888888" }}>// Careers</p>
            <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tighter leading-[1] mb-6 fade-up d3" style={{ color: "#FFFFFF" }}>
              Find your next<br />challenge at <span style={{ color: "#8052ff" }}>11x</span>
            </h2>
            <p className="text-lg font-medium leading-relaxed mb-10 max-w-md fade-up d4" style={{ color: "#9a9a9a" }}>
              Whether you're a seasoned consultant or a fresh grad ready to make your mark — we have a seat for you.
            </p>

            <div className="p-7 rounded-xl shadow-sm fade-up d5" style={{ background: "rgba(17,24,39,0.80)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(128,82,255,0.25)" }}>
              <p className="mono text-[10px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#8052ff" }}>Intern Program Highlights</p>
              <ul className="flex flex-col gap-3">
                {[
                  "3-month structured cohort program",
                  "Real client projects from day one",
                  "Mentorship from senior consultants",
                  "Full-time conversion for top performers",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-medium" style={{ color: "#888888" }}>
                    <span className="flex-shrink-0 text-xl" style={{ color: "#6b3fd4" }}>→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col fade-up d6 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(128,82,255,0.20)" }}>
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
          <video
            src="/Wolf_mouth_fire_video_202606211302.mp4"
            autoPlay muted playsInline loop
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center center", opacity: 0.80 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,11,18,0.65) 0%, rgba(8,11,18,0.30) 50%, rgba(0,0,0,0.70) 100%)" }} />

          <div className="relative z-10">
            <p className="mono text-[11px] uppercase tracking-[0.18em] mb-3 fade-up d1" style={{ color: "#9a9a9a" }}>// The Process</p>
            <h2 className="text-[clamp(1.5rem,5vw,4rem)] font-black tracking-tighter leading-[1.05] mb-6 md:mb-14 max-w-xl fade-up d2"
              style={{ color: "#FFFFFF", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,1)" }}>
              From discovery<br />to results in weeks
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden fade-up d3" style={{ border: "1px solid rgba(128,82,255,0.25)" }}>
              {STEPS.map((s, i) => (
                <div
                  key={s.num}
                  style={{
                    animationDelay: `${0.1 * i}s`,
                    background: "rgba(8,11,18,0.82)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderRight: i < STEPS.length - 1 ? "1px solid rgba(128,82,255,0.2)" : undefined,
                    borderBottom: "1px solid rgba(128,82,255,0.15)",
                  }}
                  className="p-5 sm:p-6 lg:p-8 relative group transition-all duration-500"
                  onMouseEnter={e => e.currentTarget.style.background="rgba(30,41,59,0.88)"}
                  onMouseLeave={e => e.currentTarget.style.background="rgba(8,11,18,0.82)"}
                >
                  <div className="text-[40px] sm:text-[56px] lg:text-[72px] font-black leading-none mb-3 tracking-tighter" style={{ color: "rgba(128,82,255,0.30)" }}>
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
        <section id="contact" className="scroll-reveal px-5 md:px-12 py-16 md:py-24 relative overflow-hidden" style={{ background: "#000000" }}>
          <div className="absolute -top-10 -right-10 w-64 h-64 opacity-10 leaf-sway" style={{ transformOrigin: "bottom center" }}>
            <svg viewBox="0 0 200 200" fill="none"><path d="M100 10 C30 10 10 80 40 140 C70 200 160 180 170 120 C180 60 170 10 100 10Z" fill="white"/><path d="M100 10 L100 160" stroke="white" strokeWidth="2"/></svg>
          </div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 opacity-10" style={{ transform: "rotate(45deg)" }}>
            <svg viewBox="0 0 200 200" fill="none"><path d="M100 10 C30 10 10 80 40 140 C70 200 160 180 170 120 C180 60 170 10 100 10Z" fill="white"/></svg>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16 fade-up d2 relative z-10">
          <div className="fade-up d3">
            <p className="mono text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "#8052ff" }}>// Get In Touch</p>
            <h2 className="text-[clamp(1.6rem,4vw,3rem)] font-black tracking-tight leading-[1.1] max-w-xl fade-up d4" style={{ color: "#FFFFFF" }}>
              Accelerate your team's potential today.
            </h2>
            <p className="text-[18px] font-medium mt-4 max-w-md fade-up d5" style={{ color: "#9a9a9a" }}>
              Connect with our leadership to explore high-impact consulting or talent solutions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 fade-up d6">
            <button
              onClick={() => setActiveModal("project")}
              className="font-bold text-lg px-12 py-5 rounded-xl transition-all duration-200 cursor-pointer"
              style={{ background: "#8052ff", color: "#FFFFFF" }}
              onMouseEnter={e => e.target.style.background="#5b2fd4"}
              onMouseLeave={e => e.target.style.background="#8052ff"}
            >
              Start a Project
            </button>
            <button
              onClick={() => setActiveModal("apply")}
              className="font-bold text-lg px-12 py-5 rounded-xl transition-all duration-200 cursor-pointer"
              style={{ background: "transparent", color: "#6b3fd4", border: "2px solid rgba(128,82,255,0.5)" }}
              onMouseEnter={e => { e.target.style.background="rgba(128,82,255,0.08)"; }}
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

      {/* CHATBOT + WHATSAPP */}
      <ChatBot />

      <CookieBanner />

      {/* FOOTER */}
      <footer className="px-5 md:px-12 pt-10 pb-8 md:pt-14 md:pb-10 fade-up d1" style={{ background: "#0D1117", borderTop: "1px solid rgba(128,82,255,0.2)" }}>
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16 mb-8 md:mb-10 fade-up d2">
          <div className="max-w-xs fade-up d3">
            <Logo onClick={() => navigateTo("Home")} className="mb-4" size="footer" dark={false} />
            <p className="text-sm leading-relaxed" style={{ color: "#9a9a9a" }}>
              Bridging elite consulting with the next generation of tech talent.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 sm:gap-16 fade-up d4">
            {[
              { heading: "Company", links: [
                  { label: "About",    dest: "About" },
                  { label: "Services", dest: "Services" },
                  { label: "Process",  dest: "Process" },
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
                <h5 className="mono text-[10px] font-bold uppercase tracking-[0.18em] mb-5" style={{ color: "#8052ff" }}>{col.heading}</h5>
                <ul className="flex flex-col gap-1.5 list-none">
                  {col.links.map(({ label, dest }) => (
                    <li key={label}>
                      <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(dest); }}
                        className="text-sm transition-colors duration-200 no-underline" style={{ color: "#9a9a9a" }}
                        onMouseEnter={e => e.target.style.color="#8052ff"}
                        onMouseLeave={e => e.target.style.color="#9a9a9a"}
                      >{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(128,82,255,0.2)" }}>
          <p className="mono text-[11px]" style={{ color: "#9a9a9a" }}>
            © 2025 <span style={{ color: "#8052ff" }}>11x Square</span>. All rights reserved.
          </p>
          <p className="mono text-[11px]" style={{ color: "#9a9a9a" }}>✦ Built for the bold.</p>
        </div>
      </footer>
    </div>
  );
}
