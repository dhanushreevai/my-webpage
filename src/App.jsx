import { useState, useEffect, useRef } from "react";
import logo from "./image/11x-logo.jpeg";

const NAV_LINKS = ["Services", "Careers", "Process", "Contact"];

const SERVICES = [
  {
    
    icon: "⚡",
    title: "Technology Consulting",
    desc: "Architecture reviews, tech stack decisions, and digital transformation roadmaps tailored to your growth stage.",
    tags: ["Cloud", "AI/ML", "Infra"],
  },
  {
    
    icon: "📊",
    title: "Product & Strategy",
    desc: "Market positioning, product-market fit analysis, and go-to-market strategies that build lasting competitive advantage.",
    tags: ["GTM", "Research", "OKRs"],
  },
  {
    
    icon: "🔬",
    title: "Data & Intelligence",
    desc: "Build data pipelines, dashboards, and ML systems that turn raw numbers into actionable business intelligence.",
    tags: ["Analytics", "BI", "Python"],
  },
  {
    
    icon: "🚀",
    title: "Startup Acceleration",
    desc: "Hands-on support for early-stage founders — from MVP to investor-ready product and pitch decks.",
    tags: ["MVP", "Pitch", "Scale"],
  },
  {
    
    icon: "🎯",
    title: "Engineering Teams",
    desc: "We source, vet, and deploy high-performing engineering squads — full-time, contract, or project-based.",
    tags: ["Hiring", "Remote", "Teams"],
  },
  {
    
    icon: "💡",
    title: "Innovation Workshops",
    desc: "Facilitated design sprints and innovation sessions that solve deep problems in days, not months.",
    tags: ["Sprint", "UX", "Ideation"],
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
  { num: "01", title: "Discovery", desc: "We audit your stack, team, and goals to understand what's holding you back and what's possible." },
  { num: "02", title: "Strategy", desc: "A clear, actionable roadmap with milestones, owners, and measurable success criteria." },
  { num: "03", title: "Execution", desc: "Embedded consultants and curated talent work alongside your team to ship results." },
  { num: "04", title: "Scale", desc: "We hand off with documentation, playbooks, and a team ready to multiply the wins." },
];

const STATS = [
  { val: "120", unit: "+", label: "Projects Delivered" },
  { val: "48", unit: "+", label: "Interns Placed" },
  { val: "11", unit: "x", label: "Average ROI" },
  { val: "32", unit: "+", label: "Partner Companies" },
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

function StatCard({ val, unit, label, animate }) {
  const num = useCountUp(val, 1200, animate);
  return (
    <div className="flex flex-col gap-1">
      <div className="text-4xl font-black tracking-tight text-white leading-none">
        {animate ? num : val}
        <span className="text-[#C8FF00]">{unit}</span>
      </div>
      <div className="text-xs text-zinc-500 uppercase tracking-wide font-medium">{label}</div>
    </div>
  );
}

function ServiceCard({ num, icon, title, desc, tags }) {
  return (
    <div className="relative bg-[#12161F] border border-white/[0.07] p-9 transition-all duration-300 cursor-default group overflow-hidden hover:-translate-y-1">
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-[#C8FF00] transition-transform duration-400 origin-left scale-x-0 group-hover:scale-x-100"
      />
      <div className="font-mono text-[11px] text-[#C8FF00] tracking-wider mb-6">{num}</div>
      <div className="w-16 h-16 rounded-lg bg-[#C8FF00]/10 flex items-center justify-center text-5xl mb-5">{icon}</div>
      <h3 className="text-base font-bold mb-3 tracking-tight text-white">{title}</h3>
      <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
      <div className="flex flex-wrap gap-2 mt-5">
        {tags.map((t) => (
          <span key={t} className="font-mono text-[10px] px-2 py-1 border border-white/[0.07] text-zinc-500 uppercase tracking-wider">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function RoleItem({ title, type, location, period }) {
  return (
    <div className="flex items-center justify-between px-6 py-5 bg-[#12161F] border border-white/[0.07] transition-all duration-200 cursor-pointer
                group hover:border-[rgba(200,255,0,0.25)] hover:bg-[rgba(200,255,0,0.03)]"
    >
      {/* Removed hovered state and onMouseEnter/onMouseLeave, using Tailwind's group-hover for styling */}
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-bold text-white">{title}</span>
        <div className="flex gap-4 font-mono text-[11px] text-zinc-500">
          <span>{location}</span>
          <span>{period}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`font-mono text-[10px] px-2.5 py-1 rounded-sm uppercase tracking-wider ${
            type === "intern"
              ? "bg-[#C8FF00]/10 text-[#C8FF00] border border-[#C8FF00]/20"
              : "bg-[#00FFD1]/10 text-[#00FFD1] border border-[#00FFD1]/20"
          }`}
        >
          {type === "intern" ? "Intern" : "Full-time"}
        </span>
        <span
          // Using group-hover for transform and color changes, increased size
          className="text-zinc-500 text-2xl transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#C8FF00]"
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
      {/* mix-blend-screen hides the black background of the JPEG logo on the dark theme */}
      <img src={logo} alt="11x Logo Icon" className="h-32 w-auto mix-blend-screen" />
      <span className="hidden sm:block text-5xl font-black tracking-tighter">
        11x<span className="text-[#C8FF00]">Square</span>
      </span>
    </div>
  );
}

export default function App() {
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

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="bg-[#080A0F] text-white min-h-screen font-sans overflow-x-hidden">
      {/*
        Global styles, font imports, keyframes, and utility classes have been moved to index.css
        for better organization and adherence to React best practices.
      */}

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-5 transition-all duration-300 ${
          scrolled ? "backdrop-blur-xl bg-[#080A0F]/80 border-b border-white/[0.07]" : "bg-transparent"
        }`}
      >
        <Logo onClick={() => scrollTo("home")} />

        <ul className="hidden md:flex gap-9 list-none">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l)}
                className="text-zinc-500 hover:text-[#C8FF00] text-[13px] font-medium uppercase tracking-widest transition-colors duration-200 bg-transparent border-0 cursor-pointer"
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:block bg-[#C8FF00] text-black text-[13px] font-bold uppercase tracking-wider px-5 py-2.5 rounded hover:shadow-[0_0_24px_rgba(200,255,0,0.4)] transition-all duration-200 hover:-translate-y-0.5"
        >
          Get Started
        </button>

        <button
          className="md:hidden bg-transparent border-0 cursor-pointer text-white text-2xl"
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
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-[#080A0F]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-2xl font-bold text-white hover:text-[#C8FF00] transition-colors duration-200 bg-transparent border-0 cursor-pointer"
            >
              {l}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center px-8 md:px-12 pt-36 pb-24 grid-bg overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-[-80px] right-[-80px] w-[480px] h-[480px] rounded-full bg-[#C8FF00]/[0.05] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[80px] left-[60px] w-[320px] h-[320px] rounded-full bg-[#00FFD1]/[0.04] blur-[90px] pointer-events-none" />

        <p className="mono text-[11px] text-[#C8FF00] font-bold uppercase tracking-[0.1em] mb-7 flex items-center gap-3 fade-up d1">
          <span className="block w-8 h-px bg-[#C8FF00]" />
          Consulting · Talent · Technology
        </p>

        <h1 className="text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.93] tracking-[-0.04em] max-w-4xl mb-9 fade-up d2">
          Building the
          <br />
          <span className="text-white opacity-90">next-gen</span>
          <br />
          <span className="text-[#C8FF00]">tech workforce</span>
        </h1>

        <p className="text-zinc-500 text-[1.05rem] leading-[1.75] max-w-lg mb-12 fade-up d3">
          11x Square bridges elite consulting with emerging talent. We help companies scale intelligently and launch careers that matter.
        </p>

        <div className="flex flex-wrap gap-4 items-center fade-up d4">
          <button
            onClick={() => scrollTo("services")}
            className="bg-[#C8FF00] text-black font-bold uppercase tracking-wider text-sm px-8 py-3.5 rounded hover:shadow-[0_8px_32px_rgba(200,255,0,0.35)] transition-all duration-200 hover:-translate-y-0.5 border-0 cursor-pointer"
          >
            Explore Services
          </button>
          <button
            onClick={() => scrollTo("careers")}
            className="bg-transparent text-white font-semibold text-sm px-8 py-3.5 rounded border border-white/10 hover:border-white/25 hover:text-white transition-all duration-200 cursor-pointer"
          >
            Intern Program →
          </button>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-24 pt-10 border-t border-white/[0.07] flex flex-wrap gap-12 fade-up d5">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} animate={statsVisible} />
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-t border-b border-white/[0.07] bg-[#0E1117] py-4 overflow-hidden">
        <div className="marquee-track flex gap-14 w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mono text-[11px] text-zinc-600 uppercase tracking-wider whitespace-nowrap flex items-center gap-4">
              {item}
              <span className="text-[#C8FF00] text-[8px]">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="bg-[#0E1117] px-8 md:px-12 py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="mono text-[11px] text-[#C8FF00] uppercase tracking-[0.18em] mb-4">// What we do</p>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-black tracking-tight leading-[1.05]">
              Consulting for the<br />bold & ambitious
            </h2>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
            From strategy to execution, we partner with forward-thinking companies to solve complex challenges and accelerate growth.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
          {SERVICES.map((s) => (
            <ServiceCard key={s.num} {...s} />
          ))}
        </div>
      </section>

      {/* CAREERS */}
      <section id="careers" className="bg-[#080A0F] px-8 md:px-12 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div>
            <p className="mono text-[11px] text-[#C8FF00] uppercase tracking-[0.18em] mb-4">// Open Roles</p>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-black tracking-tight leading-[1.05] mb-5">
              Launch your career<br />at <span className="text-[#C8FF00]">11x Square</span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-md">
              Whether you're a seasoned consultant or a fresh grad ready to make your mark — we have a seat for you.
            </p>

            <div className="bg-[#12161F] border border-white/[0.07] p-7 rounded-sm">
              <p className="mono text-[10px] text-[#C8FF00] uppercase tracking-[0.15em] mb-4">Intern Program Highlights</p>
              <ul className="flex flex-col gap-3">
                {[
                  "3-month structured cohort program",
                  "Real client projects from day one",
                  "Mentorship from senior consultants",
                  "Full-time conversion for top performers",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-zinc-500">
                    <span className="text-[#C8FF00] flex-shrink-0 text-xl">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            {ROLES.map((r) => (
              <RoleItem key={r.title} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="bg-[#0E1117] px-8 md:px-12 py-28">
        <p className="mono text-[11px] text-[#C8FF00] uppercase tracking-[0.18em] mb-4">// How it works</p>
        <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-black tracking-tight leading-[1.05] mb-16 max-w-xl">
          From discovery to results in weeks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/[0.07]">
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              className={`p-10 relative group transition-colors duration-500 hover:bg-white/[0.02] ${
                i < STEPS.length - 1 ? "border-r border-white/[0.07]" : ""
              } sm:border-b-0 border-b border-white/[0.07]`}
            >
              <div className="text-[72px] font-black text-white/[0.04] group-hover:text-[#C8FF00]/[0.08] transition-colors duration-500 leading-none mb-6 tracking-tighter">
                {s.num}
              </div>
              <h4 className="text-base font-bold text-white mb-3">{s.title}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-12 right-0 h-8 w-px bg-[#C8FF00]/20" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section id="contact" className="bg-[#C8FF00] px-8 md:px-12 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-black tracking-tight leading-[1.1] max-w-xl">
              Ready to build something extraordinary together?
            </h2>
            <p className="text-black/60 text-sm mt-4 max-w-md">
              Reach out for consulting, internships, or talent placement. We respond within 24 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <button 
            onClick={() => window.location.href = 'mailto:hello@11xsquare.com?subject=Project Inquiry'}
            className="bg-black text-[#C8FF00] font-black uppercase tracking-wider text-sm px-9 py-4 rounded hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)] transition-all duration-200 hover:-translate-y-0.5 border-0 cursor-pointer whitespace-nowrap"
          >
              Start a Project
            </button>
          <button 
            onClick={() => window.location.href = 'mailto:hello@11xsquare.com?subject=Application'}
            className="bg-transparent text-black font-bold uppercase tracking-wider text-sm px-9 py-4 rounded border-2 border-black/20 hover:border-black/50 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080A0F] px-8 md:px-12 pt-16 pb-10 border-t border-white/[0.07]">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-14">
          <div className="max-w-xs">
            <Logo onClick={() => scrollTo("home")} className="mb-4" />
            <p className="text-sm text-zinc-600 leading-relaxed">
              Bridging elite consulting with the next generation of tech talent.
            </p>
          </div>

          <div className="flex flex-wrap gap-16">
            {[
              { heading: "Company", links: ["About", "Services", "Process", "Blog"] },
              { heading: "Careers", links: ["Internships", "Full-time", "Freelance"] },
              { heading: "Contact", links: ["hello@11xsquare.com", "Chennai, India", "LinkedIn", "Twitter"] },
            ].map((col) => (
              <div key={col.heading}>
                <h5 className="mono text-[10px] text-[#C8FF00] uppercase tracking-[0.18em] mb-5">{col.heading}</h5>
                <ul className="flex flex-col gap-3 list-none">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-zinc-600 hover:text-white transition-colors duration-200 no-underline">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.07] pt-7 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="mono text-[11px] text-zinc-700">
            © 2025 <span className="text-[#C8FF00]">11x Square</span>. All rights reserved.
          </p>
          <p className="mono text-[11px] text-zinc-700">Built for the bold.</p>
        </div>
      </footer>
    </div>
  );
}
