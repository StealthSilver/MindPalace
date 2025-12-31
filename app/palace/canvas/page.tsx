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
      // Only allow left-click to drag
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
        height: 180,
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
        width: 250,
        height: 180,
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
        width: 350,
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
        width: 300,
        height: 300,
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
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded calm-transition text-gray-600"
            title="Zoom in (⌘ +)"
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
          <div className="text-xs text-center text-gray-500 py-1 w-10">
            {Math.round(canvasState.scale * 100)}%
          </div>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded calm-transition text-gray-600"
            title="Zoom out (⌘ -)"
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
          <button
            onClick={handleZoomReset}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded calm-transition text-gray-600 text-xs font-semibold"
            title="Reset zoom (⌘ 0)"
          >
            1x
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

      {/* Link Creation Modal */}
      {showLinkModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setShowLinkModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-lift border border-gray-200 p-6 w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Link
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link Name
                </label>
                <input
                  type="text"
                  value={linkName}
                  onChange={(e) => setLinkName(e.target.value)}
                  placeholder="e.g., My Blog"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="e.g., https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <button
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveLinkNode}
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Tweet Creation Modal */}
      {showTweetModal && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setShowTweetModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-lift border border-gray-200 p-6 w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Tweet
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tweet URL
                </label>
                <input
                  type="text"
                  value={tweetUrl}
                  onChange={(e) => setTweetUrl(e.target.value)}
                  placeholder="e.g., https://twitter.com/user/status/1234567890"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  autoFocus
                />
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <button
                  onClick={() => setShowTweetModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveTweetNode}
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark"
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
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setShowImageModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-lift border border-gray-200 p-6 w-96 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Image
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="e.g., https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPG, PNG, GIF, WebP
                </p>
              </div>
              {imageUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Preview:
                  </p>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full max-h-40 object-cover rounded-lg"
                    onError={() => {
                      alert("Failed to load image");
                    }}
                  />
                </div>
              )}
              <div className="flex gap-2 justify-end pt-4">
                <button
                  onClick={() => {
                    setShowImageModal(false);
                    setImageUrl("");
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveImageNode}
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!imageUrl}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}
