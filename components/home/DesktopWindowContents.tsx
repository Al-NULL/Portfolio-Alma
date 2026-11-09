import { milestones, profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { PaletteSwatches } from "@/components/art/PaletteSwatches";
import { SpritePreviewDemo } from "@/components/art/SpritePreviewDemo";
import { Principles } from "@/components/home/Principles";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ChatMessenger } from "@/components/os/ChatMessenger";
import { OpenWindowButton } from "@/components/os/OpenWindowButton";

export function AboutWindowContent() {
  return (
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
      <div className="md:col-span-7">
        <ChatMessenger />
      </div>

      <div className="space-y-4 md:col-span-5">
        <div className="windose-inset space-y-3 bg-surface p-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-accent">
              Artist Identity Card
            </span>
            <span className="text-xs text-accent" aria-hidden="true">
              ✿
            </span>
          </div>

          <dl className="space-y-2 font-sans text-xs">
            <div>
              <dt className="text-[10px] font-bold uppercase text-muted">
                Artist
              </dt>
              <dd className="font-bold text-foreground">
                {profile.name} ({profile.tagline})
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase text-muted">
                Location
              </dt>
              <dd className="font-semibold text-foreground">
                {profile.location}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase text-muted">
                Academic Background
              </dt>
              <dd className="font-semibold text-foreground">
                {profile.education}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase text-muted">
                Primary Software
              </dt>
              <dd className="font-semibold text-accent">
                {profile.primaryTool}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase text-muted">
                Specialty
              </dt>
              <dd className="font-semibold text-foreground">
                Visual Novels • Polka Dot Screentones • Character Sprites
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-wrap gap-2">
          <OpenWindowButton
            windowId="works"
            className="flex-1 px-3 py-2 text-center text-xs font-bold text-foreground windose-btn hover:bg-surface-light"
          >
            View Creations.exe
          </OpenWindowButton>
          <OpenWindowButton
            windowId="contact"
            className="flex-1 bg-accent px-3 py-2 text-center text-xs font-bold text-white hover:bg-accent-hover"
          >
            Commission Inquiries ✉
          </OpenWindowButton>
        </div>
      </div>
    </div>
  );
}

export function DemoWindowContent() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 bg-surface p-3 windose-inset text-xs text-muted">
        <span>Interactive Sprite Expression Switcher for Visual Novels</span>
        <span className="shrink-0 font-mono font-bold text-accent">
          3840 × 2160 • 16:9
        </span>
      </div>
      <SpritePreviewDemo />
    </div>
  );
}

export function WorksWindowContent() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-2 bg-surface p-3 windose-inset text-xs sm:flex-row sm:items-center">
        <div>
          <span className="font-bold text-foreground">Directory: </span>
          <span className="font-mono text-muted">
            C:\Alma\Creations\Krita_Works\
          </span>
        </div>
        <span className="font-bold text-accent">
          Click any artwork for Fullscreen Modal 🔍
        </span>
      </div>

      {projects.length > 0 ? (
        <div className="space-y-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="space-y-3 bg-surface/50 p-12 text-center windose-inset">
          <span className="text-3xl" aria-hidden="true">
            ✿
          </span>
          <h3 className="font-serif text-xl font-bold text-foreground">
            Creations Folder Ready
          </h3>
          <p className="mx-auto max-w-sm text-xs text-muted">
            Alma&apos;s digital illustrations and Krita artwork files will
            appear here as works are added.
          </p>
        </div>
      )}
    </div>
  );
}

export function KritaWindowContent() {
  return <PaletteSwatches />;
}

export function ApproachWindowContent() {
  return <Principles embedded />;
}

export function MilestonesWindowContent() {
  return (
    <div className="divide-y-2 divide-border-bold bg-background p-4 windose-inset sm:p-6">
      {milestones.map((item, index) => (
        <article
          key={index}
          className="grid grid-cols-1 items-baseline gap-4 py-4 md:grid-cols-4"
        >
          <div className="font-mono text-xs font-bold tracking-wider text-accent">
            [{item.period}]
          </div>
          <div className="space-y-1 md:col-span-3">
            <h3 className="font-serif text-lg font-bold text-foreground">
              {item.title}
            </h3>
            <p className="font-sans text-xs font-medium text-muted">
              {item.venueOrPublisher} — {item.location}
            </p>
            <p className="pt-1 font-sans text-xs leading-relaxed text-foreground/90 sm:text-sm">
              {item.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ContactWindowContent() {
  return (
    <div className="space-y-6 bg-surface p-6 windose-inset">
      <div className="space-y-2">
        <span className="rounded-xs border border-border bg-background px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
          To: {profile.email}
        </span>
        <h3 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
          Let&apos;s create something cute &amp; memorable together!
        </h3>
        <p className="font-sans text-xs leading-relaxed text-muted sm:text-sm">
          {profile.availability}
        </p>
      </div>

      <div className="space-y-3 bg-background p-4 windose-outset">
        <p className="font-mono text-xs font-bold uppercase text-muted">
          Direct Communication:
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="block font-serif text-xl font-bold text-accent hover:underline sm:text-2xl"
        >
          {profile.email}
        </a>
      </div>

      <div className="space-y-2 border-t border-border pt-4 font-sans text-xs">
        <p className="font-bold uppercase tracking-wider text-foreground">
          Available for Project Types:
        </p>
        <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0 text-foreground sm:grid-cols-2">
          <li className="flex items-center gap-2">
            <span className="text-accent" aria-hidden="true">
              ✿
            </span>{" "}
            Visual Novel Character Sprites &amp; Expressions
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent" aria-hidden="true">
              ✿
            </span>{" "}
            Dramatic Story Event CGs
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent" aria-hidden="true">
              ✿
            </span>{" "}
            Scenic Atmospheric Backgrounds
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent" aria-hidden="true">
              ✿
            </span>{" "}
            Book Covers &amp; Polka Dot Editorial Art
          </li>
        </ul>
      </div>

      <div className="space-y-2 border-t border-border pt-4">
        <p className="font-sans text-xs font-bold uppercase tracking-wider text-muted">
          Find Alma Online:
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {profile.socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="block px-2.5 py-1 text-xs font-semibold text-foreground windose-btn transition-colors hover:text-accent"
              >
                {social.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-1 bg-background p-2.5 font-mono text-[11px] text-muted windose-inset">
        <p>OS: WINDOSE 98 (Alma Digital Studio Edition)</p>
        <p>Tooling: {profile.colophon.artwork}</p>
        <p>© 2026 {profile.name}. Barcelona, Spain.</p>
        <p>{profile.colophon.license}</p>
      </div>
    </div>
  );
}
