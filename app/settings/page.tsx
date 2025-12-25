"use client";

import { useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [accentColor, setAccentColor] = useState("#8B9AFF");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/palace/dashboard"
              className="text-gray-500 hover:text-gray-700 calm-transition"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Appearance */}
          <section className="bg-white rounded-2xl shadow-soft border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Appearance
            </h2>

            <div className="space-y-6">
              {/* Theme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Theme
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex-1 p-4 rounded-lg border-2 calm-transition ${
                      theme === "light"
                        ? "border-accent bg-accent-light"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
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
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <span className="font-medium">Light</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex-1 p-4 rounded-lg border-2 calm-transition ${
                      theme === "dark"
                        ? "border-accent bg-accent-light"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
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
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                      <span className="font-medium">Dark</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Accent Color
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-16 h-16 rounded-lg border-2 border-gray-200 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">
                      Current color
                    </div>
                    <div className="font-mono text-sm text-gray-900">
                      {accentColor}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Keyboard Shortcuts */}
          <section className="bg-white rounded-2xl shadow-soft border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Keyboard Shortcuts
            </h2>

            <div className="space-y-4">
              {[
                { action: "Open command palette", keys: ["⌘", "K"] },
                { action: "Switch to Dashboard", keys: ["⌘", "1"] },
                { action: "Switch to Palace", keys: ["⌘", "2"] },
                { action: "Create new note", keys: ["⌘", "N"] },
                { action: "Search", keys: ["⌘", "F"] },
              ].map((shortcut, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <span className="text-gray-700">{shortcut.action}</span>
                  <div className="flex items-center space-x-1">
                    {shortcut.keys.map((key, j) => (
                      <kbd
                        key={j}
                        className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-sm font-medium"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Data & Privacy */}
          <section className="bg-white rounded-2xl shadow-soft border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Data & Privacy
            </h2>

            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-accent hover:bg-accent-light/30 calm-transition">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Export Data</div>
                    <div className="text-sm text-gray-500">
                      Download all your palace data
                    </div>
                  </div>
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </div>
              </button>

              <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-accent hover:bg-accent-light/30 calm-transition">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Clear Cache</div>
                    <div className="text-sm text-gray-500">
                      Remove temporary files
                    </div>
                  </div>
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </section>

          {/* About */}
          <section className="bg-white rounded-2xl shadow-soft border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              About
            </h2>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center justify-between py-2">
                <span>Version</span>
                <span className="font-medium text-gray-900">1.0.0</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Part of</span>
                <span className="font-medium text-gray-900">
                  Cluster Platform
                </span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-500 leading-relaxed">
                  Mind Palace is a personal cognitive environment for organizing
                  thoughts, ideas, and information in a calm, visual way.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
