"use client";

import React, { useState } from "react";
import { TimelineItem, timelineData } from "../lib/career";
import Image from "next/image";

interface TimelineItemProps extends TimelineItem {
  isActive: boolean;
}

// SVG icon components
const ChevronLeft: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const TimelineUnit: React.FC<TimelineItemProps> = ({
  year,
  title,
  company,
  description,
  technology,
  certifications,
  isActive,
}) => (
  <div
    className={`flex flex-col items-center w-72 md:w-80 lg:w-96 p-4 transition-all duration-300 transform max-w-full sm:max-w-[320px] md:max-w-[360px] ${
      isActive ? "scale-105 opacity-100" : "opacity-60 scale-95"
    }`}
  >
    <div className="relative">
      <div className="w-4 h-4 rounded-full bg-hotpink shadow-lg" />
      <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-blue-500/50 to-gray-200" />
    </div>

    <div className="mt-24 w-full text-center space-y-3">
      <span className="inline-block px-4 py-1.5 rounded-full bg-mutedpink text-hotpink font-semibold">
        {year}
      </span>
      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-sm sm:text-md font-medium text-gray-600 dark:text-gray-300">
          {company}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {technology &&
          technology.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1 text-xs rounded-full bg-hotpink text-white"
            >
              {tag}
            </span>
          ))}
      </div>
      {/* Render Certification Images using next/image */}
      {certifications && certifications.length > 0 && (
        <div className="mt-4">
          <div className="flex gap-4 justify-center mt-2">
            {certifications.map((cert, index) => (
              <Image
                key={index}
                src={cert}
                alt={`Certification ${index + 1}`}
                width={50} // Set default width for desktop (you can adjust this)
                height={50} // Set default height for desktop (you can adjust this)
                className="object-cover rounded-md w-8 h-8 sm:w-16 sm:h-16" // Responsive classes for different screen sizes
                priority // Optionally, add priority for faster loading
              />
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const Timeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const scroll = (direction: "left" | "right"): void => {
    if (direction === "left" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (direction === "right" && activeIndex < timelineData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <section id="timeline" className="min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Timeline Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            My Work Experience
          </h2>
          <p className="text-sm sm:text-md text-gray-600 dark:text-gray-300 mt-2">
            Discover my career journey and the roles that shaped me as a
            developer.
          </p>
        </div>
        <div className="relative">
          <div className="flex items-center justify-center">
            <button
              onClick={() => scroll("left")}
              disabled={activeIndex === 0}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
              ${
                activeIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-md"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900`}
              aria-label="Previous item"
            >
              <ChevronLeft />
            </button>

            <div className="overflow-hidden mx-4">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${activeIndex * (288 + 16)}px)`,
                }}
              >
                {timelineData.map((item, index) => (
                  <TimelineUnit
                    key={item.year}
                    {...item}
                    isActive={index === activeIndex}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => scroll("right")}
              disabled={activeIndex === timelineData.length - 1}
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
              ${
                activeIndex === timelineData.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-md"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900`}
              aria-label="Next item"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="absolute top-4 left-0 right-0 -z-10">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent w-full" />
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2 md:hidden">
          {timelineData.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex
                  ? "bg-blue-500"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
