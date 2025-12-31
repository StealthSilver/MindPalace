"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import CanvasNode from "@/components/canvas/CanvasNode";
import { useInfiniteCanvas } from "@/hooks/useInfiniteCanvas";
import { Node, NodeType, AppMode } from "@/types";
import { getNodes, saveNodes } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function CanvasPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const {
    canvasRef,
    canvasState,
    isPanning,
    screenToWorld,
    setIsPanningDisabled,
  } = useInfiniteCanvas();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);

  const [draggingNode, setDraggingNode] = useState<Node | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showNodeMenu, setShowNodeMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const pendingUpdatesRef = useRef<Node[]>([]);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [showTweetModal, setShowTweetModal] = useState(false);
  const [tweetUrl, setTweetUrl] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      loadNodes();
    }
  }, [user, authLoading, router]);

  const loadNodes = async () => {
    try {
      const data = await getNodes();
      setNodes(data.nodes || []);
    } catch (error) {
      console.error("Failed to load nodes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNodes = async (updatedNodes: Node[]) => {
    try {
      await saveNodes(updatedNodes);
    } catch (error) {
      console.error("Failed to save nodes:", error);
    }
  };

  const handleModeChange = (mode: AppMode) => {
    if (mode === "dashboard") {
      router.push("/palace/dashboard");
    }
  };

  const handleZoomIn = () => {
    // Access canvas state through ref and calculate new scale
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newScale = Math.min(3, canvasState.scale * 1.2);
    const scaleDelta = newScale - canvasState.scale;

    const worldX = (centerX - canvasState.offsetX) / canvasState.scale;
    const worldY = (centerY - canvasState.offsetY) / canvasState.scale;

    // Trigger zoom by dispatching wheel event to avoid state management complexity
    const wheelEvent = new WheelEvent("wheel", {
      deltaY: -50,
      clientX: centerX + rect.left,
      clientY: centerY + rect.top,
      bubbles: true,
      cancelable: true,
    });
    canvas.dispatchEvent(wheelEvent);
  };

  const handleZoomOut = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Trigger zoom by dispatching wheel event
    const wheelEvent = new WheelEvent("wheel", {
      deltaY: 50,
      clientX: centerX + rect.left,
      clientY: centerY + rect.top,
      bubbles: true,
      cancelable: true,
    });
    canvas.dispatchEvent(wheelEvent);
  };

  const handleZoomReset = () => {
    // Reset to 100% zoom
    if (canvasRef.current) {
      const wheelEvent = new WheelEvent("wheel", {
        deltaY: 100 * (1 - canvasState.scale),
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
        bubbles: true,
        cancelable: true,
      });
      canvasRef.current.dispatchEvent(wheelEvent);
    }
  };

  const handleCanvasDoubleClick = (e: React.MouseEvent) => {
    // Only open menu on double-click on empty canvas (left button)
    if (e.target === canvasRef.current && e.button === 0 && !isPanning) {
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
      // Only allow left-click to drag cards
      if (e.button !== 0) return;

      e.stopPropagation();
      setIsPanningDisabled(true);
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
        pendingUpdatesRef.current = nodes;
      }
    },
    [canvasRef, screenToWorld, setIsPanningDisabled, nodes]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      // Handle card dragging
      if (draggingNode && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const worldPos = screenToWorld(
          e.clientX - rect.left,
          e.clientY - rect.top
        );
        const updatedNodes = pendingUpdatesRef.current.map((n) =>
          n.id === draggingNode.id
            ? {
                ...n,
                x: worldPos.x - dragOffset.x,
                y: worldPos.y - dragOffset.y,
              }
            : n
        );
        pendingUpdatesRef.current = updatedNodes;
        setNodes(updatedNodes);
      }
    },
    [draggingNode, dragOffset, screenToWorld]
  );

  const handleMouseUp = useCallback(async () => {
    if (draggingNode) {
      await handleSaveNodes(nodes);
    }
    setDraggingNode(null);
    setIsPanningDisabled(false);
  }, [draggingNode, nodes, setIsPanningDisabled]);

  const createNode = async (type: NodeType) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      if (type === "link") {
        setShowNodeMenu(false);
        setShowLinkModal(true);
        return;
      }

      if (type === "tweet") {
        setShowNodeMenu(false);
        setShowTweetModal(true);
        return;
      }

      if (type === "image") {
        setShowNodeMenu(false);
        setShowImageModal(true);
        return;
      }

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
        height: 240,
        content: "",
        todos: type === "todo" ? [] : undefined,
      };
      const updatedNodes = [...nodes, newNode];
      setNodes(updatedNodes);
      await handleSaveNodes(updatedNodes);
      setShowNodeMenu(false);
    }
  };

  const saveLinkNode = async () => {
    if (!linkName || !linkUrl) {
      alert("Please fill in both name and URL");
      return;
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const worldPos = screenToWorld(
        menuPosition.x - rect.left,
        menuPosition.y - rect.top
      );
      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: "link",
        x: worldPos.x,
        y: worldPos.y,
        width: 280,
        height: 300,
        content: "",
        linkName,
        linkUrl,
      };
      const updatedNodes = [...nodes, newNode];
      setNodes(updatedNodes);
      await handleSaveNodes(updatedNodes);
      setShowLinkModal(false);
      setLinkName("");
      setLinkUrl("");
    }
  };

  const saveTweetNode = async () => {
    if (!tweetUrl) {
      alert("Please enter a tweet URL");
      return;
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const worldPos = screenToWorld(
        menuPosition.x - rect.left,
        menuPosition.y - rect.top
      );
      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: "tweet",
        x: worldPos.x,
        y: worldPos.y,
        width: 320,
        height: 400,
        content: "",
        tweetUrl,
      };
      const updatedNodes = [...nodes, newNode];
      setNodes(updatedNodes);
      await handleSaveNodes(updatedNodes);
      setShowTweetModal(false);
      setTweetUrl("");
    }
  };

  const saveImageNode = async () => {
    if (!imageUrl) {
      alert("Please add an image URL or upload an image");
      return;
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const worldPos = screenToWorld(
        menuPosition.x - rect.left,
        menuPosition.y - rect.top
      );
      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: "image",
        x: worldPos.x,
        y: worldPos.y,
        width: 320,
        height: 320,
        content: "",
        imageUrl,
      };
      const updatedNodes = [...nodes, newNode];
      setNodes(updatedNodes);
      await handleSaveNodes(updatedNodes);
      setShowImageModal(false);
      setImageUrl("");
    }
  };

  const updateNode = async (id: string, updates: Partial<Node>) => {
    const updatedNodes = nodes.map((n) =>
      n.id === id ? { ...n, ...updates } : n
    );
    setNodes(updatedNodes);
    await handleSaveNodes(updatedNodes);
  };

  const deleteNode = async (id: string) => {
    const updatedNodes = nodes.filter((n) => n.id !== id);
    setNodes(updatedNodes);
    await handleSaveNodes(updatedNodes);
  };

  if (authLoading || loading) {
    return (
      <AppShell mode="canvas" onModeChange={handleModeChange}>
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell mode="canvas" onModeChange={handleModeChange}>
      <div
        ref={canvasRef}
        className="relative w-full h-full bg-gray-50 overflow-hidden"
        onDoubleClick={handleCanvasDoubleClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isPanning ? "grabbing" : "default" }}
        onContextMenu={(e) => e.preventDefault()}
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
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-700">
                  Start anywhere. Structure comes later.
                </p>
                <p className="text-gray-500 mt-2">
                  Double-click to create your first node
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute bottom-8 right-8 bg-white rounded-xl shadow-lift border border-gray-200 p-1 flex flex-col space-y-0">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg calm-transition text-gray-600 font-medium"
            title="Zoom in"
          >
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
          <div className="text-xs text-center text-gray-500 py-1.5 w-10 font-semibold">
            {Math.round(canvasState.scale * 100)}%
          </div>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg calm-transition text-gray-600 font-medium"
            title="Zoom out"
          >
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
          <div className="h-px bg-gray-200"></div>
          <button
            onClick={handleZoomReset}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg calm-transition text-gray-600 text-xs font-bold"
            title="Reset zoom"
          >
            1:1
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
            className="fixed z-50 bg-white rounded-xl shadow-lift border border-gray-200 p-2 animate-scale-in backdrop-blur-sm"
            style={{
              left: menuPosition.x,
              top: menuPosition.y,
            }}
          >
            <div className="space-y-1 min-w-[160px]">
              {[
                { type: "note" as NodeType, label: "Note" },
                { type: "link" as NodeType, label: "Link" },
                { type: "todo" as NodeType, label: "Todo" },
                { type: "image" as NodeType, label: "Image" },
                { type: "tweet" as NodeType, label: "Tweet" },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => createNode(item.type)}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 calm-transition text-sm font-medium text-gray-700"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Link Creation Modal */}
      {showLinkModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowLinkModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-lift border border-gray-200 p-6 w-96 animate-scale-in flex flex-col max-h-[90vh]">
            <h2 className="text-lg font-bold text-foreground mb-4 flex-shrink-0">
              Add Link
            </h2>
            <div className="space-y-3 flex-1 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Link Name
                </label>
                <input
                  type="text"
                  value={linkName}
                  onChange={(e) => setLinkName(e.target.value)}
                  placeholder="e.g., My Blog"
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent calm-transition"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="e.g., https://example.com"
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent calm-transition"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-4 mt-2 flex-shrink-0 border-t border-gray-200">
              <button
                onClick={() => setShowLinkModal(false)}
                className="px-2 py-1 text-xs text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 calm-transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveLinkNode}
                className="px-2 py-1 text-xs bg-accent text-white rounded-lg hover:bg-accent-dark calm-transition font-medium shadow-soft"
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}

      {/* Tweet Creation Modal */}
      {showTweetModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowTweetModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-lift border border-gray-200 p-8 w-96 animate-scale-in">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Add Tweet
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tweet URL
                </label>
                <input
                  type="text"
                  value={tweetUrl}
                  onChange={(e) => setTweetUrl(e.target.value)}
                  placeholder="e.g., https://twitter.com/user/status/1234567890"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent calm-transition"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 justify-end pt-6">
                <button
                  onClick={() => setShowTweetModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 calm-transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={saveTweetNode}
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark calm-transition font-medium shadow-soft"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Image Creation Modal */}
      {showImageModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowImageModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-lift border border-gray-200 p-8 w-96 max-h-[90vh] animate-scale-in flex flex-col">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex-shrink-0">
              Add Image
            </h2>
            <div className="space-y-4 flex-1 overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="e.g., https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent calm-transition"
                  autoFocus
                />
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const result = event.target?.result as string;
                        setImageUrl(result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent calm-transition cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-accent file:text-white hover:file:bg-accent-dark"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
                </p>
              </div>
              {imageUrl && (
                <div className="mt-2 flex-shrink-0">
                  <p className="text-xs font-semibold text-gray-700 mb-1.5">
                    Preview (as it will appear in card):
                  </p>
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-white/30 to-white/10 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      onError={() => {
                        alert("Failed to load image");
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3 justify-end pt-4 mt-2 flex-shrink-0 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setImageUrl("");
                }}
                className="px-4 py-2 text-xs text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 calm-transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveImageNode}
                className="px-4 py-2 text-xs bg-accent text-white rounded-lg hover:bg-accent-dark calm-transition font-medium shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!imageUrl}
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}
