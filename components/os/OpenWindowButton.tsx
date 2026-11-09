"use client";

import type { ReactNode } from "react";
import { useDesktop } from "./DesktopContext";

interface OpenWindowButtonProps {
  windowId: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

/** Button that opens a desktop window from server-rendered content. */
export function OpenWindowButton({
  windowId,
  className = "",
  ariaLabel,
  children,
}: OpenWindowButtonProps) {
  const { openWindow } = useDesktop();

  return (
    <button
      type="button"
      onClick={() => openWindow(windowId)}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}
