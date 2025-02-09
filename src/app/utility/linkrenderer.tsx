"use client";

import React from "react";
import { ReactNode } from "react";

interface LinkRendererProps {
  href?: string;
  children?: ReactNode;
}

const protectedSites =
  process.env.NEXT_PUBLIC_PROTECTED_SITES?.split(",") || []; // Use environment variable for protected sites
console.log(protectedSites);
const password = process.env.NEXT_PUBLIC_PASSWORD || "defaultpassword"; // Use environment variable for password

function LinkRenderer({ href, children }: LinkRendererProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Check if the clicked link starts with any of the protected sites in the array
    const isProtected = protectedSites.some((site) => href?.startsWith(site));

    if (isProtected) {
      e.preventDefault(); // Prevent the default link behavior for protected links

      // Prompt for password only if the link is protected
      const userPassword = prompt("Enter the password to access this site:");

      if (href && userPassword === password) {
        // If password is correct, manually redirect to the destination URL
        window.location.href = href; // Correct way to trigger the redirect
      } else {
        alert("Incorrect password!"); // Show error if password is incorrect
      }
    }
  };

  const isProtected = protectedSites.some((site) => href?.startsWith(site));

  return (
    <a
      href={isProtected ? "#" : href} // Set href to "#" for protected links to hide the URL in the status bar
      onClick={handleClick}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default LinkRenderer;
