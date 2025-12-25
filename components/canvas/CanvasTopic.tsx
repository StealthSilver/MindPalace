"use client";

import { Topic } from "@/types";

interface CanvasTopicProps {
  topic: Topic;
  scale: number;
  onUpdate: (id: string, updates: Partial<Topic>) => void;
  onDelete: (id: string) => void;
}

export default function CanvasTopic({
  topic,
  scale,
  onUpdate,
  onDelete,
}: CanvasTopicProps) {
  return (
    <div
      className="absolute border-2 border-dashed rounded-2xl pointer-events-none"
      style={{
        left: topic.x,
        top: topic.y,
        width: topic.width,
        height: topic.height,
        borderColor: topic.color,
        backgroundColor: `${topic.color}10`,
        transform: `scale(${1 / scale})`,
        transformOrigin: "top left",
      }}
    >
      <div
        className="absolute -top-8 left-4 px-3 py-1 rounded-lg pointer-events-auto"
        style={{
          backgroundColor: topic.color,
          color: "white",
        }}
      >
        <span className="text-sm font-medium">{topic.title}</span>
      </div>
    </div>
  );
}
