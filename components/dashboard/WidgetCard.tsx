"use client";

import { Widget } from "@/types";

interface WidgetCardProps {
  widget: Widget;
  onDragStart?: (e: React.DragEvent, widget: Widget) => void;
  onRemove?: (id: string) => void;
}

export default function WidgetCard({
  widget,
  onDragStart,
  onRemove,
}: WidgetCardProps) {
  const renderContent = () => {
    switch (widget.type) {
      case "chart-line":
        return <LineChart data={widget.data} />;
      case "stat-card":
        return <StatCard data={widget.data} />;
      case "notes":
        return <NotesWidget data={widget.data} />;
      case "tasks":
        return <TasksWidget data={widget.data} />;
      case "links":
        return <LinksWidget data={widget.data} />;
      case "clock":
        return <ClockWidget />;
      default:
        return (
          <div className="text-gray-400 text-sm">
            Widget type not implemented
          </div>
        );
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, widget)}
      className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 hover:shadow-medium calm-transition cursor-move group relative"
      style={{
        gridColumn: `span ${widget.width}`,
        gridRow: `span ${widget.height}`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{widget.title}</h3>
        <button
          onClick={() => onRemove?.(widget.id)}
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

      {/* Content */}
      <div className="h-full">{renderContent()}</div>
    </div>
  );
}

// Widget Components
function LineChart({ data }: any) {
  if (!data || !data.values || data.values.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-gray-400 text-sm">
        No data available
      </div>
    );
  }

  const max = Math.max(...data.values);

  return (
    <div className="h-32 flex items-end space-x-2">
      {data.values.map((value: number, i: number) => (
        <div key={i} className="flex-1 flex flex-col items-center space-y-2">
          <div
            className="w-full bg-analytics rounded-t"
            style={{ height: `${(value / max) * 100}%` }}
          />
          <span className="text-xs text-gray-500">
            {data.labels && data.labels[i] ? data.labels[i] : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

function StatCard({ data }: any) {
  if (!data) {
    return (
      <div className="space-y-2">
        <div className="text-4xl font-bold text-foreground">0</div>
        <div className="text-sm text-gray-500">No data</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-4xl font-bold text-foreground">
        {data.value || 0}
      </div>
      <div className="flex items-center space-x-2">
        <span
          className={`text-sm font-medium ${
            data.trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {data.change || "0%"}
        </span>
        <span className="text-sm text-gray-500">this week</span>
      </div>
    </div>
  );
}

function NotesWidget({ data }: any) {
  return (
    <div className="bg-note-light rounded-lg p-4 h-32">
      <p className="text-gray-700 text-sm">
        {data?.content || "Click to add notes..."}
      </p>
    </div>
  );
}

function TasksWidget({ data }: any) {
  if (!data || !data.tasks || data.tasks.length === 0) {
    return <div className="text-gray-400 text-sm">No tasks yet</div>;
  }

  return (
    <div className="space-y-2">
      {data.tasks.map((task: any) => (
        <label
          key={task.id}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={task.completed || false}
            readOnly
            className="w-4 h-4 rounded border-gray-300 text-todo focus:ring-todo"
          />
          <span
            className={`text-sm ${
              task.completed ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {task.text}
          </span>
        </label>
      ))}
    </div>
  );
}

function LinksWidget({ data }: any) {
  if (!data || !data.links || data.links.length === 0) {
    return <div className="text-gray-400 text-sm">No links saved</div>;
  }

  return (
    <div className="space-y-2">
      {data.links.map((link: any) => (
        <a
          key={link.id}
          href={link.url}
          className="block p-2 rounded-lg hover:bg-link-light calm-transition"
        >
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4 text-link"
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
            <span className="text-sm text-gray-700 truncate">{link.title}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

function ClockWidget() {
  return (
    <div className="flex items-center justify-center h-32">
      <div className="text-3xl font-bold text-foreground">
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}
