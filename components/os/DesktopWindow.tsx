"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
  type RefObject,
} from "react";
import {
  useDesktop,
  type DesktopWindowDefinition,
} from "./DesktopContext";
import { WindowFrame } from "./WindowFrame";

interface DesktopWindowProps {
  definition: DesktopWindowDefinition;
  workspaceRef: RefObject<HTMLDivElement | null>;
}

/** Renders one window and wires its chrome to the desktop window manager. */
export function DesktopWindow({
  definition,
  workspaceRef,
}: DesktopWindowProps) {
  const {
    windowStates,
    activeWindowId,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    moveWindow,
  } = useDesktop();

  const state = windowStates[definition.id];
  const frameRef = useRef<HTMLElement>(null);
  const dragOffsetRef = useRef<{ x: number; y: number } | null>(null);
  const hasMountedRef = useRef(false);
  const previousVisibilityRef = useRef({
    open: state.open,
    minimized: state.minimized,
  });

  // Move focus into a window when it is opened or restored, but not on first load.
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      previousVisibilityRef.current = {
        open: state.open,
        minimized: state.minimized,
      };
      return;
    }

    const previous = previousVisibilityRef.current;
    const wasOpened = state.open && !previous.open;
    const wasRestored = state.open && previous.minimized && !state.minimized;

    if (wasOpened || wasRestored) {
      frameRef.current?.focus({ preventScroll: true });
    }

    previousVisibilityRef.current = {
      open: state.open,
      minimized: state.minimized,
    };
  }, [state.open, state.minimized]);

  const handleTitlebarPointerDown = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    if (state.maximized) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const frame = frameRef.current;
    if (!frame) return;

    const frameRect = frame.getBoundingClientRect();
    dragOffsetRef.current = {
      x: event.clientX - frameRect.left,
      y: event.clientY - frameRect.top,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleTitlebarPointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    const dragOffset = dragOffsetRef.current;
    const frame = frameRef.current;
    const workspace = workspaceRef.current;

    if (!dragOffset || !frame || !workspace) return;

    const frameRect = frame.getBoundingClientRect();
    const workspaceRect = workspace.getBoundingClientRect();
    const maxX = Math.max(0, workspaceRect.width - frameRect.width);
    const maxY = Math.max(0, workspaceRect.height - frameRect.height);
    const nextX = Math.min(
      Math.max(0, event.clientX - workspaceRect.left - dragOffset.x),
      maxX,
    );
    const nextY = Math.min(
      Math.max(0, event.clientY - workspaceRect.top - dragOffset.y),
      maxY,
    );

    moveWindow(definition.id, Math.round(nextX), Math.round(nextY));
  };

  const handleTitlebarPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    dragOffsetRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  /** Moves focus to a stable shell control after the window is hidden. */
  const focusAfterHide = (selector: string) => {
    window.requestAnimationFrame(() => {
      document
        .querySelector<HTMLElement>(selector)
        ?.focus({ preventScroll: true });
    });
  };

  const handleMinimize = () => {
    minimizeWindow(definition.id);
    focusAfterHide(`[data-taskbar-window="${definition.id}"]`);
  };

  const handleClose = () => {
    closeWindow(definition.id);
    focusAfterHide("[data-taskbar-start]");
  };

  const handleTitlebarDoubleClick = () => {
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    toggleMaximizeWindow(definition.id);
  };

  const isActive =
    activeWindowId === definition.id && state.open && !state.minimized;

  const style: CSSProperties = {
    left: state.x,
    top: state.y,
    width: definition.width ?? 720,
    height: definition.height ?? 560,
    zIndex: state.z,
  };

  return (
    <WindowFrame
      id={definition.id}
      title={definition.title}
      icon={definition.icon}
      menuBar={definition.menuBar}
      statusBar={definition.statusBar}
      titlebarVariant={definition.titlebarVariant}
      active={isActive}
      maximized={state.maximized}
      hidden={!state.open || state.minimized}
      draggable={!state.maximized}
      style={style}
      frameRef={frameRef}
      onFocus={() => focusWindow(definition.id)}
      onClose={handleClose}
      onMinimize={handleMinimize}
      onMaximize={() => toggleMaximizeWindow(definition.id)}
      onTitlebarPointerDown={handleTitlebarPointerDown}
      onTitlebarPointerMove={handleTitlebarPointerMove}
      onTitlebarPointerUp={handleTitlebarPointerUp}
      onTitlebarDoubleClick={handleTitlebarDoubleClick}
    >
      {definition.content}
    </WindowFrame>
  );
}
