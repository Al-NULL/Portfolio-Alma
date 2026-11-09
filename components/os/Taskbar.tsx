"use client";

import { useEffect, useRef, useState } from "react";
import { useDesktop } from "./DesktopContext";

/** Formats a Date into a locale-aware HH:MM:SS string using Spanish locale. */
function formatTime(date: Date): string {
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function Taskbar() {
  const {
    windows,
    windowStates,
    activeWindowId,
    openWindow,
    toggleWindowFromTaskbar,
  } = useDesktop();

  const [startOpen, setStartOpen] = useState(false);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const startMenuRef = useRef<HTMLDivElement>(null);
  const firstMenuItemRef = useRef<HTMLButtonElement>(null);

  /* Live clock — initialised server-safe (empty string), then hydrated.
   * We use an empty string as the SSR default to avoid hydration mismatches,
   * since the server has no access to the client's local time. */
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));

    // Kick off immediately on mount, then update every second
    const interval = setInterval(tick, 1000);
    tick();

    return () => clearInterval(interval);
  }, []);

  // Close the Start menu on outside click or Escape.
  useEffect(() => {
    if (!startOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        startMenuRef.current?.contains(target) ||
        startButtonRef.current?.contains(target)
      ) {
        return;
      }

      setStartOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setStartOpen(false);
      startButtonRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [startOpen]);

  // Move keyboard focus into the menu when it opens.
  useEffect(() => {
    if (startOpen) {
      firstMenuItemRef.current?.focus();
    }
  }, [startOpen]);

  const openWindows = windows.filter(
    (definition) => windowStates[definition.id]?.open,
  );

  return (
    <>
      {/* Start Menu Pop-up Window */}
      {startOpen && (
        <div
          ref={startMenuRef}
          id="start-menu"
          role="group"
          aria-label="Start menu"
          className="absolute bottom-full left-0 z-50 mb-1 max-h-[calc(100dvh-4rem)] w-72 max-w-[calc(100vw-1rem)] overflow-y-auto windose-outset bg-surface p-1.5 shadow-2xl"
        >
          <div className="flex gap-2">
            {/* Vertical Pink Title Strip */}
            <div className="w-8 windose-titlebar flex items-end justify-center rounded-xs py-4">
              <span className="whitespace-nowrap font-serif text-xs font-bold tracking-widest text-white -rotate-90">
                WINDOSE 98
              </span>
            </div>

            <div role="group" aria-label="Programs" className="min-w-0 flex-1">
              <p className="px-2 pb-1 pt-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                Programs
              </p>
              <ul className="m-0 list-none space-y-1 p-0 text-xs font-sans text-foreground">
                {windows.map((definition, index) => {
                  const isOpen = windowStates[definition.id]?.open;

                  return (
                    <li key={definition.id}>
                      <button
                        ref={index === 0 ? firstMenuItemRef : undefined}
                        type="button"
                        onClick={() => {
                          openWindow(definition.id);
                          setStartOpen(false);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xs p-2 text-left transition-colors hover:bg-accent hover:text-white focus-visible:bg-accent focus-visible:text-white focus-visible:outline-none"
                      >
                        <span className="shrink-0" aria-hidden="true">
                          {definition.icon}
                        </span>
                        <span className="min-w-0 flex-1 truncate font-semibold">
                          {definition.label}
                        </span>
                        {isOpen && (
                          <span className="shrink-0 rounded-full border border-border bg-background px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase text-accent">
                            open
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <p className="mt-1.5 border-t border-border px-2 py-1.5 text-[10px] font-mono text-muted">
            Alma Studio • Barcelona, Spain
          </p>
        </div>
      )}

      {/* Main Bottom Retro Taskbar */}
      <aside
        role="region"
        aria-label="Desktop taskbar"
        className="relative z-30 flex h-10 shrink-0 select-none items-center justify-between gap-2 border-t-2 border-white bg-surface px-2 shadow-lg"
      >
        {/* Start Button & Running Window Tabs */}
        <div className="flex min-w-0 items-center gap-1.5 overflow-x-auto">
          <button
            ref={startButtonRef}
            type="button"
            data-taskbar-start
            onClick={() => setStartOpen((current) => !current)}
            aria-expanded={startOpen}
            aria-controls="start-menu"
            className={`flex shrink-0 items-center gap-1.5 px-3 py-1 windose-btn text-xs font-bold font-sans ${
              startOpen ? "windose-inset bg-accent-soft" : ""
            }`}
          >
            <span className="text-sm text-accent" aria-hidden="true">
              ✿
            </span>
            <span>Start</span>
          </button>

          {openWindows.map((definition) => {
            const state = windowStates[definition.id];
            const isActive =
              activeWindowId === definition.id && !state.minimized;

            return (
              <button
                key={definition.id}
                type="button"
                data-taskbar-window={definition.id}
                onClick={() => toggleWindowFromTaskbar(definition.id)}
                aria-pressed={isActive}
                aria-controls={`window-${definition.id}`}
                title={definition.title}
                className={`flex shrink-0 items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? "windose-inset bg-accent-soft"
                    : "windose-btn hover:bg-surface-light"
                } ${state.minimized ? "opacity-60" : ""}`}
              >
                <span aria-hidden="true">{definition.icon}</span>
                <span className="hidden max-w-[120px] truncate sm:inline">
                  {definition.label}
                </span>
                {state.minimized && (
                  <span className="sr-only">(minimized)</span>
                )}
              </button>
            );
          })}
        </div>

        {/* System Tray & Retro Clock */}
        <div className="flex shrink-0 items-center gap-2 pl-2">
          <div className="flex items-center gap-1 bg-background px-2.5 py-1 windose-inset text-xs font-mono">
            <span className="hidden sm:inline" title="Visual Novel Lover">
              ♡
            </span>
            <span className="hidden sm:inline" title="Signal">
              📶
            </span>
            <span className="hidden sm:inline" title="Sound active">
              🔊
            </span>
            <span
              className="ml-0.5 font-mono text-[11px] font-bold text-accent retro-cursor sm:ml-1"
              aria-live="off"
              aria-label={`Current time: ${time}`}
            >
              {time || "──:──:──"}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
