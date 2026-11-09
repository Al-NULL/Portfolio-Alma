"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DesktopContext,
  type DesktopContextValue,
  type DesktopWindowDefinition,
  type WindowRuntimeState,
} from "./DesktopContext";
import { DesktopIcons } from "./DesktopIcons";
import { DesktopWindow } from "./DesktopWindow";
import { Taskbar } from "./Taskbar";

interface DesktopProps {
  windows: DesktopWindowDefinition[];
}

export type { DesktopWindowDefinition } from "./DesktopContext";

/** Builds deterministic initial window state so server and client markup match. */
function createInitialWindowStates(
  windows: DesktopWindowDefinition[],
): Record<string, WindowRuntimeState> {
  return windows.reduce<Record<string, WindowRuntimeState>>(
    (states, definition, index) => {
      const initialPosition = definition.initialPosition ?? {
        x: 160 + index * 24,
        y: 24 + index * 24,
      };

      states[definition.id] = {
        open: index === 0,
        minimized: false,
        maximized: false,
        x: initialPosition.x,
        y: initialPosition.y,
        z: index + 1,
      };

      return states;
    },
    {},
  );
}

/** Full-viewport desktop shell that owns window state and layout. */
export function Desktop({ windows }: DesktopProps) {
  const [windowStates, setWindowStates] = useState<
    Record<string, WindowRuntimeState>
  >(() => createInitialWindowStates(windows));

  const zCounterRef = useRef(windows.length + 1);
  const workspaceRef = useRef<HTMLDivElement>(null);

  const focusWindow = useCallback((id: string) => {
    const nextZ = zCounterRef.current + 1;
    zCounterRef.current = nextZ;

    setWindowStates((previous) => {
      const state = previous[id];

      if (!state || !state.open || state.minimized) return previous;

      return { ...previous, [id]: { ...state, z: nextZ } };
    });
  }, []);

  const openWindow = useCallback((id: string) => {
    const nextZ = zCounterRef.current + 1;
    zCounterRef.current = nextZ;

    setWindowStates((previous) => {
      const state = previous[id];

      if (!state) return previous;

      return {
        ...previous,
        [id]: { ...state, open: true, minimized: false, z: nextZ },
      };
    });

    // Wait for the window to become visible before moving focus into it.
    window.requestAnimationFrame(() => {
      document.getElementById(`window-${id}`)?.focus({ preventScroll: true });
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindowStates((previous) => {
      const state = previous[id];

      if (!state) return previous;

      return {
        ...previous,
        [id]: {
          ...state,
          open: false,
          minimized: false,
          maximized: false,
        },
      };
    });
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindowStates((previous) => {
      const state = previous[id];

      if (!state || !state.open) return previous;

      return {
        ...previous,
        [id]: { ...state, minimized: true },
      };
    });
  }, []);

  const toggleMaximizeWindow = useCallback((id: string) => {
    const nextZ = zCounterRef.current + 1;
    zCounterRef.current = nextZ;

    setWindowStates((previous) => {
      const state = previous[id];

      if (!state) return previous;

      return {
        ...previous,
        [id]: {
          ...state,
          open: true,
          minimized: false,
          maximized: !state.maximized,
          z: nextZ,
        },
      };
    });
  }, []);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindowStates((previous) => {
      const state = previous[id];

      if (!state || (state.x === x && state.y === y)) return previous;

      return { ...previous, [id]: { ...state, x, y } };
    });
  }, []);

  // The active window is always the topmost visible one.
  const activeWindowId = useMemo(() => {
    let topmostId: string | null = null;
    let topmostZ = -Infinity;

    for (const [id, state] of Object.entries(windowStates)) {
      if (!state.open || state.minimized) continue;

      if (state.z > topmostZ) {
        topmostId = id;
        topmostZ = state.z;
      }
    }

    return topmostId;
  }, [windowStates]);

  const toggleWindowFromTaskbar = useCallback(
    (id: string) => {
      const state = windowStates[id];

      if (!state?.open || state.minimized) {
        openWindow(id);
        return;
      }

      if (activeWindowId === id) {
        minimizeWindow(id);
        return;
      }

      focusWindow(id);
    },
    [
      activeWindowId,
      focusWindow,
      minimizeWindow,
      openWindow,
      windowStates,
    ],
  );

  // Keep floating windows inside the workspace when the viewport changes.
  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;

    const clampPositions = () => {
      if (window.matchMedia("(max-width: 1023px)").matches) return;

      const workspaceRect = workspace.getBoundingClientRect();

      setWindowStates((previous) => {
        let changed = false;
        const next = { ...previous };

        for (const definition of windows) {
          const state = previous[definition.id];

          if (!state || state.maximized) continue;

          const frame = document.getElementById(
            `window-${definition.id}`,
          );
          const frameWidth =
            frame?.offsetWidth || definition.width || 720;
          const frameHeight =
            frame?.offsetHeight || definition.height || 560;
          const maxX = Math.max(0, workspaceRect.width - frameWidth);
          const maxY = Math.max(0, workspaceRect.height - frameHeight);
          const x = Math.min(Math.max(0, state.x), maxX);
          const y = Math.min(Math.max(0, state.y), maxY);

          if (x !== state.x || y !== state.y) {
            next[definition.id] = { ...state, x, y };
            changed = true;
          }
        }

        return changed ? next : previous;
      });
    };

    clampPositions();
    window.addEventListener("resize", clampPositions);

    return () => window.removeEventListener("resize", clampPositions);
  }, [windows]);

  const contextValue = useMemo<DesktopContextValue>(
    () => ({
      windows,
      windowStates,
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      toggleMaximizeWindow,
      focusWindow,
      moveWindow,
      toggleWindowFromTaskbar,
    }),
    [
      activeWindowId,
      closeWindow,
      focusWindow,
      minimizeWindow,
      moveWindow,
      openWindow,
      toggleMaximizeWindow,
      toggleWindowFromTaskbar,
      windowStates,
      windows,
    ],
  );

  const openWindowCount = windows.filter(
    (definition) => windowStates[definition.id]?.open,
  ).length;

  return (
    <DesktopContext.Provider value={contextValue}>
      <div className="crt-overlay flex h-full min-h-0 flex-col overflow-hidden bg-background screentone-hero">
        <header className="relative z-20 flex h-8 shrink-0 select-none items-center justify-between gap-3 border-b-2 border-surface-dark bg-surface px-3 text-[11px] font-bold">
          <h1 className="sr-only">
            Alma — Digital Artist &amp; Illustrator desktop portfolio
          </h1>

          <div className="flex min-w-0 items-center gap-2">
            <span className="text-base text-accent" aria-hidden="true">
              ✿
            </span>
            <span className="font-serif text-sm font-bold tracking-tight text-foreground">
              Alma
            </span>
            <span className="hidden truncate text-muted sm:inline">
              WINDOSE 98 (Alma Studio Edition)
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2 font-mono text-[10px] text-muted">
            <span className="hidden sm:inline">Barcelona, Spain</span>
            <span className="hidden sm:inline" aria-hidden="true">
              •
            </span>
            <span className="text-accent">Krita Studio Active</span>
          </div>
        </header>

        <section
          ref={workspaceRef}
          aria-label="Desktop workspace"
          className="relative isolate min-h-0 flex-1 overflow-hidden"
        >
          <DesktopIcons />

          {openWindowCount === 0 && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
              <div className="windose-outset max-w-sm bg-surface/95 p-6 text-center">
                <span className="text-3xl" aria-hidden="true">
                  ✿
                </span>
                <p className="mt-2 font-serif text-xl font-bold text-foreground">
                  Alma Studio Desktop
                </p>
                <p className="mt-1 text-xs text-muted">
                  Open a program from the desktop shortcuts or the Start menu.
                </p>
              </div>
            </div>
          )}

          {windows.map((definition) => (
            <DesktopWindow
              key={definition.id}
              definition={definition}
              workspaceRef={workspaceRef}
            />
          ))}
        </section>

        <Taskbar />
      </div>
    </DesktopContext.Provider>
  );
}
