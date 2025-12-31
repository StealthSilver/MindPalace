// Type definitions for Mind Palace

export type NodeType = "note" | "link" | "image" | "todo" | "tweet";

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Node {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  color?: string;
  topicId?: string;
  completed?: boolean;
  linkName?: string;
  linkUrl?: string;
  todos?: TodoItem[];
  tweetUrl?: string;
  imageUrl?: string;
}

export interface Topic {
  id: string;
  title: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Connection {
  id: string;
  from: string;
  to: string;
}

export type WidgetType =
  | "chart-line"
  | "chart-bar"
  | "stat-card"
  | "notes"
  | "tasks"
  | "links"
  | "messages"
  | "clock"
  | "weather"
  | "countdown";

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  data?: any;
}

export interface DashboardLayout {
  widgets: Widget[];
}

export type AppMode = "dashboard" | "canvas";
