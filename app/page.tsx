import { profile, milestones } from "@/content/profile";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Principles } from "@/components/home/Principles";
import { PaletteSwatches } from "@/components/art/PaletteSwatches";
import { SpritePreviewDemo } from "@/components/art/SpritePreviewDemo";
import { LightboxProvider } from "@/components/gallery/LightboxContext";
import { ArtworkLightbox } from "@/components/gallery/ArtworkLightbox";
import { WindowFrame } from "@/components/os/WindowFrame";
import { DesktopIcons } from "@/components/os/DesktopIcons";
import { ChatMessenger } from "@/components/os/ChatMessenger";
import { Taskbar } from "@/components/os/Taskbar";

export default function Home() {
  return (
    <LightboxProvider>
      <div className="crt-overlay min-h-screen bg-background screentone-hero py-6 px-4 sm:px-6 md:px-8 space-y-12 max-w-6xl mx-auto pb-24">
        {/* Desktop System Header & Quick Shortcuts Bar */}
        <section aria-label="Windose Desktop Screen" className="space-y-4">
          <div className="flex items-center justify-between gap-4 p-3 bg-surface windose-outset text-xs font-bold text-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span>WINDOSE 98 (Alma Studio Edition)</span>
              <span className="text-muted hidden sm:inline">•</span>
              <span className="text-muted hidden sm:inline">Barcelona, Spain</span>
            </div>
            <span className="font-mono text-accent">Krita Studio Active</span>
          </div>

          {/* Desktop Shortcut Icons Grid */}
          <DesktopIcons />
        </section>

        {/* Window 1: JINE Messenger Chat Window (Inspired by Needy Girl Overdose) */}
        <WindowFrame
          id="about"
          title="JINE_Messenger.exe - [Alma ✿]"
          icon="💬"
          menuBar={true}
          statusBar="Connected • Barcelona Studio Session"
          titlebarVariant="pink"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7">
              <ChatMessenger />
            </div>

            {/* System Info & Spec Box */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-4 bg-surface windose-inset space-y-3">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-accent font-sans">
                    Artist Identity Card
                  </span>
                  <span className="text-xs text-accent">✿</span>
                </div>

                <dl className="space-y-2 text-xs font-sans">
                  <div>
                    <dt className="text-muted uppercase text-[10px] font-bold">Artist</dt>
                    <dd className="font-bold text-foreground">{profile.name} ({profile.tagline})</dd>
                  </div>
                  <div>
                    <dt className="text-muted uppercase text-[10px] font-bold">Location</dt>
                    <dd className="font-semibold text-foreground">{profile.location}</dd>
                  </div>
                  <div>
                    <dt className="text-muted uppercase text-[10px] font-bold">Academic Background</dt>
                    <dd className="font-semibold text-foreground">{profile.education}</dd>
                  </div>
                  <div>
                    <dt className="text-muted uppercase text-[10px] font-bold">Primary Software</dt>
                    <dd className="font-semibold text-accent">{profile.primaryTool}</dd>
                  </div>
                  <div>
                    <dt className="text-muted uppercase text-[10px] font-bold">Specialty</dt>
                    <dd className="font-semibold text-foreground">
                      Visual Novels • Polka Dot Screentones • Character Sprites
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href="#works"
                  className="flex-1 py-2 px-3 windose-btn text-center text-xs font-bold text-foreground hover:bg-surface-light"
                >
                  View Creations.exe
                </a>
                <a
                  href="#contact"
                  className="flex-1 py-2 px-3 windose-btn bg-accent text-white text-center text-xs font-bold hover:bg-accent-hover"
                >
                  Commission Inquiries ✉
                </a>
              </div>
            </div>
          </div>
        </WindowFrame>

        {/* Window 2: Interactive Visual Novel Sprite Switcher */}
        <WindowFrame
          id="demo"
          title="VN_Sprite_Studio.app - [Layer_Preview.krita]"
          icon="🎮"
          menuBar={true}
          statusBar="Sprite Engine v2.4 • 4 Expression Layers Loaded"
          titlebarVariant="violet"
        >
          <div className="space-y-4">
            <div className="p-3 bg-surface windose-inset text-xs text-muted flex items-center justify-between">
              <span>Interactive Sprite Expression Switcher for Visual Novels</span>
              <span className="font-mono text-accent font-bold">3840 × 2160 • 16:9</span>
            </div>
            <SpritePreviewDemo />
          </div>
        </WindowFrame>

        {/* Window 3: Creations & Gallery Window */}
        <WindowFrame
          id="works"
          title="Creations_Viewer.exe - [Selected_Artworks/]"
          icon="🖼️"
          menuBar={true}
          statusBar={`${projects.length} artwork(s) loaded • Click artwork canvas to open Fullscreen Lightbox`}
          titlebarVariant="rose"
        >
          <div className="space-y-6">
            <div className="p-3 bg-surface windose-inset flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-foreground">Directory: </span>
                <span className="font-mono text-muted">C:\Alma\Creations\Krita_Works\</span>
              </div>
              <span className="text-accent font-bold">Click any artwork for Fullscreen Modal 🔍</span>
            </div>

            {projects.length > 0 ? (
              <div className="space-y-8">
                {projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center space-y-3 windose-inset bg-surface/50">
                <span className="text-3xl" aria-hidden="true">✿</span>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  Creations Folder Ready
                </h3>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  Alma&apos;s digital illustrations and Krita artwork files will appear here as works are added.
                </p>
              </div>
            )}
          </div>
        </WindowFrame>

        {/* Window 4: Krita Color Swatches Window */}
        <WindowFrame
          id="krita"
          title="Krita_Palette_Manager.exe - [Alma_Pink_Theme.kpl]"
          icon="🎨"
          menuBar={true}
          statusBar="Color Engine: sRGB IEC61966-2.1 • Screentone Calibration: 60 LPI"
          titlebarVariant="teal"
        >
          <PaletteSwatches />
        </WindowFrame>

        {/* Window 5: Illustration Technique & Polka Dots Guide */}
        <WindowFrame
          id="approach"
          title="Techniques_Manual.doc - [Screentones_&_Draftsmanship]"
          icon="📖"
          menuBar={true}
          statusBar="4 Articles • Word Count: 420 • Draftsmanship Certified"
          titlebarVariant="gold"
        >
          <Principles />
        </WindowFrame>

        {/* Window 6: Milestones & Studies History */}
        <WindowFrame
          id="milestones"
          title="Career_History.log - [Studies_&_Production]"
          icon="📜"
          menuBar={true}
          statusBar="4 Events Logged • 2023-2026 Archive"
          titlebarVariant="lavender"
        >
          <div className="divide-y-2 divide-border-bold windose-inset bg-background p-4 sm:p-6">
            {milestones.map((item, idx) => (
              <article key={idx} className="py-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
                <div className="text-xs font-bold text-accent font-mono tracking-wider">
                  [{item.period}]
                </div>
                <div className="md:col-span-3 space-y-1">
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted font-medium font-sans">
                    {item.venueOrPublisher} — {item.location}
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans pt-1">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </WindowFrame>

        {/* Window 7: Contact & Commission Express */}
        <WindowFrame
          id="contact"
          title="Contact_Express.msg - [New_Message_To_Alma]"
          icon="✉️"
          menuBar={true}
          statusBar="SMTP Server: Ready • Commissions Status: Open"
          titlebarVariant="magenta"
        >
          <div className="p-6 bg-surface windose-inset space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-background px-2 py-0.5 rounded-xs border border-border">
                To: alma@alma-illustrator.example
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                Let&apos;s create something cute & memorable together!
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">
                {profile.availability}
              </p>
            </div>

            <div className="p-4 bg-background windose-outset space-y-3">
              <p className="text-xs font-bold uppercase text-muted font-mono">Direct Communication:</p>
              <a
                href={`mailto:${profile.email}`}
                className="font-serif text-xl sm:text-2xl font-bold text-accent hover:underline block"
              >
                {profile.email}
              </a>
            </div>

            <div className="space-y-2 border-t border-border pt-4 text-xs font-sans">
              <p className="font-bold text-foreground uppercase tracking-wider">
                Available for Project Types:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-foreground list-none p-0 m-0">
                <li className="flex items-center gap-2">
                  <span className="text-accent">✿</span> Visual Novel Character Sprites & Expressions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✿</span> Dramatic Story Event CGs
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✿</span> Scenic Atmospheric Backgrounds
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">✿</span> Book Covers & Polka Dot Editorial Art
                </li>
              </ul>
            </div>
          </div>
        </WindowFrame>
      </div>

      {/* Retro Windose Bottom Taskbar */}
      <Taskbar />

      {/* Fullscreen Artwork Lightbox Modal */}
      <ArtworkLightbox />
    </LightboxProvider>
  );
}
