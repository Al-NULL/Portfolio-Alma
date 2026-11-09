export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  /** Production notes and technical craft bullet points. */
  highlights: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface ArtApproach {
  number: string;
  title: string;
  description: string;
}

export interface ExhibitionOrMilestone {
  period: string;
  title: string;
  venueOrPublisher: string;
  location: string;
  description: string;
}

export interface Profile {
  name: string;
  tagline: string;
  role: string;
  education: string;
  location: string;
  primaryTool: string;
  availability: string;
  statement: string[];
  email: string;
  socials: {
    name: string;
    label: string;
    url: string;
  }[];
  colophon: {
    stack: string;
    typography: string;
    artwork: string;
    license: string;
  };
}
