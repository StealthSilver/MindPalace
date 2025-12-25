"use client";

import { AppMode } from "@/types";

interface TopBarProps {
  mode: AppMode;
  onModeChange?: (mode: AppMode) => void;
}

export default function TopBar({ mode, onModeChange }: TopBarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Mode Switcher */}
      <div className="flex items-center space-x-2">
        <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
          <button
            onClick={() => onModeChange?.("dashboard")}
            className={`
              px-4 py-2 rounded-md text-sm font-medium calm-transition
              ${
                mode === "dashboard"
                  ? "bg-white text-foreground shadow-soft"
                  : "text-gray-600 hover:text-gray-900"
              }
            `}
          >
            Dashboard
          </button>
          <button
            onClick={() => onModeChange?.("canvas")}
            className={`
              px-4 py-2 rounded-md text-sm font-medium calm-transition
              ${
                mode === "canvas"
                  ? "bg-white text-foreground shadow-soft"
                  : "text-gray-600 hover:text-gray-900"
              }
            `}
          >
            Palace
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <button className="w-9 h-9 rounded-lg bg-accent text-white flex items-center justify-center hover:bg-accent-dark calm-transition shadow-soft">
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
      </div>
    </header>
  );
}
