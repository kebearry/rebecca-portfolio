"use client";

import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState<string>("banner");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionId = section.getAttribute("id");

      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        setActiveIcon(sectionId || "");
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (icon: string) => {
    setActiveIcon(icon);
    const section = document.getElementById(icon);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div>
      {/* Hamburger Menu Icon for Mobile */}
      <div className="sm:hidden flex justify-end p-4 z-30 fixed top-0 right-2">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-black z-30"
        >
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white mb-1"></div>
          <div className="w-6 h-1 bg-white"></div>
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
              ? "bg-[rgba(255,182,193,0.5)] text-white"
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
              ? "bg-[rgba(255,182,193,0.5)] text-white"
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
              ? "bg-[rgba(255,182,193,0.5)] text-white"
              : ""
          } w-full flex items-center justify-start space-x-2`}
          onClick={() => handleClick("timeline")}
        >
          <div className="text-xl">⏳</div>
          <span className="text-white">Timeline</span>
        </div>
        {/* New Contact Link for Mobile */}
        <div
          className={`cursor-pointer ${
            activeIcon === "contact"
              ? "bg-[rgba(255,182,193,0.5)] text-white"
              : ""
          } w-full flex items-center justify-start space-x-2`}
          onClick={() => handleClick("contact")}
        >
          <div className="text-xl">✉️</div>
          <span className="text-white">Contact</span>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden sm:flex fixed top-1/2 right-4 transform -translate-y-1/2 w-16 bg-gray-100 bg-opacity-80 text-black flex-col items-center justify-center rounded-full z-10 h-[90vh] space-y-8 hover:w-32 transition-all duration-300">
        <div
          className={`group w-full cursor-pointer ${
            activeIcon === "banner"
              ? "bg-[rgba(255,182,193,0.5)] font-semibold text-black"
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
              ? "bg-[rgba(255,182,193,0.5)] text-black"
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
              ? "bg-[rgba(255,182,193,0.5)] text-black"
              : ""
          } flex items-center justify-center space-x-2`}
          onClick={() => handleClick("timeline")}
        >
          <div className="text-xl text-center">⏳</div>
          <span className="hidden group-hover:inline-block transition-opacity duration-300 text-center text-sm ml-2">
            Timeline
          </span>
        </div>

        {/* New Contact Link for Desktop */}
        <div
          className={`group w-full cursor-pointer ${
            activeIcon === "contact"
              ? "bg-[rgba(255,182,193,0.5)] text-black"
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
