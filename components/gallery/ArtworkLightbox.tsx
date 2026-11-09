"use client";

import Image from "next/image";
import { useLightbox } from "./LightboxContext";

export function ArtworkLightbox() {
  const { isOpen, activeItem, items, closeLightbox, nextItem, prevItem } = useLightbox();

  if (!isOpen || !activeItem) {
    return null;
  }

  const hasMultipleItems = items.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Artwork Viewer: ${activeItem.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1a0e13]/85 backdrop-blur-md animate-fade-in"
      onClick={closeLightbox}
    >
      {/* Modal Dialog Content Container (stops click propagation so clicking inside does not close) */}
      <div
        className="relative bg-background border-2 border-border-bold rounded-2xl screentone-shadow-lg max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar with Title and Close Button */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b-2 border-border-bold bg-surface/90">
          <div className="min-w-0">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground truncate">
              {activeItem.title}
            </h2>
            {activeItem.subtitle && (
              <p className="text-xs text-muted truncate font-medium">{activeItem.subtitle}</p>
            )}
          </div>

          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close artwork viewer"
            className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent text-background font-bold text-xs hover:opacity-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-xs"
          >
            <span>Close</span>
            <span aria-hidden="true">✕ ✿</span>
          </button>
        </div>

        {/* Artwork Canvas Stage with Polka Dot Screentone Matting */}
        <div className="relative flex-1 bg-surface/40 p-4 sm:p-6 overflow-y-auto flex flex-col items-center justify-center min-h-[300px]">
          {/* Subtle Screentone Backdrop */}
          <div className="absolute inset-0 screentone-hero opacity-30 pointer-events-none" aria-hidden="true" />

          {activeItem.src ? (
            <div className="relative z-10 w-full max-h-[58vh] aspect-video rounded-xl overflow-hidden border-2 border-border-bold bg-background shadow-md">
              <Image
                src={activeItem.src}
                alt={activeItem.alt || activeItem.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          ) : (
            <div className="relative z-10 p-8 sm:p-12 w-full max-w-lg rounded-2xl border-2 border-dashed border-border-bold bg-background/95 screentone-shadow text-center space-y-4">
              <div className="inline-flex p-4 rounded-full bg-surface border-2 border-border-bold text-accent shadow-xs">
                <span className="text-3xl" aria-hidden="true">🎨</span>
              </div>
              <div className="space-y-1">
                <p className="font-serif text-xl font-bold text-foreground">
                  {activeItem.title}
                </p>
                <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Full-Resolution Krita Master Canvas
                </p>
              </div>
              <p className="text-xs text-muted leading-relaxed max-w-sm mx-auto">
                Hand-painted in Krita on a digital drawing tablet at 3840 × 2160 resolution with dedicated polka dot screentone layers.
              </p>
            </div>
          )}

          {/* Navigation Controls (when multiple items are registered) */}
          {hasMultipleItems && (
            <div className="relative z-10 flex items-center justify-between w-full max-w-md pt-4">
              <button
                type="button"
                onClick={prevItem}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-background border-2 border-border-bold text-xs font-bold text-foreground hover:bg-surface transition-colors shadow-2xs"
              >
                <span aria-hidden="true">←</span>
                <span>Previous</span>
              </button>

              <span className="text-xs text-muted font-mono font-semibold">
                Use Arrow Keys ← →
              </span>

              <button
                type="button"
                onClick={nextItem}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-background border-2 border-border-bold text-xs font-bold text-foreground hover:bg-surface transition-colors shadow-2xs"
              >
                <span>Next</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Details Strip */}
        <div className="px-6 py-4 bg-surface/90 border-t-2 border-border-bold space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <span className="text-accent" aria-hidden="true">✿</span>
              {activeItem.year && <span className="text-muted">{activeItem.year}</span>}
            </span>
            <span className="text-[11px] font-mono text-accent font-bold bg-background px-2.5 py-0.5 rounded-full border border-border">
              ESC to close
            </span>
          </div>

          {activeItem.caption && (
            <p className="text-muted italic font-serif text-sm">{activeItem.caption}</p>
          )}

          {activeItem.highlights && activeItem.highlights.length > 0 && (
            <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed pl-1">
              {activeItem.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
