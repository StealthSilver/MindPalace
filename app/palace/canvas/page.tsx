"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import CanvasNode from "@/components/canvas/CanvasNode";
import { useInfiniteCanvas } from "@/hooks/useInfiniteCanvas";
import { Node, NodeType, AppMode } from "@/types";

export default function CanvasPage() {
  const router = useRouter();
  const { canvasRef, canvasState, isPanning, screenToWorld } =
    useInfiniteCanvas();
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "node-1",
      type: "note",
      x: 100,
      y: 100,
      width: 250,
      height: 180,
      content:
        "Welcome to your Mind Palace canvas!\n\nDouble-click to edit.\nDrag to move.",
    },
    {
      id: "node-2",
      type: "link",
      x: 400,
      y: 150,
      width: 200,
      height: 120,
      content: "Saved links and references",
    },
    {
      id: "node-3",
      type: "todo",
      x: 150,
      y: 350,
      width: 220,
      height: 160,
      content: "☐ Explore the canvas\n☐ Create new nodes\n☐ Connect ideas",
    },
  ]);

  const [draggingNode, setDraggingNode] = useState<Node | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showNodeMenu, setShowNodeMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleModeChange = (mode: AppMode) => {
    if (mode === "dashboard") {
      router.push("/palace/dashboard");
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current && !isPanning) {
      const rect = canvasRef.current.getBoundingClientRect();
      const worldPos = screenToWorld(
        e.clientX - rect.left,
        e.clientY - rect.top
      );
      setMenuPosition({ x: e.clientX, y: e.clientY });
      setShowNodeMenu(true);
    }
  };

  const handleNodeDragStart = useCallback(
    (e: React.MouseEvent, node: Node) => {
      e.stopPropagation();
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const worldPos = screenToWorld(
          e.clientX - rect.left,
          e.clientY - rect.top
        );
        setDraggingNode(node);
        setDragOffset({
          x: worldPos.x - node.x,
          y: worldPos.y - node.y,
        });
      }
    },
    [canvasRef, screenToWorld]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (draggingNode) {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          const worldPos = screenToWorld(
            e.clientX - rect.left,
            e.clientY - rect.top
          );
          setNodes((prev) =>
            prev.map((n) =>
              n.id === draggingNode.id
                ? {
                    ...n,
                    x: worldPos.x - dragOffset.x,
                    y: worldPos.y - dragOffset.y,
                  }
                : n
            )
          );
        }
      }
    },
    [draggingNode, dragOffset, canvasRef, screenToWorld]
  );

  const handleMouseUp = useCallback(() => {
    setDraggingNode(null);
  }, []);

  const createNode = (type: NodeType) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const worldPos = screenToWorld(
        menuPosition.x - rect.left,
        menuPosition.y - rect.top
      );
      const newNode: Node = {
        id: `node-${Date.now()}`,
        type,
        x: worldPos.x,
        y: worldPos.y,
        width: 250,
        height: 180,
        content: "",
      };
      setNodes([...nodes, newNode]);
      setShowNodeMenu(false);
    }
  };

  const updateNode = (id: string, updates: Partial<Node>) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );
  };

  const deleteNode = (id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <AppShell mode="canvas" onModeChange={handleModeChange}>
      <div
        ref={canvasRef}
        className="relative w-full h-full bg-gray-50 overflow-hidden cursor-grab active:cursor-grabbing"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isPanning ? "grabbing" : "grab" }}
      >
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e5e7eb 1px, transparent 1px),
              linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: `${40 * canvasState.scale}px ${
              40 * canvasState.scale
            }px`,
            backgroundPosition: `${canvasState.offsetX}px ${canvasState.offsetY}px`,
          }}
        />

        {/* Canvas Content */}
        <div
          className="absolute"
          style={{
            transform: `translate(${canvasState.offsetX}px, ${canvasState.offsetY}px) scale(${canvasState.scale})`,
            transformOrigin: "0 0",
          }}
        >
          {nodes.map((node) => (
            <CanvasNode
              key={node.id}
              node={node}
              scale={canvasState.scale}
              onDragStart={handleNodeDragStart}
              onUpdate={updateNode}
              onDelete={deleteNode}
            />
          ))}
        </div>

        {/* Empty State */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-4">
              <p className="text-2xl text-gray-400 font-light">
                Start anywhere. Structure can come later.
              </p>
              <p className="text-gray-400">Click anywhere to create a node</p>
            </div>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-medium border border-gray-200 p-2 flex flex-col space-y-2">
          <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded calm-transition text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <div className="text-xs text-center text-gray-500 py-1">
            {Math.round(canvasState.scale * 100)}%
          </div>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded calm-transition text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Node Creation Menu */}
      {showNodeMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowNodeMenu(false)}
          />
          <div
            className="fixed z-50 bg-white rounded-xl shadow-lift border border-gray-200 p-2 animate-scale-in"
            style={{
              left: menuPosition.x,
              top: menuPosition.y,
            }}
          >
            <div className="space-y-1 min-w-[160px]">
              {[
                { type: "note" as NodeType, label: "Note", color: "note" },
                { type: "link" as NodeType, label: "Link", color: "link" },
                { type: "todo" as NodeType, label: "Todo", color: "todo" },
                { type: "image" as NodeType, label: "Image", color: "image" },
                { type: "tweet" as NodeType, label: "Tweet", color: "image" },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => createNode(item.type)}
                  className={`w-full text-left px-4 py-2 rounded-lg hover:bg-${item.color}-light calm-transition text-sm`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}
