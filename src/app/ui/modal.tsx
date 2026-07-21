"use client";

import React, { ReactNode, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  initialFocusRef,
}) => {
  const titleId = useId();
  const descriptionId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => {
      initialFocusRef?.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, initialFocusRef]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-accent/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="relative w-full max-w-md glass-panel rounded-2xl p-6 sm:p-8 shadow-xl animate-[modal-enter_0.2s_ease-out]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start gap-4 mb-6">
          {icon && (
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/80 text-accent"
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          <div>
            <h2 id={titleId} className="text-xl font-bold text-accent">
              {title}
            </h2>
            {description && (
              <p
                id={descriptionId}
                className="mt-1 text-sm text-accent/70 leading-relaxed"
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
