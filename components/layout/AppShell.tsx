"use client";

import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import CommandPalette from "@/components/shared/CommandPalette";
import { AppMode } from "@/types";

interface AppShellProps {
  children: ReactNode;
  mode?: AppMode;
  onModeChange?: (mode: AppMode) => void;
}

export default function AppShell({
  children,
  mode = "dashboard",
  onModeChange,
}: AppShellProps) {
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar currentMode={mode} />
      <div className="flex-1 flex flex-col">
        <TopBar mode={mode} onModeChange={onModeChange} />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>

      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
      />
    </div>
  );
}
