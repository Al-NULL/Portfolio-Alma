import type { Project } from "@/types";

/**
 * Projects / Artworks Collection
 *
 * Each entry needs: slug, title, subtitle, year, highlights, and optionally image.
 * Images should be placed in public/creations/ and referenced as /creations/filename.
 */
export const projects: Project[] = [
  {
    slug: "ame-chan",
    title: "Ame-Chan",
    subtitle: 'Character from "NSO"',
    year: "2026",
    highlights: [
      "Painted at 1842 × 1800 px",
      "Good lineart practice + good ambience with the background",
    ],
    image: {
      src: "/creations/AMECHAN.png",
      alt: "Ame-Chan, a character from NSO, digital illustration by Alma",
    },
  },
];
