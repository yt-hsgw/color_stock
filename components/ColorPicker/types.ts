export type ColorSlotType = "base" | "main" | "accent";

export type ColorFormat = "hex" | "rgb" | "hsl";

export interface Palette {
  id: string;
  name: string;
  colors: {
    base: string;
    main: string;
    accent: string;
  };
}
export interface ColorSlotProps {
  type: ColorSlotType;
  color: string | null;
  status: "active" | "ready" | "waiting";
  onActivate: () => void;
  isActive: boolean;
  hoverText?: string; // ここを追加
}
