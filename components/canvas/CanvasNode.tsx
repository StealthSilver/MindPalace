"use client";

import { Node } from "@/types";
import { useState } from "react";

interface CanvasNodeProps {
  node: Node;
  scale: number;
  onDragStart: (e: React.MouseEvent, node: Node) => void;
  onUpdate: (id: string, updates: Partial<Node>) => void;
  onDelete: (id: string) => void;
}

export default function CanvasNode({
  node,
  scale,
  onDragStart,
  onUpdate,
  onDelete,
}: CanvasNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(node.content);

  const getNodeColor = () => {
    switch (node.type) {
      case "note":
        return "bg-note";
      case "link":
        return "bg-link";
      case "image":
        return "bg-image";
      case "todo":
        return "bg-todo";
      case "tweet":
        return "bg-image-light";
      default:
        return "bg-white";
    }
  };

  const getNodeIcon = () => {
    switch (node.type) {
      case "note":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case "link":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        );
      case "todo":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (content !== node.content) {
      onUpdate(node.id, { content });
    }
  };

  return (
    <div
      className={`absolute ${getNodeColor()} rounded-xl shadow-medium border-2 border-transparent hover:border-accent/30 calm-transition cursor-move group`}
      style={{
        left: node.x,
        top: node.y,
        width: node.width,
        height: node.height,
        transform: `scale(${1 / scale})`,
        transformOrigin: "top left",
      }}
      onMouseDown={(e) => {
        if (!isEditing) {
          onDragStart(e, node);
        }
      }}
      onDoubleClick={handleDoubleClick}
    >
      {/* Node Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-700">
          {getNodeIcon()}
          <span className="text-xs font-medium uppercase tracking-wide">
            {node.type}
          </span>
        </div>
        <button
          onClick={() => onDelete(node.id)}
          className="opacity-0 group-hover:opacity-100 calm-transition text-gray-400 hover:text-red-500"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Node Content */}
      <div className="px-4 pb-4">
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-800"
            style={{ fontSize: `${16 / scale}px` }}
          />
        ) : (
          <div className="text-gray-800 whitespace-pre-wrap break-words">
            {node.content || "Double-click to edit"}
          </div>
        )}
      </div>
    </div>
  );
}
