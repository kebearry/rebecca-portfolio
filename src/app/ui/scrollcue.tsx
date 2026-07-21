import Link from "next/link";

const ScrollCue = () => {
  return (
    <Link
      href="#projects"
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-accent/55 hover:text-accent/80 transition-colors duration-300"
      aria-label="Scroll to projects"
    >
      <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase">
        Scroll
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="scroll-cue-icon"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </Link>
  );
};

export default ScrollCue;
