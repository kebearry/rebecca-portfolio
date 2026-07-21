"use client";

import React, { ReactNode } from "react";

interface LinkRendererProps {
  href?: string;
  children?: ReactNode;
}

const PROTECTED_PREFIX = "protected:";

function getProtectedId(href?: string): string | null {
  if (!href?.startsWith(PROTECTED_PREFIX)) return null;
  return href.slice(PROTECTED_PREFIX.length).trim() || null;
}

function LinkRenderer({ href, children }: LinkRendererProps) {
  const protectedId = getProtectedId(href);

  const handleClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!protectedId) return;

    e.preventDefault();

    const userPassword = prompt("Enter the password to access this site:");
    if (userPassword === null) return;

    try {
      const response = await fetch("/api/unlock-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: userPassword, id: protectedId }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.open(data.url, "_blank", "noopener,noreferrer");
      } else {
        alert(data.message || "Incorrect password!");
      }
    } catch {
      alert("Unable to unlock link. Please try again.");
    }
  };

  return (
    <a
      href={protectedId ? "#" : href}
      onClick={handleClick}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default LinkRenderer;
