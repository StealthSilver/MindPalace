"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    document.querySelectorAll("[data-scroll-animate]").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Navigation */}
        <nav
          className={`max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? "shadow-soft bg-white/80 backdrop-blur-sm rounded-b-lg"
              : ""
          }`}
        >
          <div className="flex items-center space-x-2 md:space-x-3">
            <Image
              src="/logo.svg"
              alt="Mind Palace Logo"
              width={180}
              height={40}
              className="w-auto h-8 md:h-10"
            />
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              href="/login"
              className="hidden md:block text-gray-600 hover:text-foreground calm-transition text-xs md:text-sm font-medium"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="px-2 md:px-4 py-1.5 md:py-2 rounded-lg bg-accent text-white hover:bg-accent-dark calm-transition text-xs md:text-sm font-medium shadow-soft hover:shadow-medium"
            >
              Get started
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-20 md:pb-32 text-center">
          <div
            className={`space-y-4 md:space-y-6 ${
              mounted ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Your thinking space,
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                reimagined
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
              A calm, visual way to organize thoughts, ideas, and information.
              <br className="hidden sm:block" />
              No feeds. No noise. No pressure.
            </p>
            <div className="pt-4 md:pt-6">
              <Link
                href="/palace/dashboard"
                className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 rounded-lg bg-accent text-white hover:bg-accent-dark calm-transition text-base md:text-lg font-medium shadow-medium hover:shadow-lift hover:scale-105 active:animate-tap-scale"
              >
                Enter Mind Palace
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
          <div
            className={`mt-12 md:mt-20 relative ${
              mounted ? "animate-slide-up stagger-2" : "opacity-0"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lift p-6 md:p-8 border border-gray-200 hover:shadow-lift transform hover:scale-105 transition-all duration-500">
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div className="h-24 md:h-32 bg-note rounded-lg flex items-center justify-center hover:shadow-soft transition-all duration-300 transform hover:-translate-y-2">
                  <span className="text-xs md:text-sm text-gray-600">
                    Notes
                  </span>
                </div>
                <div className="h-24 md:h-32 bg-link rounded-lg flex items-center justify-center hover:shadow-soft transition-all duration-300 transform hover:-translate-y-2">
                  <span className="text-xs md:text-sm text-gray-600">
                    Links
                  </span>
                </div>
                <div className="h-24 md:h-32 bg-todo rounded-lg flex items-center justify-center hover:shadow-soft transition-all duration-300 transform hover:-translate-y-2">
                  <span className="text-xs md:text-sm text-gray-600">
                    Tasks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12 md:mb-16 animate-slide-up">
            A different kind of thinking tool
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div
              id="philosophy-1"
              data-scroll-animate="true"
              className={`text-center space-y-4 transition-all duration-700 ${
                visibleElements.has("philosophy-1")
                  ? "animate-bounce-in stagger-1"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-16 h-16 bg-note rounded-full mx-auto flex items-center justify-center hover-scale transition-all duration-300 cursor-pointer">
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
              <h3 className="text-lg md:text-xl font-semibold text-foreground hover:text-accent transition-colors duration-300">
                No feeds
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Information you choose to remember, not algorithms deciding what
                you see.
              </p>
            </div>
            <div
              id="philosophy-2"
              data-scroll-animate="true"
              className={`text-center space-y-4 transition-all duration-700 ${
                visibleElements.has("philosophy-2")
                  ? "animate-bounce-in stagger-2"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-16 h-16 bg-link rounded-full mx-auto flex items-center justify-center hover-scale transition-all duration-300 cursor-pointer">
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
              <h3 className="text-lg md:text-xl font-semibold text-foreground hover:text-accent transition-colors duration-300">
                No noise
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Calm interface designed for focus, not engagement metrics.
              </p>
            </div>
            <div
              id="philosophy-3"
              data-scroll-animate="true"
              className={`text-center space-y-4 transition-all duration-700 ${
                visibleElements.has("philosophy-3")
                  ? "animate-bounce-in stagger-3"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-16 h-16 bg-todo rounded-full mx-auto flex items-center justify-center hover-scale transition-all duration-300 cursor-pointer">
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
              <h3 className="text-lg md:text-xl font-semibold text-foreground hover:text-accent transition-colors duration-300">
                No pressure
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Think at your own pace. No deadlines, no notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-16 md:space-y-24">
          {/* Dashboard Preview */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div
              className={`space-y-4 md:space-y-6 animate-slide-in-left ${
                mounted ? "" : "opacity-0"
              }`}
            >
              <div className="inline-block px-3 py-1 bg-analytics-light rounded-full text-xs md:text-sm font-medium text-black">
                Dashboard Mode
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">
                Glanceable clarity
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                See what matters right now. Widget-based dashboard shows your
                information in a structured, calm way.
              </p>
              <ul className="space-y-2 md:space-y-3 text-gray-600">
                <li className="flex items-center space-x-3 text-sm md:text-base">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-analytics flex-shrink-0"
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
                <li className="flex items-center space-x-3 text-sm md:text-base">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-analytics flex-shrink-0"
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
                <li className="flex items-center space-x-3 text-sm md:text-base">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-analytics flex-shrink-0"
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
            <div
              className={`bg-white rounded-2xl shadow-lift p-4 md:p-6 border border-gray-200 hover-lift transition-all duration-500 animate-slide-in-right ${
                mounted ? "" : "opacity-0"
              }`}
            >
              <div className="space-y-4">
                <div className="h-20 md:h-24 bg-analytics rounded-lg hover:animate-glow transition-all duration-300"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 md:h-32 bg-note rounded-lg hover:animate-glow transition-all duration-300 cursor-pointer hover:-translate-y-1"></div>
                  <div className="h-24 md:h-32 bg-todo rounded-lg hover:animate-glow transition-all duration-300 cursor-pointer hover:-translate-y-1"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Palace Preview */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div
              className={`order-2 md:order-1 bg-white rounded-2xl shadow-lift p-4 md:p-6 border border-gray-200 hover-lift transition-all duration-500 animate-slide-in-left ${
                mounted ? "" : "opacity-0"
              }`}
            >
              <div className="relative h-60 md:h-80 bg-gray-50 rounded-lg overflow-hidden">
                <div className="absolute top-6 md:top-8 left-6 md:left-8 w-24 md:w-32 h-20 md:h-24 bg-note rounded-lg shadow-soft hover:shadow-medium hover:animate-glow transition-all duration-300 cursor-pointer hover:-translate-y-2"></div>
                <div className="absolute top-12 md:top-16 right-8 md:right-12 w-24 md:w-28 h-16 md:h-20 bg-link rounded-lg shadow-soft hover:shadow-medium hover:animate-glow transition-all duration-300 cursor-pointer hover:-translate-y-2"></div>
                <div className="absolute bottom-8 md:bottom-12 left-12 md:left-16 w-28 md:w-36 h-20 md:h-28 bg-image rounded-lg shadow-soft hover:shadow-medium hover:animate-glow transition-all duration-300 cursor-pointer hover:-translate-y-2"></div>
                <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 w-20 md:w-24 h-20 md:h-24 bg-todo rounded-lg shadow-soft hover:shadow-medium hover:animate-glow transition-all duration-300 cursor-pointer hover:-translate-y-2"></div>
              </div>
            </div>
            <div
              className={`space-y-4 md:space-y-6 order-1 md:order-2 animate-slide-in-right ${
                mounted ? "" : "opacity-0"
              }`}
            >
              <div className="inline-block px-3 py-1 bg-image-light rounded-full text-xs md:text-sm font-medium text-black">
                Palace Mode
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">
                Spatial thinking
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Infinite canvas for free-form exploration. Place ideas anywhere,
                connect them visually.
              </p>
              <ul className="space-y-2 md:space-y-3 text-gray-600">
                <li className="flex items-center space-x-3 text-sm md:text-base">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-image flex-shrink-0"
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
                <li className="flex items-center space-x-3 text-sm md:text-base">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-image flex-shrink-0"
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
                <li className="flex items-center space-x-3 text-sm md:text-base">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-image flex-shrink-0"
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
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center space-y-6 md:space-y-8 animate-slide-up">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Start private. Think clearly.
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Your mind palace is yours alone. No sharing required.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 rounded-lg bg-accent text-white hover:bg-accent-dark calm-transition text-base md:text-lg font-medium shadow-medium hover:shadow-lift hover:scale-105 active:animate-tap-scale"
          >
            Create your Mind Palace
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-light to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xs md:text-sm">Part of Cluster</span>
            </div>
            <p className="text-xs md:text-sm text-gray-500 text-center md:text-right">
              © 2025 Mind Palace. A tool for thinking.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
