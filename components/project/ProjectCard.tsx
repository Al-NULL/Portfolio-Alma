"use client";

import Image from "next/image";
import type { Project } from "@/types";
import { useLightbox } from "@/components/gallery/LightboxContext";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { openLightbox } = useLightbox();
  const headingId = `project-${project.slug}-title`;

  const handleOpen = () => {
    openLightbox({
      id: project.slug,
      title: project.title,
      subtitle: project.subtitle,
      src: project.image?.src,
      alt: project.image?.alt,
      year: project.year,
      caption: project.image?.caption,
      highlights: project.highlights,
    });
  };

  return (
    <article
      aria-labelledby={headingId}
      className="relative bg-background border-2 border-border-bold p-8 sm:p-10 rounded-2xl screentone-shadow space-y-6 overflow-hidden"
    >
      {/* Decorative top-right screentone pattern patch */}
      <div
        className="absolute top-0 right-0 w-32 h-32 screentone-dense opacity-30 rounded-bl-3xl pointer-events-none"
        aria-hidden="true"
      />

      <header className="space-y-2 relative z-10">
        <span className="text-xs font-mono font-semibold text-muted bg-surface/60 px-2.5 py-0.5 rounded-md border border-border">
          {project.year}
        </span>
        <h3 id={headingId} className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="text-base font-medium text-muted">{project.subtitle}</p>
      </header>

      {/* Clickable Artwork Image / Canvas Trigger for the Fullscreen Lightbox */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label={`Open full-resolution artwork: ${project.title}`}
        className="group relative w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl overflow-hidden block"
      >
        {project.image ? (
          <figure className="space-y-2 p-3 bg-surface border-2 border-border-bold rounded-xl screentone-subtle group-hover:border-accent transition-colors">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-background shadow-xs">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1152px"
              />
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-1.5 rounded-full bg-background/95 text-accent font-bold text-xs border border-border shadow-md flex items-center gap-1.5">
                  <span>View Full Screen</span>
                  <span aria-hidden="true">🔍 ✿</span>
                </span>
              </div>
            </div>
            {project.image.caption && (
              <figcaption className="text-xs text-muted px-2 py-1 italic font-serif">
                {project.image.caption}
              </figcaption>
            )}
          </figure>
        ) : (
          <div className="relative p-8 sm:p-12 rounded-xl border-2 border-dashed border-border-bold bg-surface/50 screentone-hero text-center space-y-3 group-hover:border-accent transition-colors">
            <div className="inline-flex p-3 rounded-full bg-background border-2 border-border-bold text-accent shadow-xs group-hover:scale-110 transition-transform">
              <span className="text-2xl" aria-hidden="true">🎨</span>
            </div>
            <p className="font-serif text-lg font-semibold text-foreground">
              Original Hand-Painted Krita Artwork
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent bg-background px-3 py-1 rounded-full border border-border-bold shadow-2xs group-hover:bg-accent group-hover:text-background transition-colors">
              <span>Click to open Fullscreen Viewer</span>
              <span aria-hidden="true">✿</span>
            </span>
          </div>
        )}
      </button>

      {/* Production Notes & Technical Craft */}
      {project.highlights.length > 0 && (
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
            <span className="text-accent" aria-hidden="true">✿</span>
            <span>Production Notes &amp; Technical Craft</span>
          </h4>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-foreground/90 pl-1">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="leading-relaxed">
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-soft text-accent border border-border-bold font-bold text-xs hover:bg-accent hover:text-background transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span>Fullscreen Lightbox</span>
        <span aria-hidden="true">🔍</span>
      </button>
    </article>
  );
}
