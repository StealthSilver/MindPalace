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
        return <ClockWidget data={widget.data} />;
      case "countdown":
        return <CountdownWidget data={widget.data} />;
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
  const [links, setLinks] = require("react").useState(data?.links || []);
  const [isAdding, setIsAdding] = require("react").useState(false);
  const [titleInput, setTitleInput] = require("react").useState("");
  const [urlInput, setUrlInput] = require("react").useState("");

  const handleAddLink = () => {
    if (titleInput.trim() && urlInput.trim()) {
      let url = urlInput.trim();
      // Add protocol if missing
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      const newLink = {
        id: `link-${Date.now()}`,
        title: titleInput,
        url: url,
      };
      const updatedLinks = [...links, newLink];
      setLinks(updatedLinks);
      setTitleInput("");
      setUrlInput("");
      setIsAdding(false);
    }
  };

  const handleRemoveLink = (id: string) => {
    const updatedLinks = links.filter((link: any) => link.id !== id);
    setLinks(updatedLinks);
  };

  if (isAdding) {
    return (
      <div className="flex flex-col space-y-3 h-32">
        <input
          type="text"
          placeholder="Link Title"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddLink()}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          autoFocus
        />
        <input
          type="text"
          placeholder="URL (e.g., example.com)"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddLink()}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <div className="flex gap-2">
          <button
            onClick={handleAddLink}
            className="flex-1 px-3 py-1 bg-accent text-white text-xs rounded-lg hover:bg-accent-dark calm-transition"
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setTitleInput("");
              setUrlInput("");
            }}
            className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-400 calm-transition"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 space-y-3">
        <div className="text-gray-400 text-sm">No links saved</div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent-dark calm-transition"
        >
          + Add Link
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 h-32 overflow-y-auto">
      {links.map((link: any) => (
        <div
          key={link.id}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 group calm-transition"
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center space-x-2 hover:text-accent"
          >
            <svg
              className="w-4 h-4 text-link flex-shrink-0"
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
          </a>
          <button
            onClick={() => handleRemoveLink(link.id)}
            className="opacity-0 group-hover:opacity-100 calm-transition text-gray-400 hover:text-red-500 ml-2"
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
      ))}
      <button
        onClick={() => setIsAdding(true)}
        className="mt-2 px-3 py-1 text-xs text-accent border border-accent rounded-lg hover:bg-accent hover:text-white calm-transition"
      >
        + Add Link
      </button>
    </div>
  );
}

function ClockWidget({ data }: any) {
  const [currentTime, setCurrentTime] = require("react").useState<string>("");
  const [isEditing, setIsEditing] = require("react").useState(false);
  const [timezoneInput, setTimezoneInput] = require("react").useState<string>(
    data?.timezone || ""
  );
  const [selectedTimezone, setSelectedTimezone] =
    require("react").useState<string>(data?.timezone || "");
  const timerRef = require("react").useRef<NodeJS.Timeout | null>(null);

  const commonTimezones = [
    { name: "Browser Default", offset: null },
    { name: "UTC", offset: "UTC" },
    { name: "GMT", offset: "GMT" },
    { name: "EST (New York)", offset: "America/New_York" },
    { name: "CST (Chicago)", offset: "America/Chicago" },
    { name: "MST (Denver)", offset: "America/Denver" },
    { name: "PST (Los Angeles)", offset: "America/Los_Angeles" },
    { name: "GMT+1 (London)", offset: "Europe/London" },
    { name: "CET (Paris/Berlin)", offset: "Europe/Paris" },
    { name: "IST (India)", offset: "Asia/Kolkata" },
    { name: "CST (China)", offset: "Asia/Shanghai" },
    { name: "JST (Japan)", offset: "Asia/Tokyo" },
    { name: "AEST (Sydney)", offset: "Australia/Sydney" },
  ];

  const updateTime = () => {
    try {
      let formattedTime: string;

      if (selectedTimezone) {
        formattedTime = new Date().toLocaleTimeString("en-US", {
          timeZone: selectedTimezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
      } else {
        formattedTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
      }

      setCurrentTime(formattedTime);
    } catch (error) {
      // Fallback for invalid timezone
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    }
  };

  const handleSetTimezone = () => {
    if (timezoneInput.trim()) {
      setSelectedTimezone(timezoneInput);
      setIsEditing(false);
      setTimezoneInput("");
    }
  };

  const handleSelectPreset = (timezone: string | null) => {
    if (timezone === null) {
      setSelectedTimezone("");
    } else {
      setSelectedTimezone(timezone);
    }
    setIsEditing(false);
    setTimezoneInput("");
  };

  require("react").useEffect(() => {
    updateTime();

    timerRef.current = setInterval(() => {
      updateTime();
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [selectedTimezone]);

  if (isEditing) {
    return (
      <div className="flex flex-col items-center justify-center h-32 space-y-3 overflow-y-auto">
        <div className="text-sm font-medium text-gray-700 mb-2">
          Quick Select:
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          {commonTimezones.map((tz) => (
            <button
              key={tz.name}
              onClick={() => handleSelectPreset(tz.offset)}
              className={`px-2 py-1 text-xs rounded-lg transition ${
                selectedTimezone === tz.offset
                  ? "bg-accent text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tz.name}
            </button>
          ))}
        </div>
        <div className="border-t w-full pt-3 mt-2">
          <input
            type="text"
            placeholder="e.g., America/New_York"
            value={timezoneInput}
            onChange={(e) => setTimezoneInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSetTimezone()}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <div className="flex gap-2 w-full">
          <button
            onClick={handleSetTimezone}
            className="flex-1 px-3 py-1 bg-accent text-white text-xs rounded-lg hover:bg-accent-dark calm-transition"
          >
            Set
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setTimezoneInput("");
            }}
            className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-400 calm-transition"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-32 space-y-4">
      <div className="text-4xl font-bold text-foreground font-mono">
        {currentTime}
      </div>
      <div className="text-sm text-gray-600">
        {selectedTimezone || "Browser Time"}
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:border-accent hover:text-accent calm-transition"
      >
        Edit
      </button>
    </div>
  );
}

function CountdownWidget({ data }: any) {
  const [timeLeft, setTimeLeft] = require("react").useState<number | null>(
    null
  );
  const [isRunning, setIsRunning] = require("react").useState(false);
  const [isEditing, setIsEditing] = require("react").useState(false);
  const [inputTime, setInputTime] = require("react").useState<string>("");
  const timerRef = require("react").useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const parseTimeInput = (input: string): number => {
    // Parse formats like "5m", "30s", "1h", "1h30m", etc.
    let total = 0;
    const hourMatch = input.match(/(\d+)h/);
    const minMatch = input.match(/(\d+)m/);
    const secMatch = input.match(/(\d+)s/);

    if (hourMatch) total += parseInt(hourMatch[1]) * 3600;
    if (minMatch) total += parseInt(minMatch[1]) * 60;
    if (secMatch) total += parseInt(secMatch[1]);

    return total || 0;
  };

  const handleSetTime = () => {
    if (inputTime.trim()) {
      const seconds = parseTimeInput(inputTime);
      if (seconds > 0) {
        setTimeLeft(seconds);
        setIsEditing(false);
        setInputTime("");
      }
    }
  };

  const handleStart = () => {
    if (timeLeft === null || timeLeft <= 0) return;

    setIsRunning(true);
    let remaining = timeLeft;

    timerRef.current = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);

      if (remaining <= 0) {
        setIsRunning(false);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 1000);
  };

  const handlePause = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(null);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  require("react").useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (isEditing) {
    return (
      <div className="flex flex-col items-center justify-center h-32 space-y-3">
        <input
          type="text"
          placeholder="e.g., 5m, 30s, 1h30m"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSetTime()}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            onClick={handleSetTime}
            className="px-3 py-1 bg-accent text-white text-xs rounded-lg hover:bg-accent-dark calm-transition"
          >
            Set
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setInputTime("");
            }}
            className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-400 calm-transition"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (timeLeft === null) {
    return (
      <div className="flex flex-col items-center justify-center h-32 space-y-3">
        <div className="text-gray-400 text-sm">No countdown set</div>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent-dark calm-transition"
        >
          Set Time
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-32 space-y-4">
      <div className="text-4xl font-bold text-foreground font-mono">
        {formatTime(timeLeft)}
      </div>
      <div className="flex gap-2">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent-dark calm-transition"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 calm-transition"
          >
            Pause
          </button>
        )}
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:border-accent hover:text-accent calm-transition"
        >
          Edit
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:border-red-500 hover:text-red-500 calm-transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
