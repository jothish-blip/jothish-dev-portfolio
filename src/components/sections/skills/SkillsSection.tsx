"use client";

import { useState, useEffect, useMemo } from "react";
import { skillDomains } from "./data";
import { Check, Search, FileText, Award } from "lucide-react";
import SkillCard from "./SkillCard";
import SkillChip from "./SkillChip";
import { SkillItem } from "./types";

const INITIAL_DOMAINS_MOBILE = 4;

// Categorize Technologies for the "Documentation" feel
const categorizeTech = (techs: SkillItem[]) => {
  const categories: Record<string, SkillItem[]> = {
    Languages: [],
    Frameworks: [],
    Platforms: [],
    Tools: []
  };

  techs.forEach(t => {
    const n = t.name.toLowerCase();
    if (['python', 'bash', 'powershell', 'go', 'javascript', 'sql', 'c++', 'rust'].includes(n)) {
      categories.Languages.push(t);
    } else if (['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'linux', 'windows'].includes(n)) {
      categories.Platforms.push(t);
    } else if (['metasploit', 'burp', 'splunk', 'impacket', 'nmap', 'wireshark', 'suricata'].some(k => n.includes(k))) {
      categories.Frameworks.push(t);
    } else {
      categories.Tools.push(t);
    }
  });

  return Object.entries(categories).filter(([_, items]) => items.length > 0);
};

export default function SkillsSection() {
  // Mobile State
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);
  
  // Desktop State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDomainId, setActiveDomainId] = useState<string>(skillDomains[0].id);
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null);

  // Search Logic (Memoized)
  const filteredDomains = useMemo(() => {
    if (!searchQuery.trim()) return skillDomains;
    const q = searchQuery.toLowerCase();
    return skillDomains.filter(d => 
      d.title.toLowerCase().includes(q) || 
      d.technologies.some(t => t.name.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const activeDomain = useMemo(() => {
    return skillDomains.find(d => d.id === activeDomainId) || skillDomains[0];
  }, [activeDomainId]);

  const categorizedActiveTech = useMemo(() => {
    return categorizeTech(activeDomain.technologies);
  }, [activeDomain]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;
      
      const currentIndex = filteredDomains.findIndex(d => d.id === activeDomainId);
      
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex < filteredDomains.length - 1) {
          setActiveDomainId(filteredDomains[currentIndex + 1].id);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex > 0) {
          setActiveDomainId(filteredDomains[currentIndex - 1].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeDomainId, filteredDomains]);

  const totalSkills = useMemo(() => skillDomains.reduce((acc, domain) => acc + domain.coreSkills.length, 0), []);
  const totalTech = useMemo(() => skillDomains.reduce((acc, domain) => acc + domain.technologies.length, 0), []);

  const visibleMobileDomains = showAllMobile 
    ? skillDomains 
    : skillDomains.slice(0, INITIAL_DOMAINS_MOBILE);

  return (
    <section id="skills" className="border-t border-surface pt-14 pb-32 max-w-7xl mx-auto flex flex-col gap-12 px-6 md:px-8 relative min-h-screen">
      
      <style>{`
        .skill-nav-btn:hover {
          background-color: color-mix(in srgb, var(--accent-skills) 5%, transparent);
        }
        .view-more-skills:hover {
          border-color: color-mix(in srgb, var(--accent-skills) 50%, transparent) !important;
          color: var(--accent-skills) !important;
        }
        .doc-scrollbar::-webkit-scrollbar { width: 6px; }
        .doc-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .doc-scrollbar::-webkit-scrollbar-thumb { background: var(--surface-strong); border-radius: 4px; }
        .doc-scrollbar:hover::-webkit-scrollbar-thumb { background: var(--muted); }
      `}</style>
      
      {/* HEADER */}
      <header className="relative mx-auto w-full max-w-4xl text-center space-y-5 py-8 flex flex-col items-center">
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <div 
            className="w-[300px] h-[150px] md:w-[600px] md:h-[200px] blur-[80px] rounded-[100%] opacity-30 mix-blend-screen"
            style={{ backgroundColor: 'var(--accent-skills)' }}
          ></div>
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-[size:12px_12px]"></div>
        </div>

        <div className="relative z-10 space-y-4 flex flex-col items-center">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: 'var(--accent-skills)' }}>
            {"// Technical Expertise"}
          </p>

          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-foreground uppercase">
            Explore how I design, <br />
            <span className="text-muted italic font-light">secure and automate systems.</span>
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-[9px] tracking-[0.24em] uppercase text-muted">
            <span className="px-3 py-1.5 border border-surface bg-surface/20 rounded-sm">{skillDomains.length} Domains</span>
            <span className="px-3 py-1.5 border border-surface bg-surface/20 rounded-sm">{totalTech} Technologies</span>
            <span className="px-3 py-1.5 border border-surface bg-surface/20 rounded-sm">{totalSkills} Competencies</span>
          </div>

          <div className="w-12 h-[1px] my-2 opacity-50" style={{ backgroundColor: 'var(--accent-skills)' }} />
        </div>
      </header>

      {/* ========================================== */}
      {/* MOBILE LAYOUT (ACCORDION)                  */}
      {/* ========================================== */}
      <div className="block lg:hidden space-y-4 relative z-10">
        {visibleMobileDomains.map((domain) => (
          <div key={domain.id} className="transition-opacity duration-200">
            <SkillCard 
              domain={domain}
              isExpanded={expandedId === domain.id}
              onToggle={() => setExpandedId(prev => prev === domain.id ? null : domain.id)}
            />
          </div>
        ))}

        {skillDomains.length > INITIAL_DOMAINS_MOBILE && (
          <div className="mt-6 flex justify-center">
            <button suppressHydrationWarning
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="view-more-skills px-6 py-3 border border-surface bg-surface/10 rounded-sm text-[10px] font-mono uppercase tracking-[0.24em] text-muted transition-colors duration-200"
            >
              {showAllMobile ? "Show Less" : "View More Skills"}
            </button>
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* DESKTOP LAYOUT (VS CODE / DOCS STYLE)      */}
      {/* ========================================== */}
      <div className="hidden lg:grid grid-cols-12 gap-6 items-start relative z-10 max-w-7xl mx-auto w-full">
        
        {/* LEFT NAV (VS Code Explorer Style) */}
        <div className="col-span-4 flex flex-col sticky top-32 h-[calc(100vh-150px)]">
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input suppressHydrationWarning 
              type="text" 
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-surface border-b-surface-strong focus:border-[var(--accent-skills)] outline-none rounded-sm py-2.5 pl-9 pr-4 text-[12px] font-mono text-foreground placeholder:text-muted transition-colors"
            />
          </div>

          <div className="flex-1 overflow-y-auto doc-scrollbar pr-2 space-y-1 pb-10">
            <div className="text-[9px] font-mono uppercase tracking-[0.24em] text-muted mb-4 pl-2 font-bold">
              Explorer
            </div>
            
            {filteredDomains.map((domain, idx) => {
              const isActive = activeDomainId === domain.id;
              
              return (
                <button suppressHydrationWarning
                  key={domain.id}
                  onClick={() => setActiveDomainId(domain.id)}
                  onMouseEnter={() => setHoveredDomainId(domain.id)}
                  onMouseLeave={() => setHoveredDomainId(null)}
                  className={`group w-full flex items-center justify-between px-2 py-2.5 rounded-sm transition-colors duration-150 outline-none ${
                    isActive ? "bg-surface/40" : "hover:bg-surface/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 flex justify-center text-muted">
                      {isActive ? (
                        <span 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: 'var(--accent-skills)', boxShadow: '0 0 8px var(--accent-skills)' }} 
                        />
                      ) : (
                        <span className="text-[10px]">▸</span>
                      )}
                    </span>
                    
                    <span className="font-mono text-[10px] text-muted/50">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    
                    <span className={`text-[13px] tracking-tight transition-transform duration-150 ${isActive ? "text-foreground font-semibold" : "text-muted group-hover:text-foreground"}`}>
                      {domain.title}
                    </span>
                  </div>
                </button>
              );
            })}

            {filteredDomains.length === 0 && (
              <div className="text-[11px] text-muted font-mono pl-6 pt-4">No matching domains.</div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL (Documentation Style) */}
        <div className="col-span-8 h-[calc(100vh-150px)]">
          <div 
            className="flex flex-col h-full bg-background border rounded-md shadow-2xl overflow-hidden transition-colors duration-200 relative"
            style={{ borderColor: hoveredDomainId || activeDomainId ? 'color-mix(in srgb, var(--accent-skills) 30%, var(--border))' : 'var(--border)' }}
          >
            <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            {/* Panel Inner Scroll Area */}
            <div className="flex-1 overflow-y-auto doc-scrollbar relative z-10">
              
              <div key={activeDomain.id} className="pb-16 animate-in fade-in duration-200">
                
                {/* HERO BANNER INSIDE PANEL */}
                <div className="relative px-10 py-12 border-b border-surface overflow-hidden bg-surface/5">
                  <div className="absolute inset-0 opacity-[0.15] mix-blend-screen" style={{ background: 'linear-gradient(135deg, var(--accent-skills), transparent)' }} />
                  
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <activeDomain.icon size={20} className="text-[var(--accent-skills)]" />
                      <h3 
                        className="text-3xl font-bold uppercase tracking-tight text-foreground"
                        style={{ textShadow: '0 0 30px color-mix(in srgb, var(--accent-skills) 50%, transparent)' }}
                      >
                        {activeDomain.title}
                      </h3>
                    </div>
                    
                    <p className="text-[14px] text-muted max-w-2xl leading-relaxed">
                      {activeDomain.description}
                    </p>

                    {/* Mini Statistics */}
                    <div className="flex gap-10 mt-6 pt-6 border-t border-surface/50">
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1">Core</p>
                        <p className="text-2xl font-bold text-foreground">{String(activeDomain.coreSkills.length).padStart(2, '0')}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1">Tools</p>
                        <p className="text-2xl font-bold text-foreground">{String(activeDomain.technologies.length).padStart(2, '0')}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1">Updated</p>
                        <p className="text-2xl font-bold text-foreground">2026</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DOCUMENTATION SECTIONS */}
                <div className="px-10 py-8 space-y-12">
                  
                  {/* Core Competencies */}
                  <section>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted mb-6 pb-2 border-b border-surface">
                      Core Competencies
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeDomain.coreSkills.map((skill) => (
                        <li 
                          key={skill}
                          className="flex items-start gap-3 text-[13px] text-foreground/90 font-medium"
                        >
                          <Check size={16} style={{ color: 'var(--accent-skills)' }} className="shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* ORGANIZED TOOLKIT */}
                  <section>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted mb-6 pb-2 border-b border-surface">
                      Toolkit
                    </h4>
                    <div className="space-y-8">
                      {categorizedActiveTech.map(([category, techs]) => (
                        <div key={category}>
                          <h5 className="text-[11px] font-semibold uppercase tracking-widest text-foreground/70 mb-4">
                            {category}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {techs.map((tech) => (
                              <SkillChip key={tech.name} skill={tech} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* RELATED WORK & CERTIFICATIONS */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
                    <section>
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted mb-4 pb-2 border-b border-surface">
                        Related Work
                      </h4>
                      <div className="space-y-2">
                        <a href="#projects" className="flex items-center gap-3 p-3 rounded-sm border border-surface bg-surface/10 hover:bg-surface/30 transition-colors group">
                          <FileText size={14} className="text-muted group-hover:text-foreground" />
                          <span className="text-[12px] font-medium transition-colors group-hover:text-[var(--accent-skills)]">Threat Detection Platform</span>
                        </a>
                        <a href="#projects" className="flex items-center gap-3 p-3 rounded-sm border border-surface bg-surface/10 hover:bg-surface/30 transition-colors group">
                          <FileText size={14} className="text-muted group-hover:text-foreground" />
                          <span className="text-[12px] font-medium transition-colors group-hover:text-[var(--accent-skills)]">Active Directory Lab</span>
                        </a>
                      </div>
                    </section>

                    <section>
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted mb-4 pb-2 border-b border-surface">
                        Related Certifications
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 rounded-sm border border-surface bg-surface/10">
                          <Award size={14} className="text-muted" style={{ color: 'var(--accent-skills)' }} />
                          <span className="text-[12px] font-medium">Google Cybersecurity Professional</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-sm border border-surface bg-surface/10">
                          <Award size={14} className="text-muted" style={{ color: 'var(--accent-skills)' }} />
                          <span className="text-[12px] font-medium">CompTIA Security+ (In Progress)</span>
                        </div>
                      </div>
                    </section>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
