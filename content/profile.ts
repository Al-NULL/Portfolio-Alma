import type { ArtApproach, ExhibitionOrMilestone, Profile } from "@/types";

export const profile: Profile = {
  name: "Alma",
  tagline: "Digital Artist & Illustrator",
  role: "Digital Artist & Narrative Illustrator",
  education: "CFGS in Illustration (Ciclo Formativo de Grado Superior de Ilustración)",
  location: "Barcelona, Spain",
  primaryTool: "Digital Drawing Tablet with Krita",
  availability: "Open to all freelance commissions, collaborations, and studio projects — especially seeking Visual Novel projects (sprites, CG illustrations, backgrounds, and character design).",
  statement: [
    "I am a digital artist and illustrator based in Barcelona, Spain. Holding an Advanced Vocational Degree (CFGS) in Illustration, my work brings together cute, heartwarming character charm with professional draftsmanship, anatomy, and narrative worldbuilding.",
    "My creative sanctuary is Krita, where I paint with a digital drawing tablet. My signature visual style embraces warm, delightful pinks, gentle painterly textures, and the playful charm of polka dots and screentone halftones—inspired by classic manga draftsmanship, retro indie visual novels, and risograph art prints.",
    "As an avid fan of visual novels, I love bringing stories to life through expressive character sprites with rich facial expressions, memorable event CGs, and cozy, atmospheric backgrounds that draw players straight into the story.",
  ],
  email: "alma@alma-illustrator.example",
  socials: [
    {
      name: "ArtStation",
      label: "View illustration portfolio and character designs on ArtStation",
      url: "https://artstation.com",
    },
    {
      name: "Cara",
      label: "Follow portfolio and sketches on Cara",
      url: "https://cara.app",
    },
    {
      name: "Instagram",
      label: "View digital sketchbook and works in progress on Instagram",
      url: "https://instagram.com",
    },
    {
      name: "Itch.io",
      label: "Browse visual novel art and indie game collaborations on Itch.io",
      url: "https://itch.io",
    },
  ],
  colophon: {
    stack: "Built with Next.js 16, React 19, and Tailwind CSS v4",
    typography: "Newsreader (Display Serif) & Inter (Interface Sans) via next/font",
    artwork: "All original digital illustrations hand-painted in Krita on a digital drawing tablet",
    license: "Artwork © Alma. All rights reserved. Website code available under the MIT License.",
  },
};

export const artApproaches: ArtApproach[] = [
  {
    number: "01",
    title: "Cute, Heartfelt & Professional Characters",
    description:
      "Creating lovable, emotion-rich characters with sound anatomical fundamentals. Expressive eyes, subtle blushes, and thoughtful costume details make every character feel genuine and memorable.",
  },
  {
    number: "02",
    title: "The Polka Dots & Screentone Technique",
    description:
      "A tribute to classic manga, retro shoujo prints, and risograph art: incorporating delicate halftone dots and stippling patterns to give digital illustrations a warm, tactile, hand-printed personality.",
  },
  {
    number: "03",
    title: "Signature Pink Harmony & Light",
    description:
      "Pink is a versatile, expressive storytelling color. Paired with warm cream tones, deep rose, and soft Mediterranean shadows, it creates a cozy, welcoming visual atmosphere that invites readers to stay.",
  },
  {
    number: "04",
    title: "Visual Novel Passion & Reactivity",
    description:
      "As a devoted visual novel fan, I design sprite sheets with modular layers (eyebrows, eyes, smiles, blushes) so characters react dynamically and convincingly to every plot twist and dialogue beat.",
  },
];

export const milestones: ExhibitionOrMilestone[] = [
  {
    period: "2026",
    title: "Whispers of the Harbor — Visual Novel Art Production",
    venueOrPublisher: "Independent Game Collective",
    location: "Barcelona & Remote",
    description:
      "Lead 2D artist creating full character sprite sets (with 12+ expressions each), romantic story CG event illustrations, and atmospheric background paintings in Krita.",
  },
  {
    period: "2025",
    title: "Gothic Shadows: Illustrated Mystery Anthology",
    venueOrPublisher: "Barcelona Independent Press",
    location: "Barcelona, Spain",
    description:
      "Cover illustration and 6 interior full-page chapter plates featuring delicate polka dot screentone shading and character portraits.",
  },
  {
    period: "2024",
    title: "CFGS Illustration Graduation Showcase",
    venueOrPublisher: "Escola d'Art i Disseny",
    location: "Barcelona, Spain",
    description:
      "Final degree visual project: 'The Clockwork Greenhouse' — an illustrated visual novel concept demo with full character sprite sheets and interactive dialogue sequences.",
  },
  {
    period: "2023 — Present",
    title: "Freelance Digital Illustration & Character Commissions",
    venueOrPublisher: "Global Clients",
    location: "Remote",
    description:
      "Delivering custom digital portraits, tabletop RPG character illustrations, cute zine contributions, and narrative promotional art.",
  },
];
