export interface ThemeColors {
  background: string;
  gridLine?: string;
  emptyCell: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  snakeHead: string;
  snakeBody: string;
  snakeEyes: string;
  snakeTongue: string;
  food: string;
  sparkle: string;
  glow?: string;
}

export type ThemeName =
  | "classic-light"
  | "classic-dark"
  | "matrix"
  | "cyberpunk"
  | "neon"
  | "ocean"
  | "sakura"
  | "fire"
  | "galaxy";

export const THEMES: Record<ThemeName, ThemeColors> = {
  "classic-light": {
    background: "#ffffff",
    gridLine: "#e1e4e8",
    emptyCell: "#ebedf0",
    level1: "#9be9a8",
    level2: "#40c463",
    level3: "#30a14e",
    level4: "#216e39",
    snakeHead: "#1f883d",
    snakeBody: "#40c463",
    snakeEyes: "#ffffff",
    snakeTongue: "#ff5555",
    food: "#ff003c",
    sparkle: "#ffb703",
  },
  "classic-dark": {
    background: "#0d1117",
    gridLine: "#30363d",
    emptyCell: "#161b22",
    level1: "#0e4429",
    level2: "#006d32",
    level3: "#26a641",
    level4: "#39d353",
    snakeHead: "#39d353",
    snakeBody: "#26a641",
    snakeEyes: "#0d1117",
    snakeTongue: "#ff5555",
    food: "#f06292",
    sparkle: "#ffca28",
  },
  matrix: {
    background: "#000802",
    gridLine: "#0d2510",
    emptyCell: "#051407",
    level1: "#0d3214",
    level2: "#135c1d",
    level3: "#1c912a",
    level4: "#39ff14",
    snakeHead: "#39ff14",
    snakeBody: "#1c912a",
    snakeEyes: "#ffffff",
    snakeTongue: "#ff003c",
    food: "#39ff14",
    sparkle: "#ffffff",
    glow: "#39ff14",
  },
  cyberpunk: {
    background: "#0a0512",
    gridLine: "#1d0b2e",
    emptyCell: "#140c21",
    level1: "#ff007f",
    level2: "#00f0ff",
    level3: "#ffb300",
    level4: "#bd00ff",
    snakeHead: "#ffe600",
    snakeBody: "#00f0ff",
    snakeEyes: "#ff007f",
    snakeTongue: "#ffffff",
    food: "#ff007f",
    sparkle: "#ffe600",
    glow: "#00f0ff",
  },
  neon: {
    background: "#000000",
    gridLine: "#111111",
    emptyCell: "#121212",
    level1: "#0a2e36",
    level2: "#145c6e",
    level3: "#28b8dc",
    level4: "#00f3ff",
    snakeHead: "#ff007f",
    snakeBody: "#ff00a0",
    snakeEyes: "#00f3ff",
    snakeTongue: "#ffffff",
    food: "#00f3ff",
    sparkle: "#ff007f",
    glow: "#ff007f",
  },
  ocean: {
    background: "#011627",
    gridLine: "#0a2e4e",
    emptyCell: "#0b2d48",
    level1: "#005f73",
    level2: "#0a9396",
    level3: "#94d2bd",
    level4: "#e9d8a6",
    snakeHead: "#005f73",
    snakeBody: "#0a9396",
    snakeEyes: "#ffffff",
    snakeTongue: "#ee9b00",
    food: "#ca6702",
    sparkle: "#e9d8a6",
    glow: "#94d2bd",
  },
  sakura: {
    background: "#1a0b10",
    gridLine: "#2e141d",
    emptyCell: "#241016",
    level1: "#ffccd5",
    level2: "#ffb3c1",
    level3: "#ff85a1",
    level4: "#ff4d6d",
    snakeHead: "#c9184a",
    snakeBody: "#ff758f",
    snakeEyes: "#ffffff",
    snakeTongue: "#ffe5ec",
    food: "#fff0f3",
    sparkle: "#ff4d6d",
    glow: "#ff85a1",
  },
  fire: {
    background: "#0a0302",
    gridLine: "#240d08",
    emptyCell: "#180905",
    level1: "#3d0c02",
    level2: "#800e13",
    level3: "#ad2831",
    level4: "#ff6b35",
    snakeHead: "#ffb703",
    snakeBody: "#d1001c",
    snakeEyes: "#ffffff",
    snakeTongue: "#3d0c02",
    food: "#ff6b35",
    sparkle: "#ffb703",
    glow: "#ff6b35",
  },
  galaxy: {
    background: "#020014",
    gridLine: "#160d36",
    emptyCell: "#0d0822",
    level1: "#2a1b5c",
    level2: "#5a189a",
    level3: "#7b2cbf",
    level4: "#c77dff",
    snakeHead: "#00f5d4",
    snakeBody: "#7b2cbf",
    snakeEyes: "#ffffff",
    snakeTongue: "#ff007f",
    food: "#00f5d4",
    sparkle: "#ffffff",
    glow: "#7b2cbf",
  },
};

export function getTheme(
  name: string,
  fallback: ThemeName = "classic-dark",
): ThemeColors {
  const normalized = name.toLowerCase() as ThemeName;
  return THEMES[normalized] || THEMES[fallback];
}

export function isValidTheme(name: string): boolean {
  return name.toLowerCase() in THEMES;
}
