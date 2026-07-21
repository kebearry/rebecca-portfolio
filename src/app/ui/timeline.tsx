"use client";

import React, { useState } from "react";
import { TimelineItem, timelineData } from "../lib/career";
import Image from "next/image";

interface TimelineItemProps extends TimelineItem {
  isActive: boolean;
}

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

function TimelineCardBody({
  year,
  title,
  company,
  description,
  technology,
  certifications,
  align = "center",
}: TimelineItem & { align?: "center" | "left" }) {
  const textAlign = align === "left" ? "text-left" : "text-center";
  const tagJustify = align === "left" ? "justify-start" : "justify-center";
  const certJustify = align === "left" ? "justify-start" : "justify-center";

  return (
    <>
      <span
        className={`inline-block px-4 py-1.5 rounded-full bg-secondary text-accent font-semibold text-sm ${textAlign}`}
      >
        {year}
      </span>
      <div className={`space-y-2 ${textAlign}`}>
        <h3 className="text-lg font-bold text-accent">{title}</h3>
        <p className="text-sm font-medium text-accent/80">{company}</p>
        <p className="text-sm text-accent/70 leading-relaxed">{description}</p>
      </div>
      {technology && technology.length > 0 && (
        <div className={`flex flex-wrap gap-2 mt-3 ${tagJustify}`}>
          {technology.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1 text-xs rounded-full bg-secondary text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {certifications && certifications.length > 0 && (
        <div className={`mt-4 flex gap-3 ${certJustify}`}>
          {certifications.map((cert, index) => (
            <Image
              key={index}
              src={cert}
              alt={`Certification ${index + 1}`}
              width={50}
              height={50}
              className="object-cover rounded-md w-10 h-10"
            />
          ))}
        </div>
      )}
    </>
  );
}

function MobileTimelineEntry({
  item,
  isLast,
}: {
  item: TimelineItem;
  isLast: boolean;
}) {
  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center shrink-0 w-4">
        <div className="w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-secondary/60 mt-1.5" />
        {!isLast && (
          <div className="w-0.5 flex-1 min-h-[2rem] bg-secondary mt-2" />
        )}
      </div>
      <div className={`flex-1 space-y-3 ${isLast ? "pb-2" : "pb-10"}`}>
        <TimelineCardBody {...item} align="left" />
      </div>
    </div>
  );
}

const TimelineUnit: React.FC<TimelineItemProps> = ({
  isActive,
  ...item
}) => (
  <div
    className={`flex flex-col items-center w-72 md:w-80 lg:w-96 p-4 transition-all duration-300 transform max-w-full sm:max-w-[320px] md:max-w-[360px] shrink-0 ${
      isActive ? "scale-105 opacity-100" : "opacity-60 scale-95"
    }`}
  >
    <div className="relative">
      <div className="w-4 h-4 rounded-full bg-accent shadow-lg" />
      <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-secondary to-lightpink" />
    </div>

    <div className="mt-24 w-full text-center space-y-3">
      <TimelineCardBody {...item} align="center" />
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
    <section id="timeline" className="min-h-screen flex items-center bg-primary">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8 md:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-accent">
            My Work Experience
          </h2>
          <p className="text-sm sm:text-md text-accent/70 mt-2">
            Discover my career journey and the roles that shaped me as a
            developer.
          </p>
        </div>

        {/* Mobile: vertical scroll timeline */}
        <div className="md:hidden max-w-lg mx-auto">
          {timelineData.map((item, index) => (
            <MobileTimelineEntry
              key={`${item.year}-${item.company}`}
              item={item}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>

        {/* Desktop: horizontal carousel */}
        <div className="relative hidden md:block">
          <div className="flex items-center justify-center">
            <button
              onClick={() => scroll("left")}
              disabled={activeIndex === 0}
              className={`p-2 rounded-full hover:bg-secondary/50 transition-colors
              ${
                activeIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-md"
              }
              focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary`}
              aria-label="Previous item"
            >
              <ChevronLeft />
            </button>

            <div className="overflow-hidden mx-4">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${activeIndex * (320 + 16)}px)`,
                }}
              >
                {timelineData.map((item, index) => (
                  <TimelineUnit
                    key={`${item.year}-${item.company}`}
                    {...item}
                    isActive={index === activeIndex}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => scroll("right")}
              disabled={activeIndex === timelineData.length - 1}
              className={`p-2 rounded-full hover:bg-secondary/50 transition-colors
              ${
                activeIndex === timelineData.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-md"
              }
              focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary`}
              aria-label="Next item"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="absolute top-4 left-0 right-0 -z-10">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
