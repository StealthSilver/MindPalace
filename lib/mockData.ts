import { Widget } from "@/types";

export const mockWidgets: Widget[] = [
  {
    id: "widget-1",
    type: "chart-line",
    title: "Activity Overview",
    x: 0,
    y: 0,
    width: 2,
    height: 1,
    data: {
      values: [10, 25, 15, 40, 30, 45, 35],
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  },
  {
    id: "widget-2",
    type: "notes",
    title: "Quick Notes",
    x: 2,
    y: 0,
    width: 1,
    height: 1,
    data: {
      content: "Remember to explore the canvas mode...",
    },
  },
  {
    id: "widget-3",
    type: "tasks",
    title: "Today",
    x: 0,
    y: 1,
    width: 1,
    height: 1,
    data: {
      tasks: [
        { id: "1", text: "Review project notes", completed: true },
        { id: "2", text: "Organize research links", completed: false },
        { id: "3", text: "Plan next steps", completed: false },
      ],
    },
  },
  {
    id: "widget-4",
    type: "stat-card",
    title: "Total Items",
    x: 1,
    y: 1,
    width: 1,
    height: 1,
    data: {
      value: 127,
      change: "+12%",
      trend: "up",
    },
  },
  {
    id: "widget-5",
    type: "links",
    title: "Saved Links",
    x: 2,
    y: 1,
    width: 1,
    height: 1,
    data: {
      links: [
        { id: "1", title: "Design Inspiration", url: "#" },
        { id: "2", title: "Research Paper", url: "#" },
        { id: "3", title: "Tutorial", url: "#" },
      ],
    },
  },
];
