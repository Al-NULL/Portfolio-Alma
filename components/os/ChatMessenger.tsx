import { profile } from "@/content/profile";
import { OpenWindowButton } from "./OpenWindowButton";

export function ChatMessenger() {
  return (
    <div className="space-y-4">
      {/* JINE Messenger Chat Header */}
      <div className="flex items-center justify-between gap-3 p-3 bg-surface windose-inset rounded-xs">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-accent-soft border-2 border-accent flex items-center justify-center font-serif font-bold text-accent">
              ✿
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-foreground">{profile.name}</span>
              <span className="text-xs text-accent">♡</span>
            </div>
            <p className="text-[11px] text-muted font-medium">
              Status: Active in Barcelona • Drawing in Krita
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono bg-accent text-white px-2 py-0.5 rounded-full font-bold">
          JINE v3.1
        </span>
      </div>

      {/* Chat Messages Stream */}
      <div className="space-y-3 p-4 bg-background windose-inset rounded-xs max-h-[360px] overflow-y-auto">
        {/* Message 1 */}
        <div className="flex gap-2.5 items-start">
          <span className="w-6 h-6 rounded-full bg-accent-soft text-accent text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
            A
          </span>
          <div className="space-y-1 max-w-lg">
            <span className="text-[10px] text-muted font-mono">Alma • 21:40</span>
            <div className="p-3 bg-surface text-foreground rounded-2xl rounded-tl-xs border border-border text-sm leading-relaxed windose-outset">
              Hi there! Welcome to my Windose desktop! ♡ I&apos;m so glad you stopped by my studio!
            </div>
          </div>
        </div>

        {/* Message 2 */}
        <div className="flex gap-2.5 items-start">
          <span className="w-6 h-6 rounded-full bg-accent-soft text-accent text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
            A
          </span>
          <div className="space-y-1 max-w-lg">
            <span className="text-[10px] text-muted font-mono">Alma • 21:41</span>
            <div className="p-3 bg-surface text-foreground rounded-2xl rounded-tl-xs border border-border text-sm leading-relaxed windose-outset">
              I am an illustrator based in <strong>Barcelona, Spain</strong> with an advanced degree in Illustration (CFGS).
              I paint hand-drawn digital art using <strong>Krita</strong> on a digital tablet!
            </div>
          </div>
        </div>

        {/* Message 3 */}
        <div className="flex gap-2.5 items-start">
          <span className="w-6 h-6 rounded-full bg-accent-soft text-accent text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
            A
          </span>
          <div className="space-y-1 max-w-lg">
            <span className="text-[10px] text-muted font-mono">Alma • 21:42</span>
            <div className="p-3 bg-accent text-white rounded-2xl rounded-tl-xs border border-accent-hover text-sm leading-relaxed windose-outset">
              I&apos;m a huge fan of <strong>Visual Novels</strong>! I love creating character sprites with dynamic emotions,
              dramatic story CGs, and atmospheric backgrounds textured with <strong>polka dot screentones</strong>! ✿
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input Bar (Retro Aesthetic) */}
      <div className="flex items-center gap-2 pt-1">
        <div className="flex-1 px-3 py-1.5 bg-background windose-inset rounded-xs text-xs text-muted font-sans select-none">
          Leave a message or commission request...
        </div>
        <OpenWindowButton
          windowId="contact"
          ariaLabel="Open the contact window"
          className="px-4 py-1.5 windose-btn text-accent font-bold text-xs flex items-center gap-1 hover:bg-accent hover:text-white transition-colors"
        >
          <span>Send</span>
          <span aria-hidden="true">✉</span>
        </OpenWindowButton>
      </div>
    </div>
  );
}
