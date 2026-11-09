export function PaletteSwatches() {
  const swatches = [
    { name: "Sakura Pink", hex: "#FFB3C6", role: "Light & Petals" },
    { name: "Strawberry Ink", hex: "#C2255C", role: "Primary Accent" },
    { name: "Halftone Rose", hex: "#E8A2B7", role: "Polka Dots Screentone" },
    { name: "Barcelona Dusk", hex: "#4A2838", role: "Shadows & Lineart" },
    { name: "Warm Canvas", hex: "#FFF8F9", role: "Paper Base" },
  ];

  return (
    <div
      aria-label="Krita Studio Palette"
      className="p-5 bg-surface/70 border-2 border-border-bold rounded-2xl screentone-shadow space-y-3"
    >
      <div className="flex items-center justify-between gap-2 border-b border-border pb-2">
        <p className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
          <span aria-hidden="true">🎨</span>
          <span>Krita Digital Palette & Swatches</span>
        </p>
        <span className="text-[11px] font-medium text-muted">Hand-mixed in Barcelona</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
        {swatches.map((swatch) => (
          <div
            key={swatch.name}
            className="flex items-center sm:flex-col sm:items-start gap-2.5 p-2 bg-background rounded-lg border border-border"
          >
            <span
              className="w-7 h-7 sm:w-full sm:h-10 rounded-md border border-border-bold shadow-2xs shrink-0"
              style={{ backgroundColor: swatch.hex }}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{swatch.name}</p>
              <p className="text-[10px] text-muted font-mono">{swatch.hex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
