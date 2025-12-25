"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-light to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-semibold text-foreground">
              Mind Palace
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-foreground calm-transition text-sm font-medium"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-dark calm-transition text-sm font-medium shadow-soft"
            >
              Get started
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
          <div
            className={`space-y-6 ${mounted ? "animate-fade-in" : "opacity-0"}`}
          >
            <h1 className="text-6xl font-bold text-foreground leading-tight">
              Your thinking space,
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                reimagined
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A calm, visual way to organize thoughts, ideas, and information.
              <br />
              No feeds. No noise. No pressure.
            </p>
            <div className="pt-6">
              <Link
                href="/palace/dashboard"
                className="inline-flex items-center px-8 py-4 rounded-lg bg-accent text-white hover:bg-accent-dark calm-transition text-lg font-medium shadow-medium hover:shadow-lift"
              >
                Enter Mind Palace
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative">
            <div className="bg-white rounded-2xl shadow-lift p-8 border border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-32 bg-note rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-600">Notes</span>
                </div>
                <div className="h-32 bg-link rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-600">Links</span>
                </div>
                <div className="h-32 bg-todo rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-600">Tasks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-foreground mb-16">
            A different kind of thinking tool
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-note rounded-full mx-auto flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-note-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                No feeds
              </h3>
              <p className="text-gray-600">
                Information you choose to remember, not algorithms deciding what
                you see.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-link rounded-full mx-auto flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-link-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                No noise
              </h3>
              <p className="text-gray-600">
                Calm interface designed for focus, not engagement metrics.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-todo rounded-full mx-auto flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-todo-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                No pressure
              </h3>
              <p className="text-gray-600">
                Think at your own pace. No deadlines, no notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-24">
          {/* Dashboard Preview */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-analytics-light rounded-full text-sm font-medium text-analytics-dark">
                Dashboard Mode
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                Glanceable clarity
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                See what matters right now. Widget-based dashboard shows your
                information in a structured, calm way.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-analytics"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Customizable widgets</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-analytics"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Drag and resize</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-analytics"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Charts, notes, tasks</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lift p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="h-24 bg-analytics rounded-lg"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-note rounded-lg"></div>
                  <div className="h-32 bg-todo rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Palace Preview */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-white rounded-2xl shadow-lift p-6 border border-gray-200">
              <div className="relative h-80 bg-gray-50 rounded-lg overflow-hidden">
                <div className="absolute top-8 left-8 w-32 h-24 bg-note rounded-lg shadow-soft"></div>
                <div className="absolute top-16 right-12 w-28 h-20 bg-link rounded-lg shadow-soft"></div>
                <div className="absolute bottom-12 left-16 w-36 h-28 bg-image rounded-lg shadow-soft"></div>
                <div className="absolute bottom-8 right-8 w-24 h-24 bg-todo rounded-lg shadow-soft"></div>
              </div>
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <div className="inline-block px-3 py-1 bg-image-light rounded-full text-sm font-medium text-image-dark">
                Palace Mode
              </div>
              <h2 className="text-4xl font-bold text-foreground">
                Spatial thinking
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Infinite canvas for free-form exploration. Place ideas anywhere,
                connect them visually.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-image"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Infinite 2D canvas</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-image"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Visual connections</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-image"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Topic grouping</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-bold text-foreground">
            Start private. Think clearly.
          </h2>
          <p className="text-lg text-gray-600">
            Your mind palace is yours alone. No sharing required.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-accent text-white hover:bg-accent-dark calm-transition text-lg font-medium shadow-medium hover:shadow-lift"
          >
            Create your Mind Palace
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-light to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-sm">Part of Cluster</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 Mind Palace. A tool for thinking.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
