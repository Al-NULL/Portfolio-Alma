"use client";

import { useState } from "react";

interface EmotionState {
  id: string;
  label: string;
  icon: string;
  dialogue: string;
  blush: boolean;
  eyeType: "sparkle" | "gentle" | "curious" | "focused";
  mouthType: "smile" | "open" | "shy" | "grin";
  layerNote: string;
}

const emotions: EmotionState[] = [
  {
    id: "happy",
    label: "Happy",
    icon: "✿",
    dialogue: "“I’m painting a new visual novel scene in Krita today! The soft lighting is turning out so sweet!”",
    blush: false,
    eyeType: "sparkle",
    mouthType: "smile",
    layerNote: "Layer 04 [Eyes_Happy_Sparkle] + Layer 07 [Mouth_Smile]",
  },
  {
    id: "blushing",
    label: "Blushing",
    icon: "♡",
    dialogue: "“W-Wait! Are you really praising my polka dot screentone shading?! Thank you so much, it means the world!”",
    blush: true,
    eyeType: "gentle",
    mouthType: "shy",
    layerNote: "Layer 05 [Blush_Screentone_50%] + Layer 08 [Mouth_Fidget]",
  },
  {
    id: "thinking",
    label: "Thinking",
    icon: "✦",
    dialogue: "“Hmm... Should this sunset have warmer coral pink highlights, or a deeper Mediterranean twilight violet?”",
    blush: false,
    eyeType: "curious",
    mouthType: "open",
    layerNote: "Layer 03 [Eyebrow_Asymmetric] + Layer 06 [Eyes_Upward]",
  },
  {
    id: "determined",
    label: "Determined",
    icon: "⚡",
    dialogue: "“Challenge accepted! I'll render every single lantern reflection with meticulous brushwork before dawn!”",
    blush: false,
    eyeType: "focused",
    mouthType: "grin",
    layerNote: "Layer 02 [Eyebrow_Sharp] + Layer 09 [Mouth_Confident]",
  },
];

export function SpritePreviewDemo() {
  const [activeEmotion, setActiveEmotion] = useState<EmotionState>(emotions[0]);

  return (
    <div
      aria-label="Interactive Visual Novel Sprite Preview"
      className="p-6 sm:p-8 bg-surface/80 border-2 border-border-bold rounded-2xl screentone-shadow space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-accent flex items-center gap-1.5">
            <span aria-hidden="true">🎮</span>
            <span>Interactive Visual Novel Demo</span>
          </span>
          <h3 className="font-serif text-2xl font-semibold text-foreground tracking-tight">
            Krita Sprite Expression Switcher
          </h3>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-accent-soft text-accent rounded-full border border-border">
          Click emotions to test!
        </span>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Character Portrait Stage with Screentone Background */}
        <div className="md:col-span-5 relative aspect-square max-w-[280px] mx-auto w-full bg-background rounded-2xl border-2 border-border-bold overflow-hidden shadow-inner flex items-center justify-center">
          {/* Prominent Screentone Polka Dots Backdrop */}
          <div className="absolute inset-0 screentone-hero opacity-70" aria-hidden="true" />

          {/* Decorative Comic Halftone Ring */}
          <div className="absolute w-44 h-44 rounded-full border-4 border-dashed border-accent/40 animate-spin-slow pointer-events-none" />

          {/* Illustrated Stylized Character Sprite Face */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Hair with Ribbon */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#f2a6bb] border-2 border-foreground shadow-sm flex items-center justify-center relative overflow-hidden">
                {/* Bangs */}
                <div className="absolute top-0 inset-x-2 h-7 bg-[#d97c99] rounded-b-xl border-b border-foreground/30" />

                {/* Eyes */}
                <div className="flex items-center gap-6 mt-2">
                  <div className="w-3.5 h-4.5 rounded-full bg-foreground flex items-center justify-center relative">
                    <span className="w-1.5 h-1.5 rounded-full bg-background absolute top-0.5 right-0.5" />
                  </div>
                  <div className="w-3.5 h-4.5 rounded-full bg-foreground flex items-center justify-center relative">
                    <span className="w-1.5 h-1.5 rounded-full bg-background absolute top-0.5 right-0.5" />
                  </div>
                </div>

                {/* Blush (Dynamic) */}
                {activeEmotion.blush && (
                  <div className="absolute bottom-6 flex justify-between w-16 px-1">
                    <span className="w-3.5 h-2 rounded-full bg-accent/60 screentone-dense" />
                    <span className="w-3.5 h-2 rounded-full bg-accent/60 screentone-dense" />
                  </div>
                )}

                {/* Mouth (Dynamic) */}
                <div className="absolute bottom-4">
                  {activeEmotion.mouthType === "smile" && (
                    <div className="w-3.5 h-2 border-b-2 border-foreground rounded-b-full" />
                  )}
                  {activeEmotion.mouthType === "shy" && (
                    <div className="w-2 h-1 border-b-2 border-foreground rounded-b-md" />
                  )}
                  {activeEmotion.mouthType === "open" && (
                    <div className="w-3 h-2 bg-[#963d59] border border-foreground rounded-full" />
                  )}
                  {activeEmotion.mouthType === "grin" && (
                    <div className="w-4 h-2.5 bg-background border-2 border-foreground rounded-b-full" />
                  )}
                </div>
              </div>

              {/* Cute Ribbon */}
              <div className="absolute -top-2 -right-1 bg-accent text-background text-xs px-2 py-0.5 rounded-full font-bold shadow-xs">
                ✿
              </div>
            </div>

            {/* Sprite Tag */}
            <span className="mt-3 text-[11px] font-mono font-bold uppercase tracking-wider text-accent bg-background/90 px-2 py-0.5 rounded-md border border-border">
              {activeEmotion.label} State
            </span>
          </div>
        </div>

        {/* Emotion Controls & Dialogue Output */}
        <div className="md:col-span-7 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted">
              Select Emotion Layer:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {emotions.map((emotion) => {
                const isSelected = activeEmotion.id === emotion.id;
                return (
                  <button
                    key={emotion.id}
                    type="button"
                    onClick={() => setActiveEmotion(emotion)}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-accent text-background border-2 border-foreground shadow-xs scale-105"
                        : "bg-background text-foreground border border-border hover:bg-surface-hover"
                    }`}
                  >
                    <span>{emotion.icon}</span>
                    <span>{emotion.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visual Novel Character Dialogue Box */}
          <div className="p-4 bg-background border-2 border-border-bold rounded-xl space-y-2 relative shadow-xs">
            <span className="text-[10px] uppercase font-bold tracking-widest text-accent bg-surface px-2 py-0.5 rounded-md border border-border">
              Active Dialogue Line
            </span>
            <p className="font-serif text-base sm:text-lg text-foreground italic leading-relaxed">
              {activeEmotion.dialogue}
            </p>
          </div>

          {/* Krita Layer Breakdown */}
          <div className="flex items-center gap-2 p-2.5 bg-surface/50 rounded-lg border border-border text-xs text-muted font-mono">
            <span className="text-accent font-bold">Krita Layer Stack:</span>
            <span className="truncate">{activeEmotion.layerNote}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
