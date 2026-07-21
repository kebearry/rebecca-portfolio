"use client";

import React, { useEffect, useRef, useState } from "react";

type TrailPoint = {
  x: number;
  y: number;
  id: number;
};

type CursorMode = "default" | "text" | "link" | "button";

const CustomCursor = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const modeRef = useRef<CursorMode>("default");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const trailIdRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const lastTrailAtRef = useRef(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setIsEnabled(finePointer.matches && !reducedMotion.matches);
    };

    sync();
    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);

    return () => {
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    document.body.classList.add("custom-cursor-active");

    const resolveMode = (target: HTMLElement | null): CursorMode => {
      if (!target) return "default";

      if (
        target.closest(
          'button, input[type="submit"], input[type="button"], [role="button"]'
        )
      ) {
        return "button";
      }

      if (target.closest("a")) {
        return "link";
      }

      if (
        target.closest("p, h1, h2, h3, h4, h5, h6, li, span, blockquote, td, th") &&
        !target.closest("a, button, [role='button']")
      ) {
        return "text";
      }

      return "default";
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const now = performance.now();
      if (now - lastTrailAtRef.current > 30) {
        lastTrailAtRef.current = now;
        const id = trailIdRef.current++;
        setTrail((prev) =>
          [...prev, { x: e.clientX, y: e.clientY, id }].slice(-7)
        );
      }
    };

    const onOver = (e: MouseEvent) => {
      const next = resolveMode(e.target as HTMLElement | null);
      if (next !== modeRef.current) {
        modeRef.current = next;
        setCursorMode(next);
      }
    };

    const animate = () => {
      const cursor = cursorRef.current;
      const mouse = mouseRef.current;
      const mode = modeRef.current;

      cursor.x += (mouse.x - cursor.x) * 0.55;
      cursor.y += (mouse.y - cursor.y) * 0.55;

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%)`;
      }

      if (leadRef.current) {
        const baseScale =
          mode === "button" ? 1.65 : mode === "link" ? 1.3 : mode === "text" ? 0.85 : 1;
        const breathe =
          mode === "button" ? 1 + Math.sin(performance.now() / 320) * 0.07 : 1;
        const scale = baseScale * breathe;
        const color =
          mode === "button"
            ? "#F9E4E7"
            : mode === "link"
              ? "#E8D5D1"
              : "#D4B5A0";

        leadRef.current.style.transform = `rotate(45deg) scale(${scale})`;
        leadRef.current.style.backgroundColor = color;
        leadRef.current.style.opacity = mode === "text" ? "0.75" : "1";
        leadRef.current.style.boxShadow =
          mode === "button"
            ? "0 0 0 2px rgba(255, 255, 255, 0.95), 0 0 16px rgba(249, 228, 231, 0.9)"
            : mode === "link"
              ? "0 0 0 1px rgba(232, 213, 209, 0.9), 0 0 8px rgba(232, 213, 209, 0.45)"
              : "0 0 0 1px rgba(232, 213, 209, 0.9)";
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    frameRef.current = requestAnimationFrame(animate);

    const fade = window.setInterval(() => {
      setTrail((prev) => (prev.length ? prev.slice(1) : prev));
    }, 40);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.clearInterval(fade);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  const isButton = cursorMode === "button";
  const isLink = cursorMode === "link";

  return (
    <>
      {trail.map((point, index) => {
        const progress = (index + 1) / trail.length;
        const size = 3 + progress * 4;

        return (
          <div
            key={point.id}
            className="pointer-events-none fixed z-[9998] bg-[#E8D5D1]"
            style={{
              left: point.x,
              top: point.y,
              width: size,
              height: size,
              transform: "translate(-50%, -50%) rotate(45deg)",
              opacity: 0.2 + progress * 0.4,
              borderRadius: 1,
            }}
            aria-hidden="true"
          />
        );
      })}

      <div
        ref={wrapperRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        {isButton && (
          <>
            <div className="cursor-invite-ring cursor-invite-ring--button" />
            <div className="cursor-invite-ring cursor-invite-ring--button cursor-invite-ring--delay" />
          </>
        )}
        {isLink && <div className="cursor-invite-ring cursor-invite-ring--link" />}

        <div
          ref={leadRef}
          className="h-3 w-3 transition-[background-color,opacity,box-shadow] duration-150"
          style={{
            borderRadius: 1,
            willChange: "transform",
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
