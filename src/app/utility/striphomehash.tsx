"use client";

import { useEffect } from "react";

const HOME_SECTION_HASHES = new Set([
  "banner",
  "projects",
  "blog",
  "timeline",
  "contact",
]);

export default function StripHomeHash() {
  useEffect(() => {
    // Detail layouts only. Never rewrite the path; leave `/` alone if a
    // stale home hash somehow landed here during client navigation.
    if (window.location.pathname === "/") return;

    const hash = window.location.hash.replace("#", "");
    if (!HOME_SECTION_HASHES.has(hash)) return;

    const cleanUrl = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", cleanUrl);
  }, []);

  return null;
}
