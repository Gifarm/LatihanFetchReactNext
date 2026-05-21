"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Code,
  Layers,
  FolderGit2,
  Mail,
  // Github,
  // Linkedin,
  // Twitter,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Send,
  Compass,
  Cpu,
  GitBranch,
  Star,
  Eye,
  Workflow,
  Download,
  Phone,
  MessageSquare,
  MapPin,
  Menu,
  X,
} from "lucide-react";

const customStyles = `
  @keyframes pulseGlow {
    0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.4; }
    33% { transform: scale(1.1) translate(30px, -50px); opacity: 0.6; }
    66% { transform: scale(0.9) translate(-20px, 20px); opacity: 0.5; }
  }
  @keyframes shimmer {
    100% { transform: translateX(100%); }
  }
  .animate-glow-1 {
    animation: pulseGlow 12s infinite alternate ease-in-out;
  }
  .animate-glow-2 {
    animation: pulseGlow 16s infinite alternate-reverse ease-in-out;
  }
  .shimmer-effect::after {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.05) 20%,
      rgba(255, 255, 255, 0.1) 60%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 2s infinite;
    content: '';
  }
  html {
    scroll-behavior: smooth;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [terminalCommand, setTerminalCommand] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "input", text: "help" },
    {
      type: "output",
      text: "Available commands: about, skills, contact, clear, coffee",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [githubSearch, setGithubSearch] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    budget: "$10k - $25k",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeAboutTab, setActiveAboutTab] = useState("philosophy");

  // Real-time interactive stars count for GitHub widgets
  const [repoStars, setRepoStars] = useState({
    1: 342,
    2: 218,
    3: 195,
    4: 412,
  });

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "skills", "portfolio", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalCommand.trim()) return;

    const cmd = terminalCommand.toLowerCase().trim();
    let response = "";

    switch (cmd) {
      case "help":
        response = "Available commands: about, skills, contact, clear, coffee";
        break;
      case "about":
        response =
          "Interface Architect & Frontend Specialist. Specializing in highly premium, micro-interactive React and NextJS ecosystems built for elite digital products.";
        break;
      case "skills":
        response =
          "Advanced Suite: Next.js, React (JSX/TSX), Tailwind CSS, Framer Motion, Node, WebGL & custom design-to-code pipelines.";
        break;
      case "contact":
        response =
          "Reach out directly: partner@interfacedesign.io. Open for high-ticket contracts and boutique ventures.";
        break;
      case "coffee":
        response =
          "☕ virtual-espresso.sh executed! Grab a real one and schedule an exclusive call in the section below.";
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalCommand("");
        return;
      default:
        response = `Command "${cmd}" not recognized. Type "help" to view options.`;
    }

    setTerminalHistory([
      ...terminalHistory,
      { type: "input", text: terminalCommand },
      { type: "output", text: response },
    ]);
    setTerminalCommand("");
  };

  const handleStarRepo = (id) => {
    setRepoStars((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactForm({
          name: "",
          email: "",
          budget: "$10k - $25k",
          message: "",
        });
      }, 6000);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("partner@interfacedesign.io");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const projects = [
    {
      id: 1,
      title: "Nova institutional Terminal",
      description:
        "A high-performance algorithmic trading console. Custom state-visualization widget library built for speed, responsiveness, and zero layout shift.",
      category: "web app",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API"],
      stars: repoStars[1],
      forks: 48,
      demoLink: "#",
      githubPath: "architect/nova-terminal",
    },
    {
      id: 2,
      title: "Omni Design System Kit",
      description:
        "A gorgeous, dark-optimized component framework built with dynamic styling variables, keyboard accessibility, and sub-pixel alignment precision.",
      category: "ui/ux",
      tags: ["React", "Tailwind v3", "Framer Engine"],
      stars: repoStars[2],
      forks: 32,
      demoLink: "#",
      githubPath: "architect/omni-ui",
    },
    {
      id: 3,
      title: "SaaS Real-time Analytics Hub",
      description:
        "Custom SVG analytics tracking dashboard with automated visual breakdowns, ultra-low-latency refresh states, and smooth grid adjustments.",
      category: "web app",
      tags: ["React", "Zustand", "SVG Graphics", "Tailwind CSS"],
      stars: repoStars[3],
      forks: 19,
      demoLink: "#",
      githubPath: "architect/saas-hub",
    },
    {
      id: 4,
      title: "Minimalist Decoupled CMS UI",
      description:
        "Ultrafast frontend client for designer-focused content administration. Built to load and parse complex layout blocks in under 120ms.",
      category: "creative",
      tags: ["Next.js", "GraphQL", "Tailwind CSS", "Node.js"],
      stars: repoStars[4],
      forks: 55,
      demoLink: "#",
      githubPath: "architect/headless-cms",
    },
  ];

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory =
      selectedCategory === "all" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(githubSearch.toLowerCase()) ||
      proj.tags.some((t) =>
        t.toLowerCase().includes(githubSearch.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#030712] text-[#f3f4f6] min-h-screen font-sans selection:bg-indigo-500/40 selection:text-white relative overflow-x-hidden antialiased">
      {/* Premium ambient gradient backdrops */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-indigo-500/10 via-violet-600/5 to-transparent blur-[140px] animate-glow-1" />
        <div className="absolute bottom-[15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-emerald-500/5 via-teal-500/5 to-transparent blur-[150px] animate-glow-2" />
        <div className="absolute top-[35%] left-[15%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/5 blur-[130px]" />
      </div>

      {}
      <header className="fixed top-6 left-0 right-0 z-50 px-4 max-w-5xl mx-auto">
        <nav className="backdrop-blur-xl bg-slate-950/50 border border-white/10 rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between shadow-2xl transition-all duration-300">
          <a href="#home" className="flex items-center space-x-2 group">
            <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-300">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-white group-hover:text-indigo-300 transition-colors hidden sm:inline-block">
              Architect<span className="text-indigo-400">.</span>
            </span>
          </a>

          {/* Premium Floating Dock Nav System */}
          <div className="flex items-center space-x-1">
            {["home", "about", "skills", "portfolio", "contact"].map((item) => {
              const isActive = activeSection === item;
              return (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all duration-300 capitalize ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 to-violet-500/15 border border-indigo-500/30 rounded-full -z-10 shadow-[0_0_15px_rgba(99,102,241,0.15)]" />
                  )}
                  {item}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="relative group overflow-hidden px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-white"
            >
              <span className="relative z-10 flex items-center space-x-1.5">
                <span>Book Call</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile responsive toggle */}
          <button
            className="md:hidden p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 backdrop-blur-2xl bg-[#0a0c14]/95 border border-white/10 rounded-2xl p-4 shadow-3xl">
            <div className="flex flex-col space-y-2">
              {["home", "about", "skills", "portfolio", "contact"].map(
                (item) => {
                  const isActive = activeSection === item;
                  return (
                    <a
                      key={item}
                      href={`#${item}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium capitalize transition-all ${
                        isActive
                          ? "bg-indigo-500/10 text-white border-l-4 border-indigo-500"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{item}</span>
                      <Compass
                        className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-600"}`}
                      />
                    </a>
                  );
                },
              )}
              <div className="h-px bg-white/10 my-2" />
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Let's Build Together
              </a>
            </div>
          </div>
        )}
      </header>

      {}
      <section
        id="home"
        className="relative pt-36 pb-20 md:py-40 min-h-screen flex items-center z-10"
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Header */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wider uppercase text-indigo-300">
                Accepting Global Contracts & Projects
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-white">
              Next-Level Digital <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                Interface Art.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-xl font-normal leading-relaxed">
              I translate intricate designs into super-optimized interactive
              systems. Blending fluid visuals with rigorous architecture to
              achieve elite user experiences.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <a
                href="#portfolio"
                className="px-8 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
              >
                <span>View My Works</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-xl font-semibold bg-slate-900 border border-white/10 hover:border-white/20 hover:bg-slate-800 text-slate-300 hover:text-white transition-all flex items-center justify-center"
              >
                Start a Project
              </a>
            </div>

            {/* Premium Stat Boxes */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-md">
              <div>
                <div className="text-2xl font-extrabold text-white">4+</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">
                  Years of Craft
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">30+</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">
                  Shipped Projects
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">100%</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">
                  Satisfied Clients
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Shell Terminal Panel */}
          <div className="lg:col-span-5 w-full">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-1000" />
              <div className="relative bg-[#090b11] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Window Panel Control Header */}
                <div className="bg-[#04060b] px-4 py-3 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono flex items-center">
                    <Terminal className="w-3.5 h-3.5 mr-1.5 text-slate-600" />{" "}
                    core-shell.sh
                  </span>
                  <div className="w-8" />
                </div>

                {/* Shell Command History & Logs */}
                <div className="p-5 font-mono text-xs sm:text-sm h-80 overflow-y-auto no-scrollbar flex flex-col justify-between">
                  <div className="space-y-3.5 text-left">
                    <div className="text-slate-500">
                      // Interactive sandbox. Input commands to explore.
                    </div>
                    <div className="text-indigo-400">
                      &gt; const{" "}
                      <span className="text-amber-300">architect</span> = &#123;
                    </div>
                    <div className="pl-4 text-emerald-400">
                      focus:{" "}
                      <span className="text-slate-300">
                        "Modern Web Interfaces"
                      </span>
                      ,
                    </div>
                    <div className="pl-4 text-emerald-400">
                      stack:{" "}
                      <span className="text-slate-300">
                        ["NextJS", "TypeScript", "Tailwind"]
                      </span>
                      ,
                    </div>
                    <div className="pl-4 text-emerald-400">
                      craft:{" "}
                      <span className="text-slate-300">
                        "Pixel-perfect visual fidelity"
                      </span>
                    </div>
                    <div className="text-indigo-400">&#125;;</div>

                    {/* Render History Commands */}
                    <div className="space-y-2 pt-1.5">
                      {terminalHistory.map((hist, index) => (
                        <div key={index} className="text-left leading-relaxed">
                          {hist.type === "input" ? (
                            <span className="text-indigo-300">
                              &gt; {hist.text}
                            </span>
                          ) : (
                            <span className="text-slate-400 block whitespace-pre-wrap">
                              {hist.text}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Input Form for Shell */}
                  <form
                    onSubmit={handleTerminalSubmit}
                    className="mt-4 pt-3 border-t border-white/5 flex items-center"
                  >
                    <span className="text-emerald-400 mr-2 font-bold">
                      &gt;
                    </span>
                    <input
                      type="text"
                      value={terminalCommand}
                      onChange={(e) => setTerminalCommand(e.target.value)}
                      placeholder="Try 'about', 'skills', or 'coffee'..."
                      className="bg-transparent text-white focus:outline-none w-full border-none p-0 focus:ring-0 placeholder:text-slate-600 font-mono text-xs sm:text-sm"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section
        id="about"
        className="py-24 relative z-10 border-t border-white/5 bg-[#04060b]/60"
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-indigo-400">
              01. The Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              About My Craft
            </h2>
            <div className="h-1 w-12 bg-indigo-500 rounded-full mt-2 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Philosophical and Workflow Tabbing System */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-[#090b11] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                {/* Navigating Tabs */}
                <div className="flex border-b border-white/5 mb-6 space-x-2">
                  {["philosophy", "background", "methodology"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveAboutTab(tab)}
                      className={`pb-3 px-3 text-xs sm:text-sm font-semibold tracking-wide capitalize relative transition-colors ${
                        activeAboutTab === tab
                          ? "text-white"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {tab}
                      {activeAboutTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_8px_indigo]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Animated Tab Content Box */}
                <div className="min-h-[220px] text-left">
                  {activeAboutTab === "philosophy" && (
                    <div className="space-y-4">
                      <p className="text-slate-300 leading-relaxed text-sm">
                        Design and code are not decoupled disciplines. A
                        magnificent interface is worthless if the under-the-hood
                        engine stutters, and the fastest application fails if it
                        lacks clean usability.
                      </p>
                      <p className="text-slate-400 leading-relaxed text-sm">
                        I aim to eliminate friction. I craft every UI component
                        using fluid responsive metrics and design tokens,
                        translating complex layouts cleanly to keep codebases
                        elegant.
                      </p>
                      <div className="flex items-center space-x-3 text-emerald-400 pt-2">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        <span className="text-xs font-medium text-slate-300">
                          Clean architecture matched with perfect visual
                          implementation.
                        </span>
                      </div>
                    </div>
                  )}

                  {activeAboutTab === "background" && (
                    <div className="space-y-4">
                      <p className="text-slate-300 leading-relaxed text-sm">
                        I began my journey designing high-fidelity layouts in
                        Figma. Realizing that design intent often gets lost in
                        engineering handoffs, I committed to mastering frontend
                        development.
                      </p>
                      <p className="text-slate-400 leading-relaxed text-sm">
                        This unique hybrid perspective enables me to operate as
                        both a visionary designer and a technical architect,
                        optimizing user retention and conversion for global
                        digital products.
                      </p>
                      <div className="flex items-center space-x-3 text-emerald-400 pt-2">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        <span className="text-xs font-medium text-slate-300">
                          Bridge visual concepts directly into production-grade
                          systems.
                        </span>
                      </div>
                    </div>
                  )}

                  {activeAboutTab === "methodology" && (
                    <div className="space-y-4">
                      <ol className="space-y-3">
                        <li className="flex items-start space-x-3">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            1
                          </span>
                          <div>
                            <span className="font-semibold text-white block text-xs uppercase tracking-wide">
                              Interactive Blueprints
                            </span>
                            <span className="text-xs text-slate-400">
                              Establish structural grids, layouts, and
                              responsive flow behaviors inside high-fidelity
                              wireframes.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            2
                          </span>
                          <div>
                            <span className="font-semibold text-white block text-xs uppercase tracking-wide">
                              NextJS & React Foundations
                            </span>
                            <span className="text-xs text-slate-400">
                              Assemble components using modern hooks, structured
                              layout variables, and clean React states.
                            </span>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/15 text-indigo-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            3
                          </span>
                          <div>
                            <span className="font-semibold text-white block text-xs uppercase tracking-wide">
                              Fine Micro-Animations
                            </span>
                            <span className="text-xs text-slate-400">
                              Inject subtle user-triggered hover animations and
                              transition glows that enrich visual feedback.
                            </span>
                          </div>
                        </li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Visual Feature/Process Infographics */}
            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-indigo-950/20 to-transparent border border-white/10 rounded-2xl p-5 text-left hover:border-indigo-500/20 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">
                    Systems Mindset
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Structuring apps with highly consistent tokens, atomic
                    designs, and reusable layouts.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-violet-950/20 to-transparent border border-white/10 rounded-2xl p-5 text-left hover:border-violet-500/20 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4 text-violet-400 group-hover:scale-110 transition-transform">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">
                    Clean Metrics
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Delivering blazing fast loading times by avoiding oversized
                    bundles and redundant asset overhead.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-950/20 to-transparent border border-white/10 rounded-2xl p-5 text-left hover:border-emerald-500/20 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">
                    Typing Precision
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Utilizing descriptive typing patterns to construct highly
                    maintainable and clean visual components.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-950/20 to-transparent border border-white/10 rounded-2xl p-5 text-left hover:border-blue-500/20 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">
                    Fluid Scapes
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Applying advanced responsive styling rules that look
                    gorgeous across all viewport breakpoints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="skills" className="py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-indigo-400">
              02. The Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Engineering Arsenal
            </h2>
            <div className="h-1 w-12 bg-indigo-500 rounded-full mt-2 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Frontend Framework Mastery Card */}
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-b from-indigo-500/20 to-transparent rounded-2xl opacity-50 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-[#090b11]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4">
                    Frontend Frameworks
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold uppercase text-slate-400 mb-1">
                        <span>React / NextJS</span>
                        <span className="text-indigo-400">96%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                          style={{ width: "96%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold uppercase text-slate-400 mb-1">
                        <span>TypeScript</span>
                        <span className="text-indigo-400">90%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold uppercase text-slate-400 mb-1">
                        <span>Tailwind CSS</span>
                        <span className="text-indigo-400">98%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                          style={{ width: "98%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 rounded px-2 py-0.5 text-slate-400">
                    Zustand
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 rounded px-2 py-0.5 text-slate-400">
                    Redux Toolkit
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 rounded px-2 py-0.5 text-slate-400">
                    Framer API
                  </span>
                </div>
              </div>
            </div>

            {/* Back-End Deployment Capability Card */}
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-b from-violet-500/20 to-transparent rounded-2xl opacity-50 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-[#090b11]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4">
                    Engines & Middleware
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold uppercase text-slate-400 mb-1">
                        <span>NodeJS / APIs</span>
                        <span className="text-violet-400">85%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold uppercase text-slate-400 mb-1">
                        <span>GraphQL / Querying</span>
                        <span className="text-violet-400">82%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                          style={{ width: "82%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold uppercase text-slate-400 mb-1">
                        <span>Vercel / Cloud / CI</span>
                        <span className="text-violet-400">92%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 rounded px-2 py-0.5 text-slate-400">
                    PostgreSQL
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 rounded px-2 py-0.5 text-slate-400">
                    MongoDB
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 rounded px-2 py-0.5 text-slate-400">
                    Docker
                  </span>
                </div>
              </div>
            </div>

            {/* Design System & Interaction Card */}
            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-b from-emerald-500/20 to-transparent rounded-2xl opacity-50 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-[#090b11]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4">
                    Interactions & Systems
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold uppercase text-slate-400 mb-1">
                        <span>Figma Design Systems</span>
                        <span className="text-emerald-400">95%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold uppercase text-slate-400 mb-1">
                        <span>Layout Animations</span>
                        <span className="text-emerald-400">90%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold uppercase text-slate-400 mb-1">
                        <span>SVG Motion Assets</span>
                        <span className="text-emerald-400">92%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 rounded px-2 py-0.5 text-slate-400">
                    UX Architectures
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 rounded px-2 py-0.5 text-slate-400">
                    Micro-flows
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 rounded px-2 py-0.5 text-slate-400">
                    Lottie Files
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section
        id="portfolio"
        className="py-24 relative z-10 border-t border-white/5 bg-[#04060b]/60"
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0 text-left">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider uppercase text-indigo-400">
                03. Selected Portfolio
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                GitHub Console & Repos
              </h2>
              <div className="h-1 w-12 bg-indigo-500 rounded-full mt-2 animate-pulse" />
            </div>

            {/* Search inputs and interactive category selector */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={githubSearch}
                  onChange={(e) => setGithubSearch(e.target.value)}
                  placeholder="Filter key technology..."
                  className="bg-[#090b11] border border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 text-white w-full sm:w-52 transition-all"
                />
              </div>

              <div className="flex items-center space-x-1 border border-white/10 rounded-xl p-1 bg-[#090b11]">
                {["all", "web app", "ui/ux", "creative"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                      selectedCategory === cat
                        ? "bg-indigo-500/20 text-white shadow-inner"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Premium GitHub Live Console Widget */}
          <div className="bg-[#090b11] border border-white/10 rounded-2xl overflow-hidden mb-12 shadow-2xl">
            <div className="bg-[#04060b] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 space-y-3 sm:space-y-0 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300">
                  <FolderGit2 className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm flex items-center">
                    github.com/interface-architect{" "}
                    <span className="ml-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded">
                      Sync Active
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Explore active design projects and simulated system
                    repositories.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs text-slate-400">
                <span className="flex items-center">
                  <Star className="w-3.5 h-3.5 text-amber-400 mr-1.5 animate-bounce" />{" "}
                  {Object.values(repoStars).reduce((a, b) => a + b, 0)} Stars
                </span>
                <span className="flex items-center">
                  <GitBranch className="w-3.5 h-3.5 text-indigo-400 mr-1.5" />{" "}
                  154 Forks
                </span>
              </div>
            </div>

            {/* Custom GitHub Contribution Calendar Grid using CSS Grid inline style */}
            <div className="p-6 border-b border-white/5 text-left bg-slate-950/20 overflow-x-auto no-scrollbar">
              <div className="min-w-[700px]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-400">
                    Live Architecture Activity Grid (Commits Visualized)
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Last pipeline run: 2 minutes ago
                  </span>
                </div>
                {/* 24-columns dynamic contribution mock matrix */}
                <div
                  className="grid gap-1"
                  style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}
                >
                  {Array.from({ length: 120 }).map((_, i) => {
                    const weights = [
                      "bg-slate-900",
                      "bg-emerald-950/60",
                      "bg-emerald-800/60",
                      "bg-emerald-600/70",
                      "bg-emerald-400/80",
                    ];
                    const weightIndex =
                      Math.floor(Math.sin(i * 0.15) * 2 + 2) +
                      (i % 4 === 0 ? 1 : 0);
                    const cleanWeight = Math.max(0, Math.min(4, weightIndex));
                    return (
                      <div
                        key={i}
                        className={`h-3.5 w-full rounded-sm transition-transform hover:scale-125 hover:z-10 cursor-pointer ${weights[cleanWeight]}`}
                        title={`Commit Node ${i + 1}: ${cleanWeight * 3} production pushes`}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-600 mt-3">
                  <span>Past Activity</span>
                  <div className="flex items-center space-x-1.5">
                    <span>Less</span>
                    <span className="h-2 w-2 rounded-sm bg-slate-900" />
                    <span className="h-2 w-2 rounded-sm bg-emerald-950/60" />
                    <span className="h-2 w-2 rounded-sm bg-emerald-800/60" />
                    <span className="h-2 w-2 rounded-sm bg-emerald-600/70" />
                    <span className="h-2 w-2 rounded-sm bg-emerald-400/80" />
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Repositories Listings Card Grid */}
            {filteredProjects.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-sm font-mono">
                No matching repositories located. Try a different query.
              </div>
            ) : (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="group relative bg-slate-950/40 border border-white/5 rounded-xl p-5 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500 flex items-center">
                          {/* <Github className="w-3.5 h-3.5 mr-1.5 text-slate-600" />{" "} */}
                          {proj.githubPath}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleStarRepo(proj.id)}
                            className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center transition-all border border-white/5 hover:scale-105 active:scale-95"
                          >
                            <Star className="w-3.5 h-3.5 text-amber-400 mr-1 animate-pulse" />{" "}
                            {proj.stars}
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-white text-base group-hover:text-indigo-400 transition-colors flex items-center">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed mt-2 line-clamp-2">
                          {proj.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {proj.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-semibold bg-indigo-500/10 text-indigo-300 rounded px-1.5 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={proj.demoLink}
                        className="text-xs text-slate-300 hover:text-white flex items-center hover:underline font-semibold"
                      >
                        <span>Preview Code</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {}
      <section id="contact" className="py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Contact details information */}
            <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-wider uppercase text-indigo-400">
                    04. The Venture
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                    Let's scale <br />
                    your application.
                  </h2>
                  <div className="h-1 w-12 bg-indigo-500 rounded-full mt-2 animate-pulse" />
                </div>

                <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                  Whether you seek to build an institutional trading console,
                  launch a premium Web3 design system, or optimize SaaS
                  retention, let's align on parameters.
                </p>
              </div>

              {/* Direct channels widget */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/15 group-hover:border-indigo-500/30 transition-all">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 block">
                      Inquiries Desk
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="text-sm text-slate-200 hover:text-white font-semibold flex items-center space-x-2"
                    >
                      <span>partner@interfacedesign.io</span>
                      <span className="text-[9px] font-bold bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-slate-400">
                        {copiedEmail ? "Copied!" : "Copy"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/15 group-hover:border-emerald-500/30 transition-all">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 block">
                      Workspace Location
                    </span>
                    <span className="text-sm text-slate-200 font-semibold block">
                      Remote Operating Worldwide (GMT+7)
                    </span>
                  </div>
                </div>
              </div>

              {/* Business networks */}
              <div className="flex items-center space-x-3 pt-4">
                {/* <a
                  href="#"
                  className="w-9.5 h-9.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
                <a
                  href="#"
                  className="w-9.5 h-9.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a
                  href="#"
                  className="w-9.5 h-9.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Twitter className="w-4.5 h-4.5" />
                </a> */}
              </div>
            </div>

            {/* High-Ticket Project RFP Submission Form */}
            <div className="lg:col-span-7">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
                <div className="relative bg-[#090b11] border border-white/10 rounded-2xl p-6 sm:p-8 text-left shadow-2xl">
                  {formSubmitted ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Project parameters received!
                      </h3>
                      <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                        Thank you for providing absolute clarity. I will dissect
                        the requirements and follow up with a concrete design
                        schedule in 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold tracking-wider uppercase text-slate-400">
                            Your Identity
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Arthur Pendragon"
                            value={contactForm.name}
                            onChange={(e) =>
                              setContactForm({
                                ...contactForm,
                                name: e.target.value,
                              })
                            }
                            className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-all placeholder:text-slate-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold tracking-wider uppercase text-slate-400">
                            Electronic Mail
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="arthur@camelot.io"
                            value={contactForm.email}
                            onChange={(e) =>
                              setContactForm({
                                ...contactForm,
                                email: e.target.value,
                              })
                            }
                            className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-all placeholder:text-slate-600"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold tracking-wider uppercase text-slate-400">
                          Budget Range
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {["<$10k", "$10k - $25k", "$25k+"].map((tier) => (
                            <button
                              key={tier}
                              type="button"
                              onClick={() =>
                                setContactForm({ ...contactForm, budget: tier })
                              }
                              className={`py-3 px-1 rounded-xl text-xs font-semibold border transition-all text-center ${
                                contactForm.budget === tier
                                  ? "bg-indigo-500/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                              }`}
                            >
                              {tier}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold tracking-wider uppercase text-slate-400">
                          Product Blueprint / Requirements
                        </label>
                        <textarea
                          required
                          rows="4"
                          placeholder="Outline key targets, timeframe parameters, visual inspirations, and technology stack preference..."
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              message: e.target.value,
                            })
                          }
                          className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-all placeholder:text-slate-600 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Dispatch Project Scope</span>
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <footer className="py-12 border-t border-white/5 bg-[#02040a] relative z-10 text-xs sm:text-sm text-slate-500">
        <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-6.5 h-6.5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-300">
              Interface Architect
            </span>
          </div>
          <p>
            © 2026 Interface Architect. Operating internationally. Powered by
            NextJS & Tailwind CSS.
          </p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Principles
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
