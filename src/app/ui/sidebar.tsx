"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const SECTION_IDS = ["banner", "projects", "timeline", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState<string>("banner");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const activeHashRef = useRef<string>("banner");
  const isNavigatingRef = useRef(false);

  const updateHash = useCallback((sectionId: SectionId) => {
    if (activeHashRef.current === sectionId) return;

    activeHashRef.current = sectionId;
    window.history.replaceState(null, "", `#${sectionId}`);
    setActiveIcon(sectionId);
  }, []);

  const handleScroll = useCallback(() => {
    if (isNavigatingRef.current) return;

    const midpoint = window.innerHeight / 2;
    let currentSection: SectionId = SECTION_IDS[0];

    for (const sectionId of SECTION_IDS) {
      const section = document.getElementById(sectionId);
      if (!section) continue;

      const rect = section.getBoundingClientRect();
      if (rect.top <= midpoint && rect.bottom >= midpoint) {
        currentSection = sectionId;
        break;
      }
    }

    updateHash(currentSection);
  }, [updateHash]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (SECTION_IDS.includes(hash as SectionId)) {
      activeHashRef.current = hash;
      setActiveIcon(hash);

      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "auto" });
      });
    } else {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleClick = (icon: string) => {
    const section = document.getElementById(icon);
    if (!section) return;

    isNavigatingRef.current = true;
    updateHash(icon as SectionId);
    section.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);

    window.setTimeout(() => {
      isNavigatingRef.current = false;
    }, 800);
  };

  return (
    <div>
      {/* Hamburger Menu Icon for Mobile */}
      <div className="sm:hidden flex justify-end p-4 z-30 fixed top-0 right-2">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative w-12 h-12 glass rounded-full shadow-lg"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <div className="absolute top-1/4 left-1/2 w-6 h-1 bg-accent transform -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-6 h-1 bg-accent transform -translate-x-1/2 -translate-y-0.5"></div>
          <div className="absolute bottom-1/4 left-1/2 w-6 h-1 bg-accent transform -translate-x-1/2"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-2/3 h-screen z-20 p-6 transition-transform duration-300 glass-panel ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } sm:hidden flex flex-col items-center space-y-4`}
      >
        <div
          className={`cursor-pointer rounded-xl px-4 py-3 ${
            activeIcon === "banner"
              ? "bg-secondary/80 text-accent font-semibold"
              : "text-accent"
          } w-full flex items-center justify-start space-x-2`}
          onClick={() => handleClick("banner")}
        >
          <div className="text-xl">🏠</div>
          <span>Home</span>
        </div>
        <div
          className={`cursor-pointer rounded-xl px-4 py-3 ${
            activeIcon === "projects"
              ? "bg-secondary/80 text-accent font-semibold"
              : "text-accent"
          } w-full flex items-center justify-start space-x-2`}
          onClick={() => handleClick("projects")}
        >
          <div className="text-xl">📝</div>
          <span>Projects</span>
        </div>
        <div
          className={`cursor-pointer rounded-xl px-4 py-3 ${
            activeIcon === "timeline"
              ? "bg-secondary/80 text-accent font-semibold"
              : "text-accent"
          } w-full flex items-center justify-start space-x-2`}
          onClick={() => handleClick("timeline")}
        >
          <div className="text-xl">⏳</div>
          <span>Timeline</span>
        </div>
        <div
          className={`cursor-pointer rounded-xl px-4 py-3 ${
            activeIcon === "contact"
              ? "bg-secondary/80 text-accent font-semibold"
              : "text-accent"
          } w-full flex items-center justify-start space-x-2`}
          onClick={() => handleClick("contact")}
        >
          <div className="text-xl">✉️</div>
          <span>Contact</span>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden sm:flex fixed top-1/2 right-4 transform -translate-y-1/2 w-16 glass-panel text-accent flex-col items-center justify-center rounded-full z-10 h-[90vh] space-y-8 hover:w-32 transition-all duration-300">
        <div
          className={`group w-full cursor-pointer rounded-full py-2 ${
            activeIcon === "banner"
              ? "bg-secondary/80 font-semibold text-accent"
              : ""
          } flex items-center justify-center space-x-2`}
          onClick={() => handleClick("banner")}
        >
          <div className="text-xl text-center">🏠</div>
          <span className="hidden group-hover:inline-block transition-opacity duration-300 text-center text-sm ml-2">
            Home
          </span>
        </div>

        <div
          className={`group w-full cursor-pointer rounded-full py-2 ${
            activeIcon === "projects"
              ? "bg-secondary/80 text-accent"
              : ""
          } flex items-center justify-center space-x-2`}
          onClick={() => handleClick("projects")}
        >
          <div className="text-xl text-center">📝</div>
          <span className="hidden group-hover:inline-block transition-opacity duration-300 text-center text-sm ml-2">
            Projects
          </span>
        </div>

        <div
          className={`group w-full cursor-pointer rounded-full py-2 ${
            activeIcon === "timeline"
              ? "bg-secondary/80 text-accent"
              : ""
          } flex items-center justify-center space-x-2`}
          onClick={() => handleClick("timeline")}
        >
          <div className="text-xl text-center">⏳</div>
          <span className="hidden group-hover:inline-block transition-opacity duration-300 text-center text-sm ml-2">
            Timeline
          </span>
        </div>

        <div
          className={`group w-full cursor-pointer rounded-full py-2 ${
            activeIcon === "contact"
              ? "bg-secondary/80 text-accent"
              : ""
          } flex items-center justify-center space-x-2`}
          onClick={() => handleClick("contact")}
        >
          <div className="text-xl text-center">✉️</div>
          <span className="hidden group-hover:inline-block transition-opacity duration-300 text-center text-sm ml-2">
            Contact
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
