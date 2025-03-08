"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Pipette, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ColorSlot from "./ColorSlot";
import SavedPalettes from "./SavedPalettes";
import { ColorFormat, ColorSlotType, Palette } from "./types";

export default function ColorPicker() {
  const [activeSlot, setActiveSlot] = useState<ColorSlotType>("base");
  const [baseColor, setBaseColor] = useState<string | null>(null);
  const [mainColor, setMainColor] = useState<string | null>(null);
  const [accentColor, setAccentColor] = useState<string | null>(null);
  const [savedPalettes, setSavedPalettes] = useState<Palette[]>([]);
  const [isPickerActive, setIsPickerActive] = useState(false);

  const [paletteName, setPaletteName] = useState(`palette_1`);
  const updateDefaultPaletteName = () => {
    setPaletteName(`palette_${savedPalettes.length + 2}`);
  };
  const handleColorPick = useCallback(async () => {
    try {
      setIsPickerActive(true);
      // @ts-ignore - EyeDropper API is not yet in TypeScript
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();

      // Update only the active slot
      switch (activeSlot) {
        case "base":
          setBaseColor(result.sRGBHex);
          if (!mainColor) setActiveSlot("main");
          break;
        case "main":
          setMainColor(result.sRGBHex);
          if (!accentColor) setActiveSlot("accent");
          break;
        case "accent":
          setAccentColor(result.sRGBHex);
          break;
      }
    } catch (e) {
      console.error("Failed to pick color:", e);
    } finally {
      setIsPickerActive(false);
    }
  }, [activeSlot, mainColor, accentColor]);

  const handleSave = () => {
    if (!baseColor || !mainColor || !accentColor || !paletteName.trim()) return;

    const newPalette: Palette = {
      id: Date.now().toString(),
      name: paletteName,
      colors: {
        base: baseColor,
        main: mainColor,
        accent: accentColor,
      },
    };

    setSavedPalettes((prev) => {
      const newPalettes = [...prev, newPalette];
      // 保存後に次のパレット名を設定（現在の配列長 + 1）
      setPaletteName(`palette_${newPalettes.length + 1}`);
      return newPalettes;
    });
    setBaseColor(null);
    setMainColor(null);
    setAccentColor(null);
    setActiveSlot("base");
  };

  const handleSlotClick = async (type: ColorSlotType) => {
    if (getSlotStatus(type) === "waiting") return;
    setActiveSlot(type);

    try {
      setIsPickerActive(true);
      // @ts-ignore - EyeDropper API is not yet in TypeScript
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();

      // Update color based on the clicked slot type
      switch (type) {
        case "base":
          setBaseColor(result.sRGBHex);
          if (!mainColor) setActiveSlot("main");
          break;
        case "main":
          setMainColor(result.sRGBHex);
          if (!accentColor) setActiveSlot("accent");
          break;
        case "accent":
          setAccentColor(result.sRGBHex);
          break;
      }
    } catch (e) {
      console.error("Failed to pick color:", e);
    } finally {
      setIsPickerActive(false);
    }
  };

  const getSlotStatus = (type: ColorSlotType) => {
    if (type === activeSlot) return "active";
    if (type === "base") return "ready";
    if (type === "main" && baseColor) return "ready";
    if (type === "accent" && baseColor && mainColor) return "ready";
    return "waiting";
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-white/20">
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
          <ColorSlot
            type="base"
            color={baseColor}
            status={getSlotStatus("base")}
            onActivate={() => handleSlotClick("base")}
            isActive={activeSlot === "base"}
            hoverText="Click to pick"
          />
          <ColorSlot
            type="main"
            color={mainColor}
            status={getSlotStatus("main")}
            onActivate={() => handleSlotClick("main")}
            isActive={activeSlot === "main"}
            hoverText="Click to pick"
          />
          <ColorSlot
            type="accent"
            color={accentColor}
            status={getSlotStatus("accent")}
            onActivate={() => handleSlotClick("accent")}
            isActive={activeSlot === "accent"}
            hoverText="Click to pick"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="パレット名を入力してください。"
            value={paletteName}
            onChange={(e) => setPaletteName(e.target.value)}
            className="flex-1 bg-white/50 border-zinc-200/80"
          />
          <div className="flex gap-2 sm:gap-4">
            <Button
              onClick={handleSave}
              disabled={
                !baseColor || !mainColor || !accentColor || !paletteName.trim()
              }
              className="flex-1 sm:flex-none whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Save className="mr-2 h-4 w-4" />
              保存
            </Button>
          </div>
        </div>
      </div>

      <SavedPalettes palettes={savedPalettes} />
    </div>
  );
}
