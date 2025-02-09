import React from "react";
import Link from "next/link";
import "../globals.css";

const Banner = () => {
  return (
    <section
      id="banner"
      className="relative bg-primary text-white h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#9e7a68] via-[#a98f7d] to-[#9e7a68] opacity-80"></div>
      <div className="relative text-center p-6 space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold animate__animated animate__fadeIn animate__delay-1s text-left">
          Hi there, I&apos;m{" "}
          <span className="text-secondary relative inline-block">
            <span className="relative z-10 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-3d">
              Rebecca
            </span>
          </span>
          .
        </h1>
        <div
          className="text-lg sm:text-xl md:text-2xl opacity-100 max-w-fit mx-auto animate__animated animate__fadeIn animate__delay-2s 
          whitespace-nowrap overflow-hidden border-r-4 border-[#F8B7C4] px-2 inline-block "
          style={{
            animation:
              "typing 4s steps(30) 1s forwards, blinkCaret 0.75s step-end 4s infinite",
          }}
        >
          I bring designs to life through code.
        </div>
        <p className="text-sm sm:text-base md:text-lg opacity-100 max-w-2xl animate__animated animate__fadeIn animate__delay-3s text-left">
          Before transitioning into Application Development, I explored roles in
          Digital Marketing, Graphic Design, Search Engine Optimization, Content
          Marketing, and IT Project Management. Though I excelled in these
          areas, something was missing. I discovered my true passion for
          building immersive digital worlds with code, and I haven&apos;t looked
          back since.
          <br />
          <br />
          My expertise lies in{" "}
          <span className="relative inline-block font-semibold">
            <span className="absolute inset-0 bg-hotpink opacity-80 rounded-xl -top-0 -bottom-0 -left-1 -right-1 z-0"></span>
            <span className="relative z-10 opacity-90">
              Frontend Development
            </span>
          </span>
          , where I focus on building seamless, interactive user experiences,
          and{" "}
          <span className="relative inline-block font-semibold">
            <span className="absolute inset-0 bg-hotpink opacity-80 rounded-xl -top-0 -bottom-0 -left-1 -right-1 z-0"></span>
            <span className="relative z-10 opacity-90">CMS Development</span>
          </span>
          , where I create intuitive and scalable systems that empower users to
          manage content effortlessly.
        </p>
        <div className="text-sm sm:text-base md:text-lg text-left">
          <strong>I am currently based in Singapore.</strong>
        </div>
        <Link href="#projects">
          <button className="mt-6 px-6 py-3 bg-white text-[#9e7a68] rounded-full font-semibold hover:bg-[#9e7a68] hover:text-white transition duration-300 cursor-pointer">
            Explore My Work
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Banner;
