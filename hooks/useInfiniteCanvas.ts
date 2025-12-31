"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface CanvasState {
  scale: number;
  offsetX: number;
  offsetY: number;
}

interface UseInfiniteCanvasReturn {
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasState: CanvasState;
  isPanning: boolean;
  worldToScreen: (x: number, y: number) => { x: number; y: number };
  screenToWorld: (x: number, y: number) => { x: number; y: number };
  setIsPanningDisabled: (disabled: boolean) => void;
}

export function useInfiniteCanvas(): UseInfiniteCanvasReturn {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  });
  const [isPanning, setIsPanning] = useState(false);
  const [isPanningDisabled, setIsPanningDisabled] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const pendingStateRef = useRef<CanvasState | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTouchDistance = useRef(0);
  const lastTouchCenter = useRef({ x: 0, y: 0 });

  // Convert world coordinates to screen coordinates
  const worldToScreen = useCallback(
    (x: number, y: number) => ({
      x: x * canvasState.scale + canvasState.offsetX,
      y: y * canvasState.scale + canvasState.offsetY,
    }),
    [canvasState]
  );

  // Convert screen coordinates to world coordinates
  const screenToWorld = useCallback(
    (x: number, y: number) => ({
      x: (x - canvasState.offsetX) / canvasState.scale,
      y: (y - canvasState.offsetY) / canvasState.scale,
    }),
    [canvasState]
  );

  // Handle mouse down for panning (on canvas directly)
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      // Allow panning only on empty canvas (right-click or left-click on canvas background)
      const target = e.target as HTMLElement;
      const isCanvasBackground = target === canvasRef.current;
      
      // Right-click or left-click on empty canvas background
      if (isCanvasBackground && !isPanningDisabled) {
        if (e.button === 2 || e.button === 0) {
          e.preventDefault();
          setIsPanning(true);
          lastMousePos.current = { x: e.clientX, y: e.clientY };
        }
      }
    },
    [isPanningDisabled]
  );

  // Handle mouse move for panning
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isPanning) {
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;

        lastMousePos.current = { x: e.clientX, y: e.clientY };

        // Use pending state for smooth updates
        pendingStateRef.current = {
          ...canvasState,
          offsetX: canvasState.offsetX + dx,
          offsetY: canvasState.offsetY + dy,
        };

        // Cancel existing RAF if pending
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
        }

        // Schedule state update on next frame
        rafRef.current = requestAnimationFrame(() => {
          if (pendingStateRef.current) {
            setCanvasState(pendingStateRef.current);
            rafRef.current = null;
          }
        });
      }
    },
    [isPanning, canvasState]
  );

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Handle zoom with mouse wheel or trackpad
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      // Detect trackpad (ctrlKey + wheel) vs mouse wheel
      const isTrackpad = e.ctrlKey;

      let delta: number;
      if (isTrackpad) {
        // Trackpad pinch: ctrlKey is set, use deltaY directly
        delta = -e.deltaY * 0.005;
      } else {
        // Mouse wheel: use standard scroll calculation
        delta = -e.deltaY * 0.001;
      }

      const newScale = Math.max(
        0.1,
        Math.min(3, canvasState.scale * (1 + delta))
      );

      // Zoom towards mouse position
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const worldX = (mouseX - canvasState.offsetX) / canvasState.scale;
        const worldY = (mouseY - canvasState.offsetY) / canvasState.scale;

        const newState = {
          scale: newScale,
          offsetX: mouseX - worldX * newScale,
          offsetY: mouseY - worldY * newScale,
        };

        pendingStateRef.current = newState;

        // Cancel existing RAF if pending
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
          if (pendingStateRef.current) {
            setCanvasState(pendingStateRef.current);
            rafRef.current = null;
          }
        });
      }
    },
    [canvasState]
  );

  // Calculate distance between two touch points
  const getTouchDistance = (touch1: Touch, touch2: Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate center point between two touches
  const getTouchCenter = (
    touch1: Touch,
    touch2: Touch
  ): { x: number; y: number } => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  };

  // Handle touch start for pinch and pan
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      setIsPanning(true);
      lastTouchDistance.current = getTouchDistance(e.touches[0], e.touches[1]);
      lastTouchCenter.current = getTouchCenter(e.touches[0], e.touches[1]);
      lastMousePos.current = {
        x: lastTouchCenter.current.x,
        y: lastTouchCenter.current.y,
      };
    }
  }, []);

  // Handle touch move for pinch zoom and two-finger pan
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();

        const newDistance = getTouchDistance(e.touches[0], e.touches[1]);
        const newCenter = getTouchCenter(e.touches[0], e.touches[1]);

        // Handle pinch zoom
        const distanceDelta = newDistance - lastTouchDistance.current;
        if (Math.abs(distanceDelta) > 1) {
          const zoomFactor = 1 + distanceDelta * 0.005;
          const newScale = Math.max(
            0.1,
            Math.min(3, canvasState.scale * zoomFactor)
          );

          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect) {
            const centerX = newCenter.x - rect.left;
            const centerY = newCenter.y - rect.top;

            const worldX = (centerX - canvasState.offsetX) / canvasState.scale;
            const worldY = (centerY - canvasState.offsetY) / canvasState.scale;

            pendingStateRef.current = {
              scale: newScale,
              offsetX: centerX - worldX * newScale,
              offsetY: centerY - worldY * newScale,
            };
          }

          lastTouchDistance.current = newDistance;
        }

        // Handle two-finger pan
        const dx = newCenter.x - lastMousePos.current.x;
        const dy = newCenter.y - lastMousePos.current.y;

        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          if (pendingStateRef.current) {
            pendingStateRef.current.offsetX += dx;
            pendingStateRef.current.offsetY += dy;
          } else {
            pendingStateRef.current = {
              ...canvasState,
              offsetX: canvasState.offsetX + dx,
              offsetY: canvasState.offsetY + dy,
            };
          }
        }

        lastMousePos.current = {
          x: newCenter.x,
          y: newCenter.y,
        };

        // Schedule state update on next frame
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
          if (pendingStateRef.current) {
            setCanvasState(pendingStateRef.current);
            rafRef.current = null;
          }
        });
      }
    },
    [canvasState]
  );

  // Handle touch end
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (e.touches.length < 2) {
      setIsPanning(false);
      lastTouchDistance.current = 0;
    }
  }, []);

  // Add event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    canvas.addEventListener("contextmenu", handleContextMenu);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("contextmenu", handleContextMenu);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return {
    canvasRef,
    canvasState,
    isPanning,
    worldToScreen,
    screenToWorld,
    setIsPanningDisabled,
  };
}
