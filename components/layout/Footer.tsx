import { profile } from "@/content/profile";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer
      role="contentinfo"
      className="relative w-full border-t-2 border-surface-dark bg-surface text-foreground py-12 px-6 mt-20 pb-24"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 pt-2">
        <div className="space-y-3 max-w-md">
          <div className="flex items-center gap-2">
            <span className="text-accent text-lg" aria-hidden="true">
              ✿
            </span>
            <p className="font-serif text-xl font-bold tracking-tight">
              {profile.name} — {profile.tagline}
            </p>
          </div>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Operating from {profile.location}. Degree in Illustration ({profile.education}).
            Hand-crafted digital art in Krita with a digital tablet, polka dot screentones, and visual novel passion.
          </p>
          <p className="text-[11px] font-mono text-muted">{profile.colophon.license}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5 font-sans">
              <span>External Links & Portfolios</span>
              <span className="text-accent" aria-hidden="true">
                ♡
              </span>
            </h2>
            <ul className="flex flex-wrap gap-2 list-none m-0 p-0 text-xs">
              {profile.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="px-2.5 py-1 windose-btn font-semibold text-foreground hover:text-accent transition-colors block"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-1 text-[11px] font-mono text-muted windose-inset p-2.5 bg-background">
            <p>OS: WINDOSE 98 (Alma Digital Studio Edition)</p>
            <p>Tooling: {profile.colophon.artwork}</p>
            <p>© {currentYear} {profile.name}. Barcelona, Spain.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
