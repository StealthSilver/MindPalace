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
}

export function useInfiniteCanvas(): UseInfiniteCanvasReturn {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  });
  const [isPanning, setIsPanning] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

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

  // Handle mouse down for panning
  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (e.button === 0 && !e.shiftKey) {
      setIsPanning(true);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  // Handle mouse move for panning
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isPanning) {
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;

        setCanvasState((prev) => ({
          ...prev,
          offsetX: prev.offsetX + dx,
          offsetY: prev.offsetY + dy,
        }));

        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    },
    [isPanning]
  );

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Handle zoom
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      const delta = -e.deltaY * 0.001;
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

        setCanvasState({
          scale: newScale,
          offsetX: mouseX - worldX * newScale,
          offsetY: mouseY - worldY * newScale,
        });
      }
    },
    [canvasState]
  );

  // Add event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleWheel]);

  return {
    canvasRef,
    canvasState,
    isPanning,
    worldToScreen,
    screenToWorld,
  };
}
