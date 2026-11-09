"use client";

import { useState, useEffect } from "react";

/** Formats a Date into a locale-aware HH:MM:SS string using Spanish locale. */
function formatTime(date: Date): string {
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function Taskbar() {
  const [startOpen, setStartOpen] = useState(false);

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

  return (
    <>
      {/* Start Menu Pop-up Window */}
      {startOpen && (
        <div
          role="menu"
          aria-label="Start Menu"
          className="fixed bottom-11 left-2 z-50 w-64 windose-outset bg-surface shadow-2xl p-1.5 space-y-1.5 animate-fade-in"
        >
          {/* Vertical Pink Title Strip */}
          <div className="flex gap-2">
            <div className="w-8 windose-titlebar flex items-end justify-center py-4 rounded-xs">
              <span className="font-serif font-bold text-xs tracking-widest text-white -rotate-90 whitespace-nowrap">
                WINDOSE 98
              </span>
            </div>

            {/* Menu Links */}
            <div className="flex-1 space-y-1 text-xs font-sans text-foreground">
              <a
                href="#works"
                onClick={() => setStartOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-xs hover:bg-accent hover:text-white transition-colors"
              >
                <span>🖼️</span>
                <span className="font-semibold">Creations Gallery</span>
              </a>
              <a
                href="#demo"
                onClick={() => setStartOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-xs hover:bg-accent hover:text-white transition-colors"
              >
                <span>🎮</span>
                <span className="font-semibold">VN Sprite Switcher</span>
              </a>
              <a
                href="#krita"
                onClick={() => setStartOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-xs hover:bg-accent hover:text-white transition-colors"
              >
                <span>🎨</span>
                <span className="font-semibold">Krita Studio Palette</span>
              </a>
              <a
                href="#about"
                onClick={() => setStartOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-xs hover:bg-accent hover:text-white transition-colors"
              >
                <span>📝</span>
                <span className="font-semibold">About Alma & Studies</span>
              </a>
              <a
                href="#contact"
                onClick={() => setStartOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-xs hover:bg-accent hover:text-white transition-colors border-t border-border pt-2"
              >
                <span>✉️</span>
                <span className="font-bold text-accent hover:text-white">Contact & Commissions</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Retro Taskbar */}
      <aside
        role="region"
        aria-label="Desktop Taskbar"
        className="fixed bottom-0 inset-x-0 z-40 h-10 bg-surface border-t-2 border-white flex items-center justify-between px-2 shadow-lg select-none"
      >
        {/* Start Button & Active Window Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {/* Start Button */}
          <button
            type="button"
            onClick={() => setStartOpen(!startOpen)}
            aria-expanded={startOpen}
            className={`px-3 py-1 windose-btn flex items-center gap-1.5 font-bold text-xs font-sans shrink-0 ${
              startOpen ? "windose-inset bg-accent-soft" : ""
            }`}
          >
            <span className="text-accent text-sm" aria-hidden="true">
              ✿
            </span>
            <span>Start</span>
          </button>

          {/* Quick-Nav Window Tabs */}
          <a
            href="#works"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 windose-btn text-xs font-medium text-foreground hover:bg-surface-light shrink-0 truncate max-w-[140px]"
          >
            <span aria-hidden="true">🖼️</span>
            <span>Creations</span>
          </a>

          <a
            href="#demo"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 windose-btn text-xs font-medium text-foreground hover:bg-surface-light shrink-0 truncate max-w-[140px]"
          >
            <span aria-hidden="true">🎮</span>
            <span>VN_Demo</span>
          </a>

          <a
            href="#about"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 windose-btn text-xs font-medium text-foreground hover:bg-surface-light shrink-0 truncate max-w-[140px]"
          >
            <span aria-hidden="true">📝</span>
            <span>About.txt</span>
          </a>
        </div>

        {/* System Tray & Retro Clock */}
        <div className="flex items-center gap-2 pl-2 shrink-0">
          <div className="flex items-center gap-1 px-2.5 py-1 windose-inset bg-background text-xs font-mono">
            <span title="Visual Novel Lover" aria-label="Heart">
              ♡
            </span>
            <span title="Signal" aria-label="Signal">
              📶
            </span>
            <span title="Sound Active" aria-label="Audio">
              🔊
            </span>
            <span
              className="ml-1 text-[11px] font-bold text-accent font-mono retro-cursor"
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
