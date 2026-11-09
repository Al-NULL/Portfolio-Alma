import type { ReactNode } from "react";

/** Available per-window title bar color variants. */
export type TitlebarVariant =
  | "pink"
  | "violet"
  | "rose"
  | "teal"
  | "gold"
  | "lavender"
  | "magenta";

interface WindowFrameProps {
  id?: string;
  title: string;
  icon?: string;
  menuBar?: boolean;
  statusBar?: string;
  children: ReactNode;
  className?: string;
  /** Gradient color variant for the window's title bar. Defaults to "pink". */
  titlebarVariant?: TitlebarVariant;
}

/** Maps each variant to its CSS gradient declaration. */
const TITLEBAR_GRADIENTS: Record<TitlebarVariant, string> = {
  pink: "linear-gradient(90deg, #c2255c 0%, #e05380 60%, #ff8fab 100%)",
  violet: "linear-gradient(90deg, #6d28d9 0%, #8b5cf6 60%, #a78bfa 100%)",
  rose: "linear-gradient(90deg, #e11d48 0%, #f43f5e 60%, #fb7185 100%)",
  teal: "linear-gradient(90deg, #0d9488 0%, #14b8a6 60%, #5eead4 100%)",
  gold: "linear-gradient(90deg, #b45309 0%, #d97706 60%, #fbbf24 100%)",
  lavender: "linear-gradient(90deg, #5b21b6 0%, #7c3aed 60%, #c4b5fd 100%)",
  magenta: "linear-gradient(90deg, #be185d 0%, #db2777 60%, #f472b6 100%)",
};

export function WindowFrame({
  id,
  title,
  icon = "✿",
  menuBar = false,
  statusBar,
  children,
  className = "",
  titlebarVariant = "pink",
}: WindowFrameProps) {
  const titlebarStyle = { background: TITLEBAR_GRADIENTS[titlebarVariant] };
  return (
    <section
      id={id}
      aria-label={title}
      className={`windose-outset bg-surface rounded-xs overflow-hidden screentone-shadow-lg ${className}`}
    >
      {/* Retro Title Bar */}
      <div
        className="px-3 py-1.5 flex items-center justify-between select-none text-white"
        style={titlebarStyle}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm shrink-0" aria-hidden="true">
            {icon}
          </span>
          <h2 className="font-sans font-bold text-xs sm:text-sm tracking-wide text-white truncate drop-shadow-xs">
            {title}
          </h2>
        </div>

        {/* Pixel Control Buttons (_ □ ✕) */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button
            type="button"
            aria-label="Minimize window"
            className="w-5 h-5 windose-btn text-foreground font-mono font-bold text-xs flex items-center justify-center leading-none hover:bg-surface-light focus-visible:outline-none"
          >
            _
          </button>
          <button
            type="button"
            aria-label="Maximize window"
            className="w-5 h-5 windose-btn text-foreground font-mono font-bold text-xs flex items-center justify-center leading-none hover:bg-surface-light focus-visible:outline-none"
          >
            □
          </button>
          <button
            type="button"
            aria-label="Close window"
            className="w-5 h-5 windose-btn text-foreground font-mono font-bold text-xs flex items-center justify-center leading-none hover:bg-accent hover:text-white focus-visible:outline-none"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Retro Menu Bar (File, Edit, View, Help) */}
      {menuBar && (
        <div className="px-3 py-1 bg-surface border-b border-border text-xs font-sans text-foreground flex items-center gap-4 select-none">
          <span className="hover:underline cursor-pointer">File</span>
          <span className="hover:underline cursor-pointer">Edit</span>
          <span className="hover:underline cursor-pointer">View</span>
          <span className="hover:underline cursor-pointer">Palette</span>
          <span className="hover:underline cursor-pointer">Help</span>
        </div>
      )}

      {/* Window Body Canvas */}
      <div className="p-4 sm:p-6 bg-background windose-inset m-1.5">{children}</div>

      {/* Retro Status Bar */}
      {statusBar && (
        <div className="px-3 py-1 bg-surface text-[11px] font-sans text-muted flex items-center justify-between border-t border-border select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="retro-cursor">{statusBar}</span>
          </div>
          <span className="font-mono text-[10px] text-muted">WINDOSE 98 SE</span>
        </div>
      )}
    </section>
  );
}
