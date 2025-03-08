"use client";

import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Palette } from "./types";

interface SavedPalettesProps {
  palettes: Palette[];
}

export default function SavedPalettes({ palettes }: SavedPalettesProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-white/20">
      <h2 className="text-2xl font-bold text-zinc-800 mb-6 flex items-center">
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Color Stock List
        </span>
      </h2>

      {palettes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-zinc-500">
            カラーパレットを作成して保存してください
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {palettes.map((palette) => (
            <motion.div
              key={palette.id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-zinc-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-zinc-900">
                  {palette.name}
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(palette.colors).map(([key, color]) => (
                  <div
                    key={key}
                    className="h-24 rounded-lg shadow-sm transition-transform hover:scale-105"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(palette.colors).map(([key, color]) => (
                  <div key={key} className="space-y-2">
                    <p className="text-sm font-medium text-zinc-700 capitalize">
                      {key}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full hover:bg-zinc-50 transition-colors"
                      onClick={() => copyToClipboard(color)}
                    >
                      <Copy className="mr-2 h-3 w-3" />
                      {color}
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
