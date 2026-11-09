import { artApproaches } from "@/content/profile";

interface PrinciplesProps {
  /** Renders without the outer page-section spacing when placed inside a desktop window. */
  embedded?: boolean;
}

export function Principles({ embedded = false }: PrinciplesProps) {
  return (
    <section
      aria-labelledby="approach-title"
      className={embedded ? "space-y-8" : "border-t-2 border-border-bold py-16"}
    >
      <div className="max-w-2xl space-y-4">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent">
          <span aria-hidden="true">✿</span>
          <span>Artistic Technique &amp; Philosophy</span>
        </p>
        <h3
          id="approach-title"
          className={`font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl ${
            embedded ? "" : "md:text-5xl"
          }`}
        >
          Cute, professional &amp; steeped in visual storytelling.
        </h3>
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          Grounded in formal illustration training (CFGS in Barcelona) and a
          deep love for visual novels, my artistic practice unites traditional
          draftsmanship with the tactile charm of polka dot screentones and
          Krita painting.
        </p>
      </div>

      <div
        className={`grid grid-cols-1 gap-8 md:grid-cols-2 ${
          embedded ? "mt-8" : "mt-12"
        }`}
      >
        {artApproaches.map((approach) => (
          <article
            key={approach.number}
            aria-labelledby={`approach-${approach.number}-title`}
            className="relative space-y-4 overflow-hidden rounded-2xl border-2 border-border-bold bg-surface/80 p-7 screentone-shadow sm:p-8"
          >
            {/* Highly Visible Screentone Halftone Polka Dots in the corner */}
            <div
              className="absolute right-0 top-0 h-24 w-24 rounded-bl-3xl opacity-60 screentone-dense pointer-events-none"
              aria-hidden="true"
            />

            <span className="inline-block rounded-full border border-border-bold bg-background px-3 py-1 font-serif text-xs font-bold tracking-widest text-accent shadow-2xs">
              Approach {approach.number}
            </span>

            <h4
              id={`approach-${approach.number}-title`}
              className="font-serif text-2xl font-bold text-foreground"
            >
              {approach.title}
            </h4>

            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {approach.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
