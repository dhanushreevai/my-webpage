import { useState, useEffect, useRef } from "react";
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
  { num: "01", title: "Discovery", desc: "We audit your stack, team, and goals to understand what's holding you back and what's possible.", color: "text-indigo-500" },
  { num: "02", title: "Strategy", desc: "A clear, actionable roadmap with milestones, owners, and measurable success criteria.", color: "text-amber-500" },
  { num: "03", title: "Execution", desc: "Embedded consultants and curated talent work alongside your team to ship results.", color: "text-emerald-500" },
  { num: "04", title: "Scale", desc: "We hand off with documentation, playbooks, and a team ready to multiply the wins.", color: "text-pink-500" },
];

const STATS = [
  { val: "120", unit: "+", label: "Projects Delivered", color: "text-indigo-600" },
  { val: "48", unit: "+", label: "Interns Placed", color: "text-emerald-600" },
  { val: "11", unit: "x", label: "Average ROI", color: "text-orange-600" },
  { val: "32", unit: "+", label: "Partner Companies", color: "text-purple-600" },
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

function MagneticButton({ children, className = "", onClick }) {
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
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)`, transition: position.x === 0 ? "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)" : "none" }}
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
  return <div className="fixed top-0 left-0 h-1 bg-[oklch(60%_0.25_295)] z-[60] transition-all duration-100" style={{ width: `${width}%` }} />;
}

function MouseSpotlight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] opacity-50" style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(oklch(60% 0.25 295) / 0.08), transparent 80%)` }} />
  );
}

function StatCard({ val, unit, label, animate, color, delay }) {
  const num = useCountUp(val, 1200, animate);
  return (
    <div className="flex flex-col gap-1">
      <div className={`text-4xl font-black tracking-tight leading-none ${color || "text-zinc-900"}`}>
        {animate ? num : val}
        <span className={color ? "opacity-60" : "text-[oklch(60%_0.25_295)]"}>{unit}</span>
      </div>
      <div className="text-xs text-zinc-500 uppercase tracking-wide font-medium">{label}</div>
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
    indigo: { bg: "hover:bg-indigo-50/50", border: "group-hover:border-indigo-200", bar: "bg-indigo-500", tag: "bg-indigo-100/60 text-indigo-700" },
    orange: { bg: "hover:bg-orange-50/50", border: "group-hover:border-orange-200", bar: "bg-orange-500", tag: "bg-orange-100/60 text-orange-700" },
    purple: { bg: "hover:bg-purple-50/50", border: "group-hover:border-purple-200", bar: "bg-purple-500", tag: "bg-purple-100/60 text-purple-700" },
    pink: { bg: "hover:bg-pink-50/50", border: "group-hover:border-pink-200", bar: "bg-pink-500", tag: "bg-pink-100/60 text-pink-700" },
    emerald: { bg: "hover:bg-emerald-50/50", border: "group-hover:border-emerald-200", bar: "bg-emerald-500", tag: "bg-emerald-100/60 text-emerald-700" },
    amber: { bg: "hover:bg-amber-50/50", border: "group-hover:border-amber-200", bar: "bg-amber-500", tag: "bg-amber-100/60 text-amber-700" },
  };
  const theme = THEMES[color] || { bar: "bg-black", tag: "bg-zinc-100 text-zinc-600" };

  return (
    <div
      className={`perspective-1000 group fade-up`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translateY(${rotation.x === 0 ? 0 : -8}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: rotation.x === 0 && rotation.y === 0 ? "transform 0.6s ease-out, box-shadow 0.6s ease" : "box-shadow 0.6s ease"
        }}
        className={`relative bg-white border-b border-r border-zinc-200 p-8 cursor-default overflow-hidden 
                      transform-style-3d hover:shadow-premium hover:z-10 hover:border-transparent ${theme.border}`}
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
        <div className="font-mono text-[11px] text-zinc-400 tracking-wider mb-4 translate-z-10">{num}</div>
        <h3 className="text-2xl font-black mb-4 tracking-tighter text-zinc-900 leading-none group-hover:translate-z-30 transition-transform duration-500">{title}</h3>
        <p className="text-[15px] text-zinc-500 font-medium leading-relaxed max-w-[280px] group-hover:translate-z-20 transition-transform duration-500">{desc}</p>
        <div className="flex flex-wrap gap-2 mt-5 group-hover:translate-z-10 transition-transform duration-500">
          {tags.map((t, i) => (
            <span key={i} className={`font-mono text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-bold ${theme.tag}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoleItem({ title, type, location, period, delay }) {
  return (
    <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-zinc-200 transition-all duration-300 cursor-pointer
                group hover:bg-zinc-50"
    >
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-bold text-zinc-900">{title}</span>
        <div className="flex gap-4 font-mono text-[11px] text-zinc-400">
          <span>{location}</span>
          <span>{period}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`font-mono text-[10px] px-2.5 py-1 rounded-sm uppercase tracking-normal ${
            type === "intern"
              ? "bg-[oklch(60%_0.25_295_/_0.1)] text-[oklch(60%_0.25_295)] border border-[oklch(60%_0.25_295_/_0.2)]"
              : "bg-zinc-100 text-zinc-600 border border-zinc-200"
          }`}
          style={{ animationDelay: `${delay}s` }}
        >
          {type === "intern" ? "Intern" : "Full-time"}
        </span>
        <span
          className="text-zinc-400 text-2xl transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[oklch(60%_0.25_295)]"
        >
          ↗
        </span>
      </div>
    </div>
  );
}

function Logo({ onClick, className = "" }) {
  return (
    <div 
      onClick={onClick} 
      className={`flex items-center gap-2 cursor-pointer transition-all duration-300 hover:opacity-80 active:scale-95 ${className}`}
    >
      {/* Invert(1) turns the black background of the JPEG logo into white for the light theme */}
      <img src={logo} alt="11x Logo Icon" className="h-20 w-auto filter invert" />
      <span className="hidden sm:block text-2xl font-black tracking-tighter text-zinc-900">
        11x<span className="text-[oklch(60%_0.25_295)]">Square</span>
      </span>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
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
    <div className="bg-white text-zinc-900 min-h-screen font-sans overflow-x-hidden mobile-smooth">
      <ScrollProgress />
      <MouseSpotlight />
      
      {/* Floating Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-50/40 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-50/40 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-3 transition-all duration-300 ${
          scrolled ? "backdrop-blur-xl bg-white/80 border-b border-zinc-200" : "bg-transparent"
        } border-x border-zinc-200/50 mx-auto max-w-[1440px]`}
      >
        <Logo onClick={() => navigateTo("Home")} />

        <ul className="hidden md:flex gap-9 list-none">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                onClick={() => navigateTo(l)}
                className={`text-zinc-900 hover:text-zinc-500 text-[14px] font-bold tracking-tight transition-all duration-200 bg-transparent border-0 cursor-pointer ${view === l ? "text-[oklch(60%_0.25_295)]" : ""}`}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigateTo("Contact")}
          className="hidden md:block bg-black text-white text-[14px] font-bold px-6 py-2.5 rounded-full transition-all duration-200 hover:bg-zinc-800"
        >
          Get Started
        </button>

        <button
          className="md:hidden bg-transparent border-0 cursor-pointer text-zinc-900 text-2xl"
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
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => navigateTo(l)}
              className="text-2xl font-bold text-zinc-900 hover:text-[oklch(60%_0.25_295)] transition-colors duration-200 bg-transparent border-0 cursor-pointer"
            >
              {l}
            </button>
          ))}
        </div>
      )}

      <main key={view} className="page-transition">
      {view === "Home" && (
        <>
        <section id="home" className="relative min-h-screen flex flex-col justify-center px-8 md:px-12 pt-28 pb-12 overflow-hidden border-x border-zinc-200 mx-auto max-w-[1440px] z-10">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

        <p className="mono text-[11px] text-zinc-900 font-bold uppercase tracking-[0.15em] mb-7 flex items-center gap-3 fade-up d1">
          <span className="block w-12 h-[2px] bg-[oklch(60%_0.25_295)]" />
          Consulting · Talent · Technology
        </p>

        <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.85] tracking-[-0.06em] max-w-6xl mb-12 fade-up d2 text-zinc-900">
          Scale your
          <br />
          <span className="text-stroke hover:text-zinc-900 transition-all duration-700 cursor-default inline-block">ambition</span>
          <br />
          with <span className="text-[oklch(60%_0.25_295)]">11x Square</span>
        </h1>
 
        <p className="text-zinc-600 text-[clamp(1rem,2vw,1.3rem)] font-medium leading-[1.5] max-w-2xl mb-14 fade-up d3">
          Bridging the gap between elite engineering and strategic growth with a platform-first approach.
        </p>
 
        <div className="flex flex-wrap gap-4 items-center fade-up d4">
          <MagneticButton 
            onClick={() => navigateTo("Services")} 
            className="bg-black text-white font-bold text-[clamp(14px,1.5vw,16px)] px-10 py-4 rounded-full shadow-xl transition-all duration-200 hover:bg-zinc-800"
          >
            Start Building
          </MagneticButton>
          <MagneticButton 
            onClick={() => navigateTo("Careers")} 
            className="bg-white border border-zinc-200 text-zinc-900 font-bold text-[clamp(14px,1.5vw,16px)] px-10 py-4 rounded-full shadow-sm hover:bg-zinc-50"
          >
            Explore Roles
          </MagneticButton>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-12 pt-8 border-t border-zinc-200 flex flex-wrap gap-12 fade-up d5">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} animate={statsVisible} />
          ))}
        </div>
        </section>

        {/* MARQUEE - Now part of Home View only */}
        <div className="border-t border-b border-zinc-200 bg-white py-4 overflow-hidden z-20 relative">
          <div className="marquee-track flex gap-14 w-max">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="mono text-[12px] font-bold text-zinc-900 uppercase tracking-wider whitespace-nowrap flex items-center gap-4">
                {item}
                <span className="text-[oklch(60%_0.25_295)] text-[10px]">●</span>
              </span>
            ))}
          </div>
        </div>
        </>
      )}

      {view === "Services" && (
        <section id="services" className="bg-white px-8 md:px-12 py-20 border-x border-zinc-200 mx-auto max-w-[1440px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 fade-up d1">
          <div className="fade-up d2">
            <p className="mono text-[11px] text-zinc-400 uppercase tracking-[0.18em] mb-4 fade-up d3">// Our Solutions</p>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter leading-[0.9] text-zinc-900 fade-up d4">
              Consulting for the<br />bold & ambitious
            </h2>
          </div>
          <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-md fade-up d5">
            Platform-driven consulting that solves deep engineering and product problems in record time.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-zinc-200 fade-up d6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} {...s} delay={0.1 * i} />
          ))}
        </div>
        </section>
      )}

      {view === "Careers" && (
        <section id="careers" className="bg-zinc-50 px-8 md:px-12 py-20 border-t border-x border-zinc-200 mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div className="fade-up d1">
            <p className="mono text-[11px] text-zinc-400 uppercase tracking-[0.18em] mb-4 fade-up d2">// Careers</p>
            <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tighter leading-[1] mb-6 text-zinc-900 fade-up d3">
              Find your next<br />challenge at <span className="text-[oklch(60%_0.25_295)]">11x</span>
            </h2>
            <p className="text-zinc-900 text-lg font-medium leading-relaxed mb-10 max-w-md fade-up d4">
              Whether you're a seasoned consultant or a fresh grad ready to make your mark — we have a seat for you.
            </p>

            <div className="bg-white border border-zinc-200 p-7 rounded-sm shadow-sm fade-up d5">
              <p className="mono text-[10px] text-zinc-900 font-bold uppercase tracking-[0.15em] mb-4">Intern Program Highlights</p>
              <ul className="flex flex-col gap-3">
                {[
                  "3-month structured cohort program",
                  "Real client projects from day one",
                  "Mentorship from senior consultants",
                  "Full-time conversion for top performers",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-medium text-zinc-600">
                    <span className="text-[oklch(60%_0.25_295)] flex-shrink-0 text-xl">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col border-t border-zinc-200 fade-up d6">
            {ROLES.map((r, i) => (
              <RoleItem key={r.title} {...r} delay={0.1 * i} />
            ))}
          </div>
        </div>
        </section>
      )}

      {view === "Process" && (
        <section id="process" className="bg-white px-8 md:px-12 py-24 fade-up d1">
        <p className="mono text-[11px] text-zinc-400 uppercase tracking-[0.18em] mb-4 fade-up d2">// The Process</p>
        <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tighter leading-[1] mb-16 max-w-xl text-zinc-900 fade-up d3">
          From discovery to results in weeks
        </h2>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-zinc-200 rounded-xl shadow-sm overflow-hidden fade-up d4">
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              style={{ animationDelay: `${0.1 * i}s` }}
              className={`p-8 relative group transition-all duration-500 hover:bg-zinc-50 fade-up ${
                i < STEPS.length - 1 ? "border-r border-zinc-200" : ""
              } ${i < STEPS.length - 2 ? "sm:border-b-0" : ""} border-b border-zinc-200 ${s.color.replace('text-', 'hover:bg-').replace('500', '50/30')}`}
            >
              <div className="text-[80px] font-black text-zinc-900/30 leading-none mb-6 tracking-tighter group-hover:scale-110 group-hover:text-zinc-900/50 transition-all duration-700">
                {s.num}
              </div>
              <h4 className="text-base font-bold text-zinc-900 mb-3">{s.title}</h4>
              <p className="text-sm text-zinc-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        </section>
      )}

      {view === "Contact" && (
        <section id="contact" className="bg-[oklch(60%_0.25_295)] px-8 md:px-12 py-24 fade-up d1">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 fade-up d2">
          <div className="fade-up d3">
            <h2 className="text-[clamp(1.6rem,4vw,3rem)] font-black text-black tracking-tight leading-[1.1] max-w-xl fade-up d4">
              Accelerate your team's potential today.
            </h2>
            <p className="text-black opacity-60 text-[18px] font-medium mt-4 max-w-md fade-up d5">
              Connect with our leadership to explore high-impact consulting or talent solutions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 fade-up d6">
          <button 
            onClick={() => window.location.href = 'mailto:hello@11xsquare.com?subject=Project Inquiry'}
            className="bg-black text-white font-bold text-lg px-12 py-5 rounded-lg transition-all duration-200 hover:bg-zinc-900 cursor-pointer"
          >
              Start a Project
            </button>
          <button 
            onClick={() => window.location.href = 'mailto:hello@11xsquare.com?subject=Application'}
            className="bg-white text-black font-bold text-lg px-12 py-5 rounded-lg border border-black transition-all duration-200 hover:bg-zinc-100 cursor-pointer"
          >
              Apply Now
            </button>
          </div>
        </div>
        </section>
      )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white px-8 md:px-12 pt-24 pb-12 border-t border-zinc-200 fade-up d1">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20 fade-up d2">
          <div className="max-w-xs fade-up d3">
            <Logo onClick={() => navigateTo("Home")} className="mb-4" />
            <p className="text-sm text-zinc-500 leading-relaxed">
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
                <h5 className="mono text-[10px] text-zinc-900 font-bold uppercase tracking-[0.18em] mb-5">{col.heading}</h5>
                <ul className="flex flex-col gap-1.5 list-none">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" onClick={(e) => { e.preventDefault(); navigateTo("Home"); }} className="text-sm text-zinc-500 hover:text-[oklch(60%_0.25_295)] transition-colors duration-200 no-underline">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
 
        <div className="border-t border-zinc-100 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="mono text-[11px] text-zinc-400">
            © 2025 <span className="text-zinc-900">11x Square</span>. All rights reserved.
          </p>
          <p className="mono text-[11px] text-zinc-400">Built for the bold.</p>
        </div>
      </footer>
    </div>
  );
}
