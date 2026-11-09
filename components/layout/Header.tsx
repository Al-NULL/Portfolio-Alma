import Link from "next/link";
import { profile } from "@/content/profile";

export function Header() {
  return (
    <header
      role="banner"
      className="sticky top-0 z-40 w-full bg-surface/95 backdrop-blur-md border-b-2 border-surface-dark select-none"
    >
      {/* Top Pink Gradient Decorative Strip */}
      <div className="h-1 w-full windose-titlebar" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
        {/* Retro Brand Title */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="flex items-center gap-2 px-2.5 py-1 windose-outset bg-background hover:bg-surface-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="text-accent text-base" aria-hidden="true">
              ✿
            </span>
            <span className="font-serif text-lg font-bold tracking-tight text-foreground">
              {profile.name}
            </span>
            <span className="text-[10px] font-mono font-bold bg-accent text-white px-1.5 py-0.2 rounded-xs">
              WINDOSE
            </span>
          </Link>

          <span className="hidden md:inline-block text-xs text-muted font-medium bg-surface px-2 py-0.5 windose-inset truncate">
            C:\Alma\Studio\Krita_Illustrations\
          </span>
        </div>

        {/* Retro Top Menu Bar Links */}
        <nav aria-label="Desktop Top Bar Navigation">
          <ul className="flex items-center gap-2 list-none m-0 p-0 text-xs font-bold font-sans">
            <li>
              <a
                href="#works"
                className="px-2.5 py-1 windose-btn text-foreground hover:text-accent focus-visible:outline-none"
              >
                Creations.exe
              </a>
            </li>
            <li>
              <a
                href="#demo"
                className="hidden sm:inline-block px-2.5 py-1 windose-btn text-foreground hover:text-accent focus-visible:outline-none"
              >
                VN_Sprites
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="px-2.5 py-1 windose-btn text-foreground hover:text-accent focus-visible:outline-none"
              >
                About.txt
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="px-3 py-1 windose-btn bg-accent text-white hover:bg-accent-hover font-bold focus-visible:outline-none flex items-center gap-1"
              >
                <span>Contact</span>
                <span aria-hidden="true">✉</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
