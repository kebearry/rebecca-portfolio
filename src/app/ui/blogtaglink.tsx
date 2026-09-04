"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { blogTagFilterHref } from "../lib/blog-posts";
import { HOME_SCROLL_TARGET_KEY } from "./backtohomesection";

type BlogTagLinkProps = {
  tag: string;
  className?: string;
};

export default function BlogTagLink({ tag, className }: BlogTagLinkProps) {
  const router = useRouter();
  const href = blogTagFilterHref(tag);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    sessionStorage.setItem(HOME_SCROLL_TARGET_KEY, "blog");
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {tag}
    </Link>
  );
}
