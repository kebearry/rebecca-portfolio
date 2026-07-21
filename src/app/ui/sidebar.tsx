"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const SECTION_IDS = ["banner", "projects", "timeline", "contact"] as const;

const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState<string>("banner");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const activeHashRef = useRef<string>("banner");
  const isNavigatingRef = useRef(false);

  const updateHash = useCallback((sectionId: string) => {
    if (!SECTION_IDS.includes(sectionId as (typeof SECTION_IDS)[number])) return;
    if (activeHashRef.current === sectionId) return;

    activeHashRef.current = sectionId;
    window.history.replaceState(null, "", `#${sectionId}`);
    setActiveIcon(sectionId);
  }, []);

  const handleScroll = useCallback(() => {
    if (isNavigatingRef.current) return;

    const midpoint = window.innerHeight / 2;
    let currentSection = SECTION_IDS[0];

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
    if (SECTION_IDS.includes(hash as (typeof SECTION_IDS)[number])) {
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
    updateHash(icon);
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
          className="relative w-12 h-12 bg-black bg-opacity-40 rounded-full shadow-lg"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <div className="absolute top-1/4 left-1/2 w-6 h-1 bg-white transform -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-6 h-1 bg-white transform -translate-x-1/2 -translate-y-0.5"></div>
          <div className="absolute bottom-1/4 left-1/2 w-6 h-1 bg-white transform -translate-x-1/2"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-2/3 h-screen z-20 p-6 transition-transform duration-300 ${
          isMenuOpen
            ? "translate-x-0 bg-opacity-70 bg-black"
            : "translate-x-full"
        } sm:hidden flex flex-col items-center space-y-6`}
      >
        <div
          className={`cursor-pointer ${
            activeIcon === "banner"
              ? "bg-secondary text-white"
              : ""
          } w-full flex items-center justify-start space-x-2`}
          onClick={() => handleClick("banner")}
        >
          <div className="text-xl">🏠</div>
          <span className="text-white">Home</span>
        </div>
        <div
          className={`cursor-pointer ${
            activeIcon === "projects"
              ? "bg-secondary text-white"
              : ""
          } w-full flex items-center justify-start space-x-2`}
          onClick={() => handleClick("projects")}
        >
          <div className="text-xl">📝</div>
          <span className="text-white">Projects</span>
        </div>
        <div
          className={`cursor-pointer ${
            activeIcon === "timeline"
              ? "bg-secondary text-white"
              : ""
          } w-full flex items-center justify-start space-x-2`}
          onClick={() => handleClick("timeline")}
        >
          <div className="text-xl">⏳</div>
          <span className="text-white">Timeline</span>
        </div>
        <div
          className={`cursor-pointer ${
            activeIcon === "contact"
              ? "bg-secondary text-white"
              : ""
          } w-full flex items-center justify-start space-x-2`}
          onClick={() => handleClick("contact")}
        >
          <div className="text-xl">✉️</div>
          <span className="text-white">Contact</span>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden sm:flex fixed top-1/2 right-4 transform -translate-y-1/2 w-16 bg-white bg-opacity-90 text-accent flex-col items-center justify-center rounded-full z-10 h-[90vh] space-y-8 hover:w-32 transition-all duration-300 shadow-lg">
        <div
          className={`group w-full cursor-pointer ${
            activeIcon === "banner"
              ? "bg-secondary font-semibold text-accent"
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
          className={`group w-full cursor-pointer ${
            activeIcon === "projects"
              ? "bg-secondary text-accent"
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
          className={`group w-full cursor-pointer ${
            activeIcon === "timeline"
              ? "bg-secondary text-accent"
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
          className={`group w-full cursor-pointer ${
            activeIcon === "contact"
              ? "bg-secondary text-accent"
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
