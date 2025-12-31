"use client";

import { Node, TodoItem } from "@/types";
import { useState } from "react";

const extractTweetId = (url: string): string => {
  const match = url.match(/status\/(\d+)/);
  return match ? match[1] : "";
};

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
  const [linkName, setLinkName] = useState(node.linkName || "");
  const [linkUrl, setLinkUrl] = useState(node.linkUrl || "");
  const [todos, setTodos] = useState<TodoItem[]>(node.todos || []);
  const [newTodoText, setNewTodoText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editingTodoText, setEditingTodoText] = useState("");
  const [tweetUrl, setTweetUrl] = useState(node.tweetUrl || "");
  const [isLoadingTweet, setIsLoadingTweet] = useState(false);

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
    if (node.type === "link") {
      onUpdate(node.id, { linkName, linkUrl });
    } else if (node.type === "todo") {
      onUpdate(node.id, { todos });
    } else if (node.type === "tweet") {
      onUpdate(node.id, { tweetUrl });
    } else if (content !== node.content) {
      onUpdate(node.id, { content });
    }
  };

  const addTodo = () => {
    if (newTodoText.trim() && todos.length < 4) {
      const updatedTodos = [
        ...todos,
        { id: `todo-${Date.now()}`, text: newTodoText, completed: false },
      ];
      setTodos(updatedTodos);
      onUpdate(node.id, { todos: updatedTodos });
      setNewTodoText("");
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);
    onUpdate(node.id, { todos: updatedTodos });
  };

  const updateTodo = (id: string, text: string) => {
    const updatedTodos = todos.map((t) => (t.id === id ? { ...t, text } : t));
    setTodos(updatedTodos);
    onUpdate(node.id, { todos: updatedTodos });
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
    onUpdate(node.id, { todos: updatedTodos });
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
          onClick={(e) => {
            e.stopPropagation();
            onDelete(node.id);
          }}
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
      <div
        className="px-4 pb-4 overflow-y-auto"
        style={{ maxHeight: "calc(100% - 60px)" }}
      >
        {node.type === "link" ? (
          isEditing ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={linkName}
                  onChange={(e) => setLinkName(e.target.value)}
                  onBlur={handleBlur}
                  autoFocus
                  className="w-full px-2 py-1 bg-transparent border border-gray-300 rounded text-gray-800 text-sm"
                  style={{ fontSize: `${14 / scale}px` }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  URL
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onBlur={handleBlur}
                  className="w-full px-2 py-1 bg-transparent border border-gray-300 rounded text-gray-800 text-sm"
                  style={{ fontSize: `${14 / scale}px` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {linkName && (
                <div className="font-semibold text-gray-800 text-sm">
                  {linkName}
                </div>
              )}
              {linkUrl && (
                <a
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 underline text-xs break-all"
                  style={{ fontSize: `${12 / scale}px` }}
                >
                  {linkUrl}
                </a>
              )}
              {!linkName && !linkUrl && (
                <div className="text-gray-500 text-sm">
                  Double-click to add link
                </div>
              )}
            </div>
          )
        ) : node.type === "todo" ? (
          <div className="space-y-3">
            {todos.length > 0 && (
              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-start gap-2 group/todo"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="mt-1 w-4 h-4 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                    {editingTodoId === todo.id ? (
                      <input
                        type="text"
                        value={editingTodoText}
                        onChange={(e) => setEditingTodoText(e.target.value)}
                        onBlur={() => {
                          updateTodo(todo.id, editingTodoText);
                          setEditingTodoId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateTodo(todo.id, editingTodoText);
                            setEditingTodoId(null);
                          }
                        }}
                        autoFocus
                        className="flex-1 px-2 py-1 bg-transparent border border-gray-300 rounded text-gray-800 text-sm"
                        style={{ fontSize: `${12 / scale}px` }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span
                        onDoubleClick={() => {
                          setEditingTodoId(todo.id);
                          setEditingTodoText(todo.text);
                        }}
                        className={`flex-1 text-sm cursor-text ${
                          todo.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                        style={{ fontSize: `${12 / scale}px` }}
                      >
                        {todo.text}
                      </span>
                    )}
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover/todo:opacity-100 text-gray-400 hover:text-red-500"
                    >
                      <svg
                        className="w-3 h-3"
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
                ))}
              </div>
            )}
            {todos.length < 4 && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTodo();
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  placeholder="Add a todo..."
                  className="flex-1 px-2 py-1 bg-transparent border border-gray-300 rounded text-gray-800 text-sm"
                  style={{ fontSize: `${12 / scale}px` }}
                />
                <button
                  onClick={() => addTodo()}
                  className="px-2 py-1 bg-accent text-white rounded text-xs hover:bg-accent-dark"
                >
                  Add
                </button>
              </div>
            )}
            {todos.length === 0 && (
              <div className="text-gray-500 text-sm">
                Double-click to add todos
              </div>
            )}
          </div>
        ) : node.type === "tweet" ? (
          isEditing ? (
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Tweet URL
              </label>
              <input
                type="text"
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                onBlur={handleBlur}
                autoFocus
                placeholder="https://twitter.com/user/status/..."
                className="w-full px-2 py-1 bg-transparent border border-gray-300 rounded text-gray-800 text-sm"
                style={{ fontSize: `${12 / scale}px` }}
              />
            </div>
          ) : (
            <div className="space-y-2">
              {tweetUrl ? (
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <div className="text-sm text-gray-600">Tweet embedded</div>
                  <iframe
                    src={`https://platform.twitter.com/embed/Tweet.html?id=${extractTweetId(
                      tweetUrl
                    )}&theme=light`}
                    width="100%"
                    height="auto"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                    className="twitter-tweet"
                    style={{ minHeight: "100px" }}
                  />
                </div>
              ) : (
                <div className="text-gray-500 text-sm text-center h-full flex items-center justify-center">
                  Double-click to add tweet URL
                </div>
              )}
            </div>
          )
        ) : isEditing ? (
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
