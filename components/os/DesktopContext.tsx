"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { TitlebarVariant } from "./WindowFrame";

/** Static configuration for a desktop window. Content is rendered by the server. */
export interface DesktopWindowDefinition {
  id: string;
  title: string;
  /** Short label used by the taskbar and Start menu. */
  label: string;
  icon: string;
  titlebarVariant: TitlebarVariant;
  menuBar?: boolean;
  statusBar?: string;
  width?: number;
  height?: number;
  initialPosition?: { x: number; y: number };
  content: ReactNode;
}

/** Runtime state owned by the desktop window manager. */
export interface WindowRuntimeState {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  x: number;
  y: number;
  z: number;
}

export interface DesktopContextValue {
  windows: DesktopWindowDefinition[];
  windowStates: Record<string, WindowRuntimeState>;
  activeWindowId: string | null;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  toggleWindowFromTaskbar: (id: string) => void;
}

export const DesktopContext = createContext<DesktopContextValue | undefined>(
  undefined,
);

export function useDesktop(): DesktopContextValue {
  const context = useContext(DesktopContext);

  if (!context) {
    throw new Error("useDesktop must be used within a Desktop provider.");
  }

  return context;
}
