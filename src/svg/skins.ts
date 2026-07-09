import { ThemeColors } from "../themes/index.js";

export interface SkinRenderer {
  renderHead(colors: ThemeColors): string;
  renderBodySegment(index: number, colors: ThemeColors): string;
  renderTail(colors: ThemeColors): string;
  renderFood(colors: ThemeColors): string;
}

export type SkinName =
  | "classic"
  | "dragon"
  | "robot"
  | "pacman"
  | "ghost"
  | "fox"
  | "cat"
  | "dinosaur";

export const SKINS: Record<SkinName, SkinRenderer> = {
  classic: {
    renderHead(colors: ThemeColors): string {
      return `
        <!-- Classic Head -->
        <rect width="10" height="10" rx="3" fill="${colors.snakeHead}" />
        <!-- Eyes -->
        <circle cx="3" cy="3" r="1.2" fill="${colors.snakeEyes}" />
        <circle cx="7" cy="3" r="1.2" fill="${colors.snakeEyes}" />
        <!-- Tongue -->
        <path d="M 5,0 L 5,-2 M 4,-2 L 6,-2" stroke="${colors.snakeTongue}" stroke-width="0.8" stroke-linecap="round" />
      `;
    },
    renderBodySegment(index: number, colors: ThemeColors): string {
      return `<rect width="10" height="10" rx="2.5" fill="${colors.snakeBody}" />`;
    },
    renderTail(colors: ThemeColors): string {
      return `<rect width="10" height="10" rx="4" transform="scale(0.8) translate(1.25, 1.25)" fill="${colors.snakeBody}" />`;
    },
    renderFood(colors: ThemeColors): string {
      return `<circle cx="5" cy="5" r="4.5" fill="${colors.food}" />`;
    },
  },

  dragon: {
    renderHead(colors: ThemeColors): string {
      return `
        <!-- Dragon Head -->
        <rect width="10" height="10" rx="4" fill="${colors.snakeHead}" />
        <!-- Horns -->
        <path d="M 2,1 L 0,-2 M 8,1 L 10,-2" stroke="${colors.sparkle}" stroke-width="1.5" stroke-linecap="round" />
        <!-- Snout -->
        <rect x="2.5" y="0" width="5" height="3" rx="1" fill="${colors.snakeBody}" />
        <!-- Glowing Eyes -->
        <circle cx="3" cy="4.5" r="1" fill="${colors.sparkle}" />
        <circle cx="7" cy="4.5" r="1" fill="${colors.sparkle}" />
        <!-- Whiskers/Tongue -->
        <path d="M 5,0 L 5,-2.5" stroke="${colors.snakeTongue}" stroke-width="0.8" />
      `;
    },
    renderBodySegment(index: number, colors: ThemeColors): string {
      // Alternating body segment spike styles or scales
      const scaleColor = index % 2 === 0 ? colors.snakeBody : colors.snakeHead;
      return `
        <rect width="10" height="10" rx="3" fill="${scaleColor}" />
        <!-- Spikes on scales -->
        <polygon points="5,1 3,5 7,5" fill="${colors.sparkle}" opacity="0.8" />
      `;
    },
    renderTail(colors: ThemeColors): string {
      return `
        <!-- Spiky Tail -->
        <polygon points="5,-1 10,7 0,7" fill="${colors.snakeBody}" />
        <circle cx="5" cy="8" r="1.5" fill="${colors.sparkle}" />
      `;
    },
    renderFood(colors: ThemeColors): string {
      // Golden egg/orb food
      return `
        <ellipse cx="5" cy="5" rx="3.5" ry="4.5" fill="${colors.food}" />
        <circle cx="4" cy="4" r="1" fill="#ffffff" opacity="0.6" />
      `;
    },
  },

  robot: {
    renderHead(colors: ThemeColors): string {
      return `
        <!-- Robo Head -->
        <rect width="10" height="10" rx="1" fill="${colors.snakeHead}" stroke="#333" stroke-width="0.5" />
        <!-- Visor -->
        <rect x="1.5" y="3" width="7" height="2" rx="0.5" fill="${colors.glow || colors.snakeEyes}" />
        <!-- Antennas -->
        <line x1="5" y1="0" x2="5" y2="-2" stroke="#555" stroke-width="0.8" />
        <circle cx="5" cy="-2" r="1" fill="${colors.glow || colors.snakeEyes}" />
      `;
    },
    renderBodySegment(index: number, colors: ThemeColors): string {
      return `
        <rect width="10" height="10" rx="1" fill="${colors.snakeBody}" stroke="#444" stroke-width="0.5" />
        <!-- Robo Rivets -->
        <circle cx="2" cy="2" r="0.6" fill="#111" opacity="0.5" />
        <circle cx="8" cy="2" r="0.6" fill="#111" opacity="0.5" />
        <circle cx="2" cy="8" r="0.6" fill="#111" opacity="0.5" />
        <circle cx="8" cy="8" r="0.6" fill="#111" opacity="0.5" />
        <!-- Tech stripe -->
        <rect x="4.5" y="2" width="1" height="6" fill="${colors.glow || colors.snakeHead}" opacity="0.8" />
      `;
    },
    renderTail(colors: ThemeColors): string {
      return `
        <rect x="3.5" y="1" width="3" height="7" rx="0.5" fill="${colors.snakeBody}" />
        <circle cx="5" cy="8.5" r="1.5" fill="${colors.glow || colors.snakeHead}" />
      `;
    },
    renderFood(colors: ThemeColors): string {
      // Microchip/Battery food
      return `
        <rect x="2.5" y="2" width="5" height="6" rx="1" fill="${colors.food}" />
        <line x1="1" y1="3.5" x2="2.5" y2="3.5" stroke="${colors.sparkle}" stroke-width="0.6" />
        <line x1="1" y1="6.5" x2="2.5" y2="6.5" stroke="${colors.sparkle}" stroke-width="0.6" />
        <line x1="7.5" y1="3.5" x2="9" y2="3.5" stroke="${colors.sparkle}" stroke-width="0.6" />
        <line x1="7.5" y1="6.5" x2="9" y2="6.5" stroke="${colors.sparkle}" stroke-width="0.6" />
      `;
    },
  },

  pacman: {
    renderHead(colors: ThemeColors): string {
      return `
        <!-- Pacman Head -->
        <circle cx="5" cy="5" r="5" fill="#ffd700" />
        <!-- Animated Mouth (done statically, but mouth shape is open) -->
        <polygon points="5,5 10,2 10,8" fill="${colors.background}" />
        <circle cx="4" cy="2" r="0.8" fill="#000000" />
      `;
    },
    renderBodySegment(index: number, colors: ThemeColors): string {
      // Pacman body segments are the ghosts!
      const ghostColors = ["#ff0000", "#ffb8ff", "#00ffff", "#ffb851"];
      const ghostColor = ghostColors[index % ghostColors.length];
      return `
        <!-- Ghost Segment -->
        <path d="M 5,0 A 5,5 0 0 1 10,5 L 10,10 L 8,8 L 6,10 L 4,8 L 2,10 L 0,10 L 0,5 A 5,5 0 0 1 5,0 Z" fill="${ghostColor}" />
        <!-- Ghost Eyes -->
        <circle cx="3" cy="4" r="1.2" fill="#ffffff" />
        <circle cx="7" cy="4" r="1.2" fill="#ffffff" />
        <circle cx="2.7" cy="4" r="0.6" fill="#0000ff" />
        <circle cx="6.7" cy="4" r="0.6" fill="#0000ff" />
      `;
    },
    renderTail(colors: ThemeColors): string {
      // Tiny pac-dot
      return `<circle cx="5" cy="5" r="2" fill="#ffd700" />`;
    },
    renderFood(colors: ThemeColors): string {
      // Cherry food
      return `
        <!-- Cherry -->
        <circle cx="3.5" cy="6.5" r="2.5" fill="#ff0000" />
        <circle cx="7.2" cy="5.5" r="2.3" fill="#ff0000" />
        <path d="M 3.5,4 C 4,1 6,1 7,2.5" stroke="#4caf50" stroke-width="0.8" fill="none" />
      `;
    },
  },

  ghost: {
    renderHead(colors: ThemeColors): string {
      return `
        <!-- Ghost Head -->
        <path d="M 5,0 C 2,0 0,2 0,5 L 0,9.5 C 0,10 1.5,9 2.5,9.5 C 3.5,10 4.5,9 5,9.5 C 5.5,9 6.5,10 7.5,9.5 C 8.5,9 10,10 10,9.5 L 10,5 C 10,2 8,0 5,0 Z" fill="${colors.snakeHead}" opacity="0.8" />
        <!-- Hollow Eyes -->
        <ellipse cx="3" cy="4.5" rx="1.1" ry="1.6" fill="${colors.snakeEyes}" />
        <ellipse cx="7" cy="4.5" rx="1.1" ry="1.6" fill="${colors.snakeEyes}" />
      `;
    },
    renderBodySegment(index: number, colors: ThemeColors): string {
      // Fading transparency for ghost body
      const opacity = Math.max(0.2, 0.7 - index * 0.08);
      return `<circle cx="5" cy="5" r="4.5" fill="${colors.snakeBody}" opacity="${opacity}" />`;
    },
    renderTail(colors: ThemeColors): string {
      return `<path d="M 5,1 L 8,9 L 2,9 Z" fill="${colors.snakeBody}" opacity="0.2" />`;
    },
    renderFood(colors: ThemeColors): string {
      // Glowing orb food
      return `
        <circle cx="5" cy="5" r="4.5" fill="${colors.food}" opacity="0.6" />
        <circle cx="5" cy="5" r="2" fill="#ffffff" />
      `;
    },
  },

  fox: {
    renderHead(colors: ThemeColors): string {
      return `
        <!-- Fox Head (Orange) -->
        <rect width="10" height="10" rx="3" fill="#e05a00" />
        <!-- White cheeks -->
        <path d="M 0,6 L 3,10 L 0,10 Z M 10,6 L 7,10 L 10,10 Z" fill="#ffffff" />
        <!-- Ears -->
        <polygon points="0,3 0,-1.5 3,1" fill="#e05a00" />
        <polygon points="0.8,2.2 0.8,-0.2 2.2,1.2" fill="#ffccd5" />
        <polygon points="10,3 10,-1.5 7,1" fill="#e05a00" />
        <polygon points="9.2,2.2 9.2,-0.2 7.8,1.2" fill="#ffccd5" />
        <!-- Nose -->
        <circle cx="5" cy="8.5" r="1" fill="#000000" />
        <!-- Eyes -->
        <circle cx="2.5" cy="4.5" r="1" fill="#000000" />
        <circle cx="7.5" cy="4.5" r="1" fill="#000000" />
      `;
    },
    renderBodySegment(index: number, colors: ThemeColors): string {
      return `<rect width="10" height="10" rx="3.5" fill="#e05a00" />`;
    },
    renderTail(colors: ThemeColors): string {
      return `
        <!-- Fox tail with white tip -->
        <rect width="10" height="10" rx="3.5" fill="#e05a00" />
        <path d="M 0,7 L 5,3 L 10,7 L 10,10 L 0,10 Z" fill="#ffffff" />
      `;
    },
    renderFood(colors: ThemeColors): string {
      // Acorn/Berry food
      return `
        <ellipse cx="5" cy="6" rx="3.5" ry="4" fill="#a0522d" />
        <path d="M 1.5,4.5 C 1.5,2 8.5,2 8.5,4.5 Z" fill="#8b4513" />
        <line x1="5" y1="2" x2="5" y2="0.5" stroke="#5c2e0b" stroke-width="0.8" />
      `;
    },
  },

  cat: {
    renderHead(colors: ThemeColors): string {
      return `
        <!-- Cat Head -->
        <rect width="10" height="10" rx="4" fill="${colors.snakeHead}" />
        <!-- Cat Ears -->
        <polygon points="1,2 0,-1.5 3.5,1.5" fill="${colors.snakeHead}" />
        <polygon points="9,2 10,-1.5 6.5,1.5" fill="${colors.snakeHead}" />
        <!-- Eyes -->
        <ellipse cx="3" cy="4.5" rx="1" ry="1.4" fill="${colors.glow || "#ffd700"}" />
        <line x1="3" y1="3.2" x2="3" y2="5.8" stroke="#000" stroke-width="0.5" />
        <ellipse cx="7" cy="4.5" rx="1" ry="1.4" fill="${colors.glow || "#ffd700"}" />
        <line x1="7" y1="3.2" x2="7" y2="5.8" stroke="#000" stroke-width="0.5" />
        <!-- Nose/Mouth -->
        <polygon points="5,7 4.5,6.5 5.5,6.5" fill="#ffccd5" />
        <!-- Whiskers -->
        <line x1="1" y1="6" x2="-1.5" y2="5.5" stroke="${colors.snakeEyes}" stroke-width="0.4" />
        <line x1="1" y1="7" x2="-1.5" y2="7" stroke="${colors.snakeEyes}" stroke-width="0.4" />
        <line x1="9" y1="6" x2="11.5" y2="5.5" stroke="${colors.snakeEyes}" stroke-width="0.4" />
        <line x1="9" y1="7" x2="11.5" y2="7" stroke="${colors.snakeEyes}/" stroke-width="0.4" />
      `;
    },
    renderBodySegment(index: number, colors: ThemeColors): string {
      // Alternating cat fur color pattern (calico/striped)
      const isStriped = index % 2 === 0;
      const bodyColor = isStriped ? colors.snakeBody : "#555555";
      return `
        <rect width="10" height="10" rx="3.5" fill="${bodyColor}" />
        <!-- Stripes -->
        ${isStriped ? `<path d="M 0,2 L 2,3 L 0,4 M 10,2 L 8,3 L 10,4" fill="none" stroke="#222" stroke-width="0.7" />` : ""}
      `;
    },
    renderTail(colors: ThemeColors): string {
      return `
        <!-- Curled Cat Tail -->
        <rect width="10" height="10" rx="3.5" fill="${colors.snakeBody}" />
        <path d="M 5,2 C 7,0 9,3 7,5 C 5,7 5,10 5,10" fill="none" stroke="${colors.snakeBody}" stroke-width="2.5" stroke-linecap="round" />
      `;
    },
    renderFood(colors: ThemeColors): string {
      // Fish/Milk bottle food
      return `
        <!-- Fish -->
        <path d="M 1,5 C 3,2 7,2 9,5 C 7,8 3,8 1,5 Z" fill="${colors.food}" />
        <polygon points="9,5 11,3 11,7" fill="${colors.food}" />
        <circle cx="3.2" cy="4.5" r="0.6" fill="#000000" />
      `;
    },
  },

  dinosaur: {
    renderHead(colors: ThemeColors): string {
      return `
        <!-- Dinosaur Head (T-Rex style) -->
        <rect width="10" height="10" rx="2" fill="${colors.snakeHead}" />
        <!-- Snout details -->
        <rect x="4" y="5" width="6" height="5" rx="1" fill="${colors.snakeHead}" />
        <!-- Tiny tooth -->
        <polygon points="6,10 7,8 8,10" fill="#ffffff" />
        <!-- Glowing eye -->
        <circle cx="3.5" cy="3.5" r="1" fill="${colors.sparkle}" />
        <!-- Spikes on head -->
        <polygon points="1,0 -1,-1 1,2" fill="${colors.sparkle}" />
      `;
    },
    renderBodySegment(index: number, colors: ThemeColors): string {
      return `
        <rect width="10" height="10" rx="2" fill="${colors.snakeBody}" />
        <!-- Dino Back Spikes -->
        <polygon points="5,0 3,-2 7,-2" fill="${colors.sparkle}" />
      `;
    },
    renderTail(colors: ThemeColors): string {
      return `
        <!-- Dino tail with spikes -->
        <polygon points="0,1 10,5 0,9" fill="${colors.snakeBody}" />
        <polygon points="3,2 2,-1 5,3" fill="${colors.sparkle}" />
      `;
    },
    renderFood(colors: ThemeColors): string {
      // Dinosaur egg food
      return `
        <!-- Egg with spots -->
        <ellipse cx="5" cy="5" rx="3.5" ry="4.5" fill="${colors.food}" />
        <!-- Spots -->
        <circle cx="3.5" cy="3.5" r="0.8" fill="${colors.sparkle}" opacity="0.7" />
        <circle cx="6.5" cy="6.5" r="0.6" fill="${colors.sparkle}" opacity="0.7" />
        <circle cx="4" cy="7" r="0.7" fill="${colors.sparkle}" opacity="0.7" />
      `;
    },
  },
};

export function getSkin(
  name: string,
  fallback: SkinName = "classic",
): SkinRenderer {
  const normalized = name.toLowerCase() as SkinName;
  return SKINS[normalized] || SKINS[fallback];
}

export function isValidSkin(name: string): boolean {
  return name.toLowerCase() in SKINS;
}
