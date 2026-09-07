"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Terminal from "@/components/sections/Terminal";
import Contact from "@/components/sections/Contact";
import HomePageJsonLd from "@/components/SEO/HomePageJsonLd";

export default function PortfolioSPA() {
  const pathname = usePathname();
  const scrolledRef = useRef(false);

  useEffect(() => {
    // Only scroll on initial mount for direct access
    if (scrolledRef.current) return;
    scrolledRef.current = true; // Set synchronously to prevent race conditions
    
    // Extract section from pathname, e.g. "/about" -> "about"
    const section = pathname.split("/").filter(Boolean)[0];
    
    if (section && section !== "home") {
      const targetId = section;
      const el = document.getElementById(targetId);
      
      if (el) {
        // Scroll immediately without timeout to prevent FOUC
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "auto" });
      }
    } else {
      // For /home or /, scroll to top
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="relative bg-background text-foreground overflow-x-hidden scroll-smooth selection:bg-[var(--accent-soft)] selection:text-[var(--accent)]">
      <HomePageJsonLd />
      
      {/* GLOBAL BACKGROUND GRID */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--accent-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--accent-grid) 1px, transparent 1px)`,
          backgroundSize: "70px 70px",
        }}
      />

      <section id="hero" className="relative min-h-[100dvh] w-full border-b border-surface">
        <Hero />
      </section>

      <section id="about" className="relative py-3 sm:py-1">
        <About />
      </section>

      <section id="projects" className="relative py-16 sm:py-24">
        <Projects />
      </section>

      <section id="skills" className="relative py-16 sm:py-24">
        <Skills />
      </section>

      <section id="terminal" className="relative py-16 sm:py-24">
        <Terminal />
      </section>

      <section id="contact" className="relative py-16 sm:py-24">
        <Contact />
      </section>
    </main>
  );
}
