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

export function DesktopIcons() {
  return (
    <nav
      aria-label="Desktop Shortcuts"
      className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 p-4 bg-surface/80 windose-outset rounded-xs"
    >
      {icons.map((item) => (
        <a
          key={item.id}
          href={`#${item.targetId}`}
          className="group flex flex-col items-center text-center p-2 rounded-xs hover:bg-accent-soft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
        >
          <div className="relative w-12 h-12 flex items-center justify-center bg-background rounded-md windose-outset group-hover:scale-105 transition-transform">
            <span className="text-2xl" aria-hidden="true">
              {item.icon}
            </span>
            {item.badge && (
              <span className="absolute -top-1.5 -right-1.5 text-[9px] font-bold bg-accent text-white px-1.5 py-0.2 rounded-full border border-white leading-none">
                {item.badge}
              </span>
            )}
          </div>
          <span className="mt-2 text-[11px] font-sans font-bold text-foreground group-hover:text-accent group-hover:underline truncate max-w-[90px]">
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
