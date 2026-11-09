"use client";

import type {
  CSSProperties,
  PointerEvent,
  ReactNode,
  Ref,
} from "react";

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
  id: string;
  title: string;
  icon?: string;
  menuBar?: boolean;
  statusBar?: string;
  titlebarVariant?: TitlebarVariant;
  active?: boolean;
  maximized?: boolean;
  hidden?: boolean;
  draggable?: boolean;
  style?: CSSProperties;
  className?: string;
  frameRef?: Ref<HTMLElement>;
  onFocus?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onTitlebarPointerDown?: (event: PointerEvent<HTMLDivElement>) => void;
  onTitlebarPointerMove?: (event: PointerEvent<HTMLDivElement>) => void;
  onTitlebarPointerUp?: (event: PointerEvent<HTMLDivElement>) => void;
  onTitlebarDoubleClick?: () => void;
  children: ReactNode;
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
  titlebarVariant = "pink",
  active = true,
  maximized = false,
  hidden = false,
  draggable = true,
  style,
  className = "",
  frameRef,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onTitlebarPointerDown,
  onTitlebarPointerMove,
  onTitlebarPointerUp,
  onTitlebarDoubleClick,
  children,
}: WindowFrameProps) {
  const titlebarStyle = active
    ? { background: TITLEBAR_GRADIENTS[titlebarVariant] }
    : undefined;

  return (
    <section
      ref={frameRef}
      id={`window-${id}`}
      aria-labelledby={`window-${id}-title`}
      tabIndex={-1}
      hidden={hidden}
      data-window-frame
      data-maximized={maximized}
      data-active={active}
      style={style}
      onPointerDown={() => onFocus?.()}
      className={`os-window windose-outset bg-surface rounded-xs overflow-hidden screentone-shadow-lg ${className}`}
    >
      {/* Retro Title Bar */}
      <div
        className={`os-window-titlebar px-3 py-1.5 flex items-center justify-between select-none text-white ${
          active ? "" : "windose-titlebar-inactive"
        } ${draggable ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
        style={titlebarStyle}
        onPointerDown={onTitlebarPointerDown}
        onPointerMove={onTitlebarPointerMove}
        onPointerUp={onTitlebarPointerUp}
        onPointerCancel={onTitlebarPointerUp}
        onDoubleClick={onTitlebarDoubleClick}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm shrink-0" aria-hidden="true">
            {icon}
          </span>
          <h2
            id={`window-${id}-title`}
            className="font-sans font-bold text-xs sm:text-sm tracking-wide text-white truncate drop-shadow-xs"
          >
            {title}
          </h2>
        </div>

        {/* Pixel Control Buttons (_ □ ✕) */}
        <div
          className="flex items-center gap-1 shrink-0 ml-2"
          onPointerDown={(event) => event.stopPropagation()}
          onDoubleClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Minimize window"
            onClick={onMinimize}
            className="flex h-6 w-6 items-center justify-center windose-btn font-mono text-sm font-bold leading-none text-foreground hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-5 sm:w-5 sm:text-xs"
          >
            _
          </button>
          <button
            type="button"
            aria-label={maximized ? "Restore window" : "Maximize window"}
            aria-pressed={maximized}
            onClick={onMaximize}
            className="hidden h-6 w-6 items-center justify-center windose-btn font-mono text-sm font-bold leading-none text-foreground hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-5 sm:w-5 sm:text-xs lg:flex"
          >
            □
          </button>
          <button
            type="button"
            aria-label="Close window"
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center windose-btn font-mono text-sm font-bold leading-none text-foreground hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-5 sm:w-5 sm:text-xs"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Retro Menu Bar (decorative) */}
      {menuBar && (
        <div
          aria-hidden="true"
          className="px-3 py-1 bg-surface border-b border-border text-xs font-sans text-foreground flex items-center gap-4 select-none"
        >
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Palette</span>
          <span>Help</span>
        </div>
      )}

      {/* Window Body Canvas */}
      <div className="flex-1 min-h-0 overflow-y-auto bg-background screentone-subtle windose-inset m-1.5 p-4 sm:p-6">
        {children}
      </div>

      {/* Retro Status Bar */}
      {statusBar && (
        <div className="px-3 py-1 bg-surface text-[11px] font-sans text-muted flex items-center justify-between border-t border-border select-none">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-2 h-2 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span className="retro-cursor truncate">{statusBar}</span>
          </div>
          <span className="font-mono text-[10px] text-muted shrink-0 ml-2">
            WINDOSE 98 SE
          </span>
        </div>
      )}
    </section>
  );
}
