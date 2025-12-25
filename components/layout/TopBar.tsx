"use client";

import { AppMode } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

interface TopBarProps {
  mode: AppMode;
  onModeChange?: (mode: AppMode) => void;
}

export default function TopBar({ mode, onModeChange }: TopBarProps) {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

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

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 calm-transition"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-light to-accent flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user?.name}
          </span>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-medium border border-gray-200 py-2">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 calm-transition"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
