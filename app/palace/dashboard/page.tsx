"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import WidgetCard from "@/components/dashboard/WidgetCard";
import { mockWidgets } from "@/lib/mockData";
import { Widget, AppMode } from "@/types";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [widgets, setWidgets] = useState<Widget[]>(mockWidgets);
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(false);

  const handleModeChange = (mode: AppMode) => {
    if (mode === "canvas") {
      router.push("/palace/canvas");
    }
  };

  const handleRemoveWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  const handleDragStart = (e: React.DragEvent, widget: Widget) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", widget.id);
  };

  return (
    <AppShell mode="dashboard" onModeChange={handleModeChange}>
      <div className="h-full overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">
                Your organized view of what matters
              </p>
            </div>
            <button
              onClick={() => setShowWidgetLibrary(true)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-accent hover:text-accent calm-transition text-sm font-medium shadow-soft"
            >
              + Add Widget
            </button>
          </div>

          {/* Widget Grid */}
          <div className="grid grid-cols-3 gap-6 auto-rows-[240px]">
            {widgets.map((widget) => (
              <WidgetCard
                key={widget.id}
                widget={widget}
                onDragStart={handleDragStart}
                onRemove={handleRemoveWidget}
              />
            ))}
          </div>

          {/* Empty State */}
          {widgets.length === 0 && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700">
                  No widgets yet
                </h3>
                <p className="text-gray-500">
                  Add your first widget to get started
                </p>
                <button
                  onClick={() => setShowWidgetLibrary(true)}
                  className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark calm-transition font-medium shadow-soft"
                >
                  Add Widget
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Widget Library Modal */}
      {showWidgetLibrary && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-lift p-8 max-w-2xl w-full mx-4 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Add Widget</h2>
              <button
                onClick={() => setShowWidgetLibrary(false)}
                className="text-gray-400 hover:text-gray-600 calm-transition"
              >
                <svg
                  className="w-6 h-6"
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

            <div className="grid grid-cols-3 gap-4">
              {[
                { type: "chart-line", label: "Line Chart", color: "analytics" },
                { type: "chart-bar", label: "Bar Chart", color: "analytics" },
                { type: "stat-card", label: "Stat Card", color: "analytics" },
                { type: "notes", label: "Notes", color: "note" },
                { type: "tasks", label: "Tasks", color: "todo" },
                { type: "links", label: "Links", color: "link" },
                { type: "clock", label: "Clock", color: "image" },
                { type: "weather", label: "Weather", color: "image" },
              ].map((widgetType) => (
                <button
                  key={widgetType.type}
                  onClick={() => {
                    const newWidget: Widget = {
                      id: `widget-${Date.now()}`,
                      type: widgetType.type as any,
                      title: widgetType.label,
                      x: 0,
                      y: widgets.length,
                      width: 1,
                      height: 1,
                    };
                    setWidgets([...widgets, newWidget]);
                    setShowWidgetLibrary(false);
                  }}
                  className={`p-6 rounded-xl border-2 border-gray-200 hover:border-${widgetType.color} hover:bg-${widgetType.color}-light calm-transition text-center`}
                >
                  <div className="text-sm font-medium text-gray-700">
                    {widgetType.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
