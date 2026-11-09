"use client";

import { useDesktop } from "./DesktopContext";

interface DesktopIcon {
  id: string;
  label: string;
  icon: string;
  targetId: string;
  badge?: string;
}

const icons: DesktopIcon[] = [
  {
    id: "creations",
    label: "Creations.exe",
    icon: "🖼️",
    targetId: "works",
    badge: "Art",
  },
  {
    id: "vn-sprites",
    label: "VN_Sprites.app",
    icon: "🎮",
    targetId: "demo",
    badge: "Demo",
  },
  {
    id: "krita",
    label: "Krita_5.2.exe",
    icon: "🎨",
    targetId: "krita",
    badge: "Studio",
  },
  {
    id: "bio",
    label: "About_Alma.txt",
    icon: "📝",
    targetId: "about",
  },
  {
    id: "contact",
    label: "Contact.msg",
    icon: "✉️",
    targetId: "contact",
    badge: "Open",
  },
];

/** Desktop shortcut column. Each shortcut opens its window in the manager. */
export function DesktopIcons() {
  const { openWindow, windowStates } = useDesktop();

  return (
    <div
      role="group"
      aria-label="Desktop shortcuts"
      className="absolute left-2 top-2 z-0 grid w-[calc(100%-1rem)] grid-cols-5 gap-1.5 sm:left-3 sm:top-3 sm:w-auto lg:left-4 lg:top-4 lg:grid-cols-1 lg:gap-2"
    >
      {icons.map((item) => {
        const isOpen = windowStates[item.targetId]?.open;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => openWindow(item.targetId)}
            aria-label={`Open ${item.label}`}
            className="group flex min-w-0 flex-col items-center gap-1 rounded-xs p-1 text-center transition-colors hover:bg-surface-light/50 focus-visible:bg-surface-light/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:flex-row lg:gap-2.5 lg:p-1.5 lg:text-left"
          >
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xs bg-surface text-xl windose-outset transition-transform group-hover:scale-105 sm:h-12 sm:w-12">
              <span aria-hidden="true">{item.icon}</span>
              {item.badge && (
                <span className="absolute -right-1.5 -top-1.5 rounded-full border border-white bg-accent px-1.5 py-0.5 text-[8px] font-bold leading-none text-white">
                  {item.badge}
                </span>
              )}
              {isOpen && (
                <span
                  className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full border border-white bg-emerald-500"
                  aria-hidden="true"
                />
              )}
            </span>
            <span className="max-w-full truncate text-[9px] font-bold text-foreground group-hover:text-accent group-hover:underline sm:text-[10px] lg:text-xs">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
