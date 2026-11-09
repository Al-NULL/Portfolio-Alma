import {
  AboutWindowContent,
  ApproachWindowContent,
  ContactWindowContent,
  DemoWindowContent,
  KritaWindowContent,
  MilestonesWindowContent,
  WorksWindowContent,
} from "@/components/home/DesktopWindowContents";
import { ArtworkLightbox } from "@/components/gallery/ArtworkLightbox";
import { LightboxProvider } from "@/components/gallery/LightboxContext";
import {
  Desktop,
  type DesktopWindowDefinition,
} from "@/components/os/Desktop";
import { projects } from "@/content/projects";

export default function Home() {
  const windows: DesktopWindowDefinition[] = [
    {
      id: "about",
      label: "JINE Messenger",
      title: "JINE_Messenger.exe - [Alma ✿]",
      icon: "💬",
      menuBar: true,
      statusBar: "Connected • Barcelona Studio Session",
      titlebarVariant: "pink",
      width: 880,
      height: 660,
      initialPosition: { x: 224, y: 16 },
      content: <AboutWindowContent />,
    },
    {
      id: "demo",
      label: "VN Sprite Studio",
      title: "VN_Sprite_Studio.app - [Layer_Preview.krita]",
      icon: "🎮",
      menuBar: true,
      statusBar: "Sprite Engine v2.4 • 4 Expression Layers Loaded",
      titlebarVariant: "violet",
      width: 840,
      height: 640,
      initialPosition: { x: 260, y: 40 },
      content: <DemoWindowContent />,
    },
    {
      id: "works",
      label: "Creations Viewer",
      title: "Creations_Viewer.exe - [Selected_Artworks/]",
      icon: "🖼️",
      menuBar: true,
      statusBar: `${projects.length} artwork(s) loaded • Click artwork canvas to open Fullscreen Lightbox`,
      titlebarVariant: "rose",
      width: 900,
      height: 680,
      initialPosition: { x: 230, y: 28 },
      content: <WorksWindowContent />,
    },
    {
      id: "krita",
      label: "Krita Palette",
      title: "Krita_Palette_Manager.exe - [Alma_Pink_Theme.kpl]",
      icon: "🎨",
      menuBar: true,
      statusBar:
        "Color Engine: sRGB IEC61966-2.1 • Screentone Calibration: 60 LPI",
      titlebarVariant: "teal",
      width: 720,
      height: 480,
      initialPosition: { x: 320, y: 64 },
      content: <KritaWindowContent />,
    },
    {
      id: "approach",
      label: "Techniques Manual",
      title: "Techniques_Manual.doc - [Screentones_&_Draftsmanship]",
      icon: "📖",
      menuBar: true,
      statusBar:
        "4 Articles • Word Count: 420 • Draftsmanship Certified",
      titlebarVariant: "gold",
      width: 860,
      height: 640,
      initialPosition: { x: 240, y: 48 },
      content: <ApproachWindowContent />,
    },
    {
      id: "milestones",
      label: "Career History",
      title: "Career_History.log - [Studies_&_Production]",
      icon: "📜",
      menuBar: true,
      statusBar: "4 Events Logged • 2023-2026 Archive",
      titlebarVariant: "lavender",
      width: 800,
      height: 560,
      initialPosition: { x: 280, y: 72 },
      content: <MilestonesWindowContent />,
    },
    {
      id: "contact",
      label: "Contact Express",
      title: "Contact_Express.msg - [New_Message_To_Alma]",
      icon: "✉️",
      menuBar: true,
      statusBar: "SMTP Server: Ready • Commissions Status: Open",
      titlebarVariant: "magenta",
      width: 760,
      height: 640,
      initialPosition: { x: 300, y: 88 },
      content: <ContactWindowContent />,
    },
  ];

  return (
    <LightboxProvider>
      <Desktop windows={windows} />
      <ArtworkLightbox />
    </LightboxProvider>
  );
}
