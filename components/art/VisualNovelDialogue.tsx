export function VisualNovelDialogue() {
  return (
    <aside
      aria-label="Artist Welcome Dialogue"
      className="relative p-6 sm:p-8 bg-surface border-2 border-border-bold rounded-2xl screentone-shadow-lg overflow-hidden space-y-4"
    >
      {/* Decorative polka dot corner pattern */}
      <div
        className="absolute top-0 right-0 w-28 h-28 screentone-dense opacity-40 rounded-bl-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Visual Novel Nameplate */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent text-background rounded-full font-serif font-bold text-sm tracking-wide shadow-xs">
        <span>Alma</span>
        <span className="text-xs" aria-hidden="true">✿</span>
        <span className="text-[11px] font-sans font-medium opacity-90 tracking-normal">
          (Digital Artist & Illustrator)
        </span>
      </div>

      {/* Dialogue Message */}
      <div className="relative font-serif text-lg sm:text-xl text-foreground leading-relaxed">
        <p>
          &ldquo;Welcome to my digital art studio! I paint cute, heartfelt characters and narrative scenes
          using a digital tablet in <span className="font-semibold text-accent">Krita</span>.
          My favorite technique is blending soft pink palettes with nostalgic <span className="font-semibold text-accent">polka dot screentones</span>.
          Take a look around my creations!&rdquo;
        </p>
      </div>

      {/* Visual Novel Dialogue Prompt Indicator */}
      <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border/80">
        <span className="font-sans font-medium flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-ping" aria-hidden="true" />
          <span>Barcelona, Spain • Active in Visual Novels & Narrative Art</span>
        </span>
        <span className="text-accent font-bold text-sm animate-bounce" aria-hidden="true">
          ▼
        </span>
      </div>
    </aside>
  );
}
