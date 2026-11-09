import { artApproaches } from "@/content/profile";

export function Principles() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="py-16 border-t-2 border-border-bold">
      <div className="space-y-4 max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-accent font-bold flex items-center gap-1.5">
          <span aria-hidden="true">✿</span>
          <span>Artistic Technique & Philosophy</span>
        </p>
        <h2 id="approach-title" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Cute, professional & steeped in visual storytelling.
        </h2>
        <p className="text-muted text-base sm:text-lg leading-relaxed">
          Grounded in formal illustration training (CFGS in Barcelona) and a deep love for visual novels,
          my artistic practice unites traditional draftsmanship with the tactile charm of polka dot screentones and Krita painting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {artApproaches.map((approach) => (
          <article
            key={approach.number}
            aria-labelledby={`approach-${approach.number}-title`}
            className="relative p-7 sm:p-8 bg-surface/80 border-2 border-border-bold rounded-2xl screentone-shadow space-y-4 overflow-hidden"
          >
            {/* Highly Visible Screentone Halftone Polka Dots in the corner */}
            <div
              className="absolute top-0 right-0 w-24 h-24 screentone-dense opacity-60 rounded-bl-3xl pointer-events-none"
              aria-hidden="true"
            />

            <span className="inline-block font-serif text-xs font-bold text-accent tracking-widest bg-background px-3 py-1 rounded-full border border-border-bold shadow-2xs">
              Approach {approach.number}
            </span>

            <h3
              id={`approach-${approach.number}-title`}
              className="font-serif text-2xl font-bold text-foreground"
            >
              {approach.title}
            </h3>

            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {approach.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
