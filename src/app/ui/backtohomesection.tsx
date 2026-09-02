"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export const HOME_SCROLL_TARGET_KEY = "home-scroll-target";

type BackToHomeSectionProps = {
  section: "banner" | "projects" | "blog" | "timeline" | "contact";
  className?: string;
  children: ReactNode;
};

export default function BackToHomeSection({
  section,
  className,
  children,
}: BackToHomeSectionProps) {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    sessionStorage.setItem(HOME_SCROLL_TARGET_KEY, section);
    router.push("/");
  };

  return (
    <Link href={`/#${section}`} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
