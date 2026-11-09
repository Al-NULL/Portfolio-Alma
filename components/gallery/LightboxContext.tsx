"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { LightboxItem } from "@/types/lightbox";

interface LightboxContextValue {
  isOpen: boolean;
  activeItem: LightboxItem | null;
  items: LightboxItem[];
  registerItems: (items: LightboxItem[]) => void;
  openLightbox: (item: LightboxItem) => void;
  closeLightbox: () => void;
  nextItem: () => void;
  prevItem: () => void;
}

const LightboxContext = createContext<LightboxContextValue | undefined>(undefined);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<LightboxItem | null>(null);
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  const registerItems = useCallback((newItems: LightboxItem[]) => {
    setItems(newItems);
  }, []);

  const openLightbox = useCallback((item: LightboxItem) => {
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      setTriggerElement(document.activeElement);
    }
    setActiveItem(item);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setActiveItem(null);
    if (triggerElement) {
      triggerElement.focus();
    }
  }, [triggerElement]);

  const nextItem = useCallback(() => {
    if (!activeItem || items.length <= 1) return;
    const currentIndex = items.findIndex((i) => i.id === activeItem.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % items.length;
    setActiveItem(items[nextIndex]);
  }, [activeItem, items]);

  const prevItem = useCallback(() => {
    if (!activeItem || items.length <= 1) return;
    const currentIndex = items.findIndex((i) => i.id === activeItem.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setActiveItem(items[prevIndex]);
  }, [activeItem, items]);

  // Keyboard navigation & body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextItem();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevItem();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeLightbox, nextItem, prevItem]);

  return (
    <LightboxContext.Provider
      value={{
        isOpen,
        activeItem,
        items,
        registerItems,
        openLightbox,
        closeLightbox,
        nextItem,
        prevItem,
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return context;
}
