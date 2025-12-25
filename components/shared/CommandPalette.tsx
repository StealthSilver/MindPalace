"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  action: () => void;
  category: string;
}

export default function CommandPalette({
  isOpen,
  onClose,
}: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = [
    {
      id: "goto-dashboard",
      label: "Go to Dashboard",
      category: "Navigation",
      action: () => {
        router.push("/palace/dashboard");
        onClose();
      },
    },
    {
      id: "goto-canvas",
      label: "Go to Palace Canvas",
      category: "Navigation",
      action: () => {
        router.push("/palace/canvas");
        onClose();
      },
    },
    {
      id: "goto-settings",
      label: "Open Settings",
      category: "Navigation",
      action: () => {
        router.push("/settings");
        onClose();
      },
    },
    {
      id: "create-note",
      label: "Create Note",
      category: "Create",
      action: () => {
        // Implementation would create a new note
        onClose();
      },
    },
    {
      id: "create-todo",
      label: "Create Todo",
      category: "Create",
      action: () => {
        // Implementation would create a new todo
        onClose();
      },
    },
    {
      id: "add-widget",
      label: "Add Widget",
      category: "Dashboard",
      action: () => {
        router.push("/palace/dashboard");
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, filteredCommands.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filteredCommands[selectedIndex]?.action();
      }
    },
    [isOpen, onClose, filteredCommands, selectedIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-lift border border-gray-200 animate-scale-in">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search commands..."
              className="flex-1 outline-none text-lg"
              autoFocus
            />
            <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
              ESC
            </kbd>
          </div>
        </div>

        {/* Commands List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredCommands.length > 0 ? (
            <div className="space-y-1">
              {filteredCommands.map((cmd, index) => (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className={`w-full text-left px-4 py-3 rounded-lg calm-transition flex items-center justify-between ${
                    index === selectedIndex
                      ? "bg-accent text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-xs font-medium ${
                        index === selectedIndex
                          ? "text-white/70"
                          : "text-gray-500"
                      }`}
                    >
                      {cmd.category}
                    </span>
                    <span>{cmd.label}</span>
                  </div>
                  {cmd.shortcut && (
                    <kbd
                      className={`px-2 py-1 text-xs rounded ${
                        index === selectedIndex ? "bg-white/20" : "bg-gray-200"
                      }`}
                    >
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              No commands found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <kbd className="px-2 py-1 bg-gray-100 rounded">↑↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-2 py-1 bg-gray-100 rounded">↵</kbd>
              <span>Select</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
