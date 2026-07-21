"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { FaLock } from "react-icons/fa";
import Modal from "../ui/modal";

interface LinkRendererProps {
  href?: string;
  children?: ReactNode;
}

const PROTECTED_PREFIX = "protected:";

function getProtectedId(href?: string): string | null {
  if (!href?.startsWith(PROTECTED_PREFIX)) return null;
  return href.slice(PROTECTED_PREFIX.length).trim() || null;
}

function ProtectedLinkUnlock({
  open,
  protectedId,
  onClose,
}: {
  open: boolean;
  protectedId: string;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    setPassword("");
    setError("");
    setIsSubmitting(false);
  }, [open, protectedId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmed = password.trim();
    if (!trimmed) {
      setError("Please enter a password.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/unlock-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: trimmed, id: protectedId }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        onClose();
        window.open(data.url, "_blank", "noopener,noreferrer");
        return;
      }

      setError(data.message || "Incorrect password. Please try again.");
    } catch {
      setError("Unable to unlock link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Protected live site"
      description="This client project requires a password to view the live site. Enter it below to continue in a new tab."
      icon={<FaLock className="text-lg" />}
      initialFocusRef={inputRef}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="protected-link-password"
            className="block text-sm font-medium text-accent mb-1.5"
          >
            Password
          </label>
          <input
            ref={inputRef}
            id="protected-link-password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError("");
            }}
            autoComplete="off"
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 glass rounded-lg border border-white/60 focus:ring-2 focus:ring-secondary focus:border-accent transition duration-200 text-accent bg-white/40 disabled:opacity-60"
            placeholder="Enter password"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-full font-semibold text-accent border border-accent/30 hover:bg-white/40 transition duration-200 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-full font-semibold bg-accent text-primary border border-accent hover:bg-accent/90 transition duration-200 disabled:opacity-60"
          >
            {isSubmitting ? "Unlocking…" : "Unlock site"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function LinkRenderer({ href, children }: LinkRendererProps) {
  const protectedId = getProtectedId(href);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!protectedId) return;

    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <a
        href={protectedId ? "#" : href}
        onClick={handleClick}
        target={protectedId ? undefined : "_blank"}
        rel={protectedId ? undefined : "noreferrer"}
        className="text-accent font-medium underline underline-offset-2 hover:text-accent/70 transition-colors"
        aria-haspopup={protectedId ? "dialog" : undefined}
      >
        {children}
      </a>

      {protectedId && (
        <ProtectedLinkUnlock
          open={isModalOpen}
          protectedId={protectedId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default LinkRenderer;
