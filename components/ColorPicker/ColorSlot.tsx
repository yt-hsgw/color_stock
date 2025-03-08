"use client";

import { motion } from "framer-motion";
import { ColorSlotType } from "./types";

interface ColorSlotProps {
  type: ColorSlotType;
  color: string | null;
  status: "waiting" | "ready" | "active";
  onActivate: () => void;
  isActive: boolean;
  hoverText?: string;
}

export default function ColorSlot({
  type,
  color,
  status,
  onActivate,
  isActive,
  hoverText,
}: ColorSlotProps) {
  const labels = {
    base: "Base Color",
    main: "Main Color",
    accent: "Accent Color",
  };

  const getStatusStyles = () => {
    // カラーが登録されている場合は波線を表示しない
    if (color) {
      if (isActive) {
        return "ring-2 ring-blue-500";
      }
      return "";
    }

    // カラーが未登録の場合の表示
    if (isActive) {
      return "ring-2 ring-blue-500 border-blue-500";
    }
    switch (status) {
      case "active":
        return "ring-2 ring-blue-500 border-blue-500";
      case "ready":
        return "border-blue-500 hover:border-blue-600";
      default:
        return "border-zinc-200 opacity-50";
    }
  };

  return (
    <div className="relative">
      <motion.div
        className={`
          h-24 md:h-32 rounded-lg border-2
          ${getStatusStyles()}
          ${status !== "waiting" ? "cursor-pointer" : "cursor-not-allowed"}
          transition-all duration-200
        `}
        style={{ backgroundColor: color || "transparent" }}
        onClick={() => status !== "waiting" && onActivate()}
        whileHover={status !== "waiting" ? { scale: 1.02 } : {}}
        whileTap={status !== "waiting" ? { scale: 0.98 } : {}}
      ></motion.div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm font-medium text-zinc-700">{labels[type]}</p>
        {status === "ready" && !color && (
          <span className="text-xs text-green-600 font-medium">Ready</span>
        )}
      </div>
      {color && (
        <p className="mt-1 text-xs font-mono text-zinc-500 uppercase">
          {color}
        </p>
      )}
    </div>
  );
}
