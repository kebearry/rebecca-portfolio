import React from "react";
import Link from "next/link";
import "../globals.css";

const Banner = () => {
  return (
    <section
      id="banner"
      className="relative bg-primary text-accent h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-lightpink to-secondary opacity-60"></div>
      <div className="relative w-full max-w-4xl mx-auto p-6 space-y-4 text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold animate__animated animate__fadeIn animate__delay-1s">
          Hi there, I&apos;m{" "}
          <span className="relative z-10 font-bold text-3d text-accent">
            Rebecca Tan
          </span>
          .
        </h1>
        <div
          className="text-lg sm:text-xl md:text-2xl opacity-100 animate__animated animate__fadeIn animate__delay-2s 
          whitespace-nowrap overflow-hidden border-r-4 border-secondary inline-block max-w-full"
          style={{
            animation:
              "typing 4s steps(30) 1s forwards, blinkCaret 0.75s step-end 4s infinite",
          }}
        >
          I bring designs to life through code.
        </div>
        <p className="text-sm sm:text-base md:text-lg opacity-100 animate__animated animate__fadeIn animate__delay-3s">
          I&apos;m a Solution Architect based in Singapore.
          <br />
          <br />
          I specialize in{" "}
          <span className="relative inline-block font-semibold">
            <span className="absolute inset-0 bg-secondary opacity-80 rounded-xl -top-0 -bottom-0 -left-1 -right-1 z-0"></span>
            <span className="relative z-10 opacity-90 text-accent">
              frontend experiences
            </span>
          </span>{" "}
          and{" "}
          <span className="relative inline-block font-semibold">
            <span className="absolute inset-0 bg-secondary opacity-80 rounded-xl -top-0 -bottom-0 -left-1 -right-1 z-0"></span>
            <span className="relative z-10 opacity-90 text-accent">
              CMS platforms
            </span>
          </span>
          . I&apos;ve delivered and advised across Sitecore, Adobe Experience
          Manager, Magnolia, and related stacks like Next.js, personalization,
          and commerce integrations.
          <br />
          <br />
          Coming from design, marketing, SEO, and delivery helps me bridge
          product, content, and engineering. I care about what ships for end
          users and what content teams can sustain after launch.
        </p>
        <Link href="#projects">
          <button className="mt-6 px-6 py-3 bg-white text-accent rounded-full font-semibold hover:bg-accent hover:text-white transition duration-300 cursor-pointer">
            Explore My Work
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Banner;
