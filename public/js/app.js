const THEMES = {
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
  dracula: {
    background: "#282a36",
    gridLine: "#44475a",
    emptyCell: "#1e1f29",
    level1: "#8be9fd",
    level2: "#50fa7b",
    level3: "#ffb86c",
    level4: "#ff79c6",
    snakeHead: "#bd93f9",
    snakeBody: "#8be9fd",
    snakeEyes: "#282a36",
    snakeTongue: "#ff5555",
    food: "#ff79c6",
    sparkle: "#f1fa8c",
    glow: "#bd93f9",
  },
  synthwave: {
    background: "#2b0f54",
    gridLine: "#3e1e68",
    emptyCell: "#1c073a",
    level1: "#ff7e5f",
    level2: "#feb47b",
    level3: "#ff5e62",
    level4: "#ff2a5f",
    snakeHead: "#00f0ff",
    snakeBody: "#bd00ff",
    snakeEyes: "#ffffff",
    snakeTongue: "#ff7e5f",
    food: "#ff2a5f",
    sparkle: "#feb47b",
    glow: "#bd00ff",
  },
  pride: {
    background: "#1a1a1a",
    gridLine: "#333333",
    emptyCell: "#262626",
    level1: "#e40303",
    level2: "#ff8c00",
    level3: "#ffeb00",
    level4: "#008026",
    snakeHead: "#ffffff",
    snakeBody: "#ff007f",
    snakeEyes: "#000000",
    snakeTongue: "#002fa7",
    food: "#ff007f",
    sparkle: "#7400b8",
    glow: "#ff007f",
  },
};

const SKIN_RENDERERS = {
  classic: {
    renderHead(colors) {
      return `
        <rect width="10" height="10" rx="3" fill="${colors.snakeHead}" />
        <circle cx="3" cy="3" r="1.2" fill="${colors.snakeEyes}" />
        <circle cx="7" cy="3" r="1.2" fill="${colors.snakeEyes}" />
        <path d="M 5,0 L 5,-2 M 4,-2 L 6,-2" stroke="${colors.snakeTongue}" stroke-width="0.8" stroke-linecap="round" />
      `;
    },
    renderBodySegment(index, colors) {
      return `<rect width="10" height="10" rx="2.5" fill="${colors.snakeBody}" />`;
    },
    renderTail(colors) {
      return `<rect width="10" height="10" rx="4" transform="scale(0.8) translate(1.25, 1.25)" fill="${colors.snakeBody}" />`;
    },
    renderFood(colors) {
      return `<circle cx="5" cy="5" r="4.5" fill="${colors.food}" />`;
    }
  },
  dragon: {
    renderHead(colors) {
      return `
        <rect width="10" height="10" rx="4" fill="${colors.snakeHead}" />
        <path d="M 2,1 L 0,-2 M 8,1 L 10,-2" stroke="${colors.sparkle}" stroke-width="1.5" stroke-linecap="round" />
        <rect x="2.5" y="0" width="5" height="3" rx="1" fill="${colors.snakeBody}" />
        <circle cx="3" cy="4.5" r="1" fill="${colors.sparkle}" />
        <circle cx="7" cy="4.5" r="1" fill="${colors.sparkle}" />
        <path d="M 5,0 L 5,-2.5" stroke="${colors.snakeTongue}" stroke-width="0.8" />
      `;
    },
    renderBodySegment(index, colors) {
      const scaleColor = index % 2 === 0 ? colors.snakeBody : colors.snakeHead;
      return `
        <rect width="10" height="10" rx="3" fill="${scaleColor}" />
        <polygon points="5,1 3,5 7,5" fill="${colors.sparkle}" opacity="0.8" />
      `;
    },
    renderTail(colors) {
      return `
        <polygon points="5,-1 10,7 0,7" fill="${colors.snakeBody}" />
        <circle cx="5" cy="8" r="1.5" fill="${colors.sparkle}" />
      `;
    },
    renderFood(colors) {
      return `
        <ellipse cx="5" cy="5" rx="3.5" ry="4.5" fill="${colors.food}" />
        <circle cx="4" cy="4" r="1" fill="#ffffff" opacity="0.6" />
      `;
    }
  },
  robot: {
    renderHead(colors) {
      return `
        <rect width="10" height="10" rx="1" fill="${colors.snakeHead}" stroke="#333" stroke-width="0.5" />
        <rect x="1.5" y="3" width="7" height="2" rx="0.5" fill="${colors.glow || colors.snakeEyes}" />
        <line x1="5" y1="0" x2="5" y2="-2" stroke="#555" stroke-width="0.8" />
        <circle cx="5" cy="-2" r="1" fill="${colors.glow || colors.snakeEyes}" />
      `;
    },
    renderBodySegment(index, colors) {
      return `
        <rect width="10" height="10" rx="1" fill="${colors.snakeBody}" stroke="#444" stroke-width="0.5" />
        <circle cx="2" cy="2" r="0.6" fill="#111" opacity="0.5" />
        <circle cx="8" cy="2" r="0.6" fill="#111" opacity="0.5" />
        <circle cx="2" cy="8" r="0.6" fill="#111" opacity="0.5" />
        <circle cx="8" cy="8" r="0.6" fill="#111" opacity="0.5" />
        <rect x="4.5" y="2" width="1" height="6" fill="${colors.glow || colors.snakeHead}" opacity="0.8" />
      `;
    },
    renderTail(colors) {
      return `
        <rect x="3.5" y="1" width="3" height="7" rx="0.5" fill="${colors.snakeBody}" />
        <circle cx="5" cy="8.5" r="1.5" fill="${colors.glow || colors.snakeHead}" />
      `;
    },
    renderFood(colors) {
      return `
        <rect x="2.5" y="2" width="5" height="6" rx="1" fill="${colors.food}" />
        <line x1="1" y1="3.5" x2="2.5" y2="3.5" stroke="${colors.sparkle}" stroke-width="0.6" />
        <line x1="1" y1="6.5" x2="2.5" y2="6.5" stroke="${colors.sparkle}" stroke-width="0.6" />
        <line x1="7.5" y1="3.5" x2="9" y2="3.5" stroke="${colors.sparkle}" stroke-width="0.6" />
        <line x1="7.5" y1="6.5" x2="9" y2="6.5" stroke="${colors.sparkle}" stroke-width="0.6" />
      `;
    }
  },
  pacman: {
    renderHead(colors) {
      return `
        <circle cx="5" cy="5" r="5" fill="#ffd700" />
        <polygon points="5,5 10,2 10,8" fill="${colors.background}" />
        <circle cx="4" cy="2" r="0.8" fill="#000000" />
      `;
    },
    renderBodySegment(index, colors) {
      const ghostColors = ["#ff0000", "#ffb8ff", "#00ffff", "#ffb851"];
      const ghostColor = ghostColors[index % ghostColors.length];
      return `
        <path d="M 5,0 A 5,5 0 0 1 10,5 L 10,10 L 8,8 L 6,10 L 4,8 L 2,10 L 0,10 L 0,5 A 5,5 0 0 1 5,0 Z" fill="${ghostColor}" />
        <circle cx="3" cy="4" r="1.2" fill="#ffffff" />
        <circle cx="7" cy="4" r="1.2" fill="#ffffff" />
        <circle cx="2.7" cy="4" r="0.6" fill="#0000ff" />
        <circle cx="6.7" cy="4" r="0.6" fill="#0000ff" />
      `;
    },
    renderTail(colors) {
      return `<circle cx="5" cy="5" r="2" fill="#ffd700" />`;
    },
    renderFood(colors) {
      return `
        <circle cx="3.5" cy="6.5" r="2.5" fill="#ff0000" />
        <circle cx="7.2" cy="5.5" r="2.3" fill="#ff0000" />
        <path d="M 3.5,4 C 4,1 6,1 7,2.5" stroke="#4caf50" stroke-width="0.8" fill="none" />
      `;
    }
  },
  ghost: {
    renderHead(colors) {
      return `
        <path d="M 5,0 C 2,0 0,2 0,5 L 0,9.5 C 0,10 1.5,9 2.5,9.5 C 3.5,10 4.5,9 5,9.5 C 5.5,9 6.5,10 7.5,9.5 C 8.5,9 10,10 10,9.5 L 10,5 C 10,2 8,0 5,0 Z" fill="${colors.snakeHead}" opacity="0.8" />
        <ellipse cx="3" cy="4.5" rx="1.1" ry="1.6" fill="${colors.snakeEyes}" />
        <ellipse cx="7" cy="4.5" rx="1.1" ry="1.6" fill="${colors.snakeEyes}" />
      `;
    },
    renderBodySegment(index, colors) {
      const opacity = Math.max(0.2, 0.7 - index * 0.08);
      return `<circle cx="5" cy="5" r="4.5" fill="${colors.snakeBody}" opacity="${opacity}" />`;
    },
    renderTail(colors) {
      return `<path d="M 5,1 L 8,9 L 2,9 Z" fill="${colors.snakeBody}" opacity="0.2" />`;
    },
    renderFood(colors) {
      return `
        <circle cx="5" cy="5" r="4.5" fill="${colors.food}" opacity="0.6" />
        <circle cx="5" cy="5" r="2" fill="#ffffff" />
      `;
    }
  },
  fox: {
    renderHead(colors) {
      return `
        <rect width="10" height="10" rx="3" fill="#e05a00" />
        <path d="M 0,6 L 3,10 L 0,10 Z M 10,6 L 7,10 L 10,10 Z" fill="#ffffff" />
        <polygon points="0,3 0,-1.5 3,1" fill="#e05a00" />
        <polygon points="0.8,2.2 0.8,-0.2 2.2,1.2" fill="#ffccd5" />
        <polygon points="10,3 10,-1.5 7,1" fill="#e05a00" />
        <polygon points="9.2,2.2 9.2,-0.2 7.8,1.2" fill="#ffccd5" />
        <circle cx="5" cy="8.5" r="1" fill="#000000" />
        <circle cx="2.5" cy="4.5" r="1" fill="#000000" />
        <circle cx="7.5" cy="4.5" r="1" fill="#000000" />
      `;
    },
    renderBodySegment(index, colors) {
      return `<rect width="10" height="10" rx="3.5" fill="#e05a00" />`;
    },
    renderTail(colors) {
      return `
        <rect width="10" height="10" rx="3.5" fill="#e05a00" />
        <path d="M 0,7 L 5,3 L 10,7 L 10,10 L 0,10 Z" fill="#ffffff" />
      `;
    },
    renderFood(colors) {
      return `
        <ellipse cx="5" cy="6" rx="3.5" ry="4" fill="#a0522d" />
        <path d="M 1.5,4.5 C 1.5,2 8.5,2 8.5,4.5 Z" fill="#8b4513" />
        <line x1="5" y1="2" x2="5" y2="0.5" stroke="#5c2e0b" stroke-width="0.8" />
      `;
    }
  },
  cat: {
    renderHead(colors) {
      return `
        <rect width="10" height="10" rx="4" fill="${colors.snakeHead}" />
        <polygon points="1,2 0,-1.5 3.5,1.5" fill="${colors.snakeHead}" />
        <polygon points="9,2 10,-1.5 6.5,1.5" fill="${colors.snakeHead}" />
        <ellipse cx="3" cy="4.5" rx="1" ry="1.4" fill="${colors.glow || '#ffd700'}" />
        <line x1="3" y1="3.2" x2="3" y2="5.8" stroke="#000" stroke-width="0.5" />
        <ellipse cx="7" cy="4.5" rx="1" ry="1.4" fill="${colors.glow || '#ffd700'}" />
        <line x1="7" y1="3.2" x2="7" y2="5.8" stroke="#000" stroke-width="0.5" />
        <polygon points="5,7 4.5,6.5 5.5,6.5" fill="#ffccd5" />
        <line x1="1" y1="6" x2="-1.5" y2="5.5" stroke="${colors.snakeEyes}" stroke-width="0.4" />
        <line x1="1" y1="7" x2="-1.5" y2="7" stroke="${colors.snakeEyes}" stroke-width="0.4" />
        <line x1="9" y1="6" x2="11.5" y2="5.5" stroke="${colors.snakeEyes}" stroke-width="0.4" />
        <line x1="9" y1="7" x2="11.5" y2="7" stroke="${colors.snakeEyes}" stroke-width="0.4" />
      `;
    },
    renderBodySegment(index, colors) {
      const isStriped = index % 2 === 0;
      const bodyColor = isStriped ? colors.snakeBody : "#555555";
      return `
        <rect width="10" height="10" rx="3.5" fill="${bodyColor}" />
        ${isStriped ? `<path d="M 0,2 L 2,3 L 0,4 M 10,2 L 8,3 L 10,4" fill="none" stroke="#222" stroke-width="0.7" />` : ""}
      `;
    },
    renderTail(colors) {
      return `
        <rect width="10" height="10" rx="3.5" fill="${colors.snakeBody}" />
        <path d="M 5,2 C 7,0 9,3 7,5 C 5,7 5,10 5,10" fill="none" stroke="${colors.snakeBody}" stroke-width="2.5" stroke-linecap="round" />
      `;
    },
    renderFood(colors) {
      return `
        <path d="M 1,5 C 3,2 7,2 9,5 C 7,8 3,8 1,5 Z" fill="${colors.food}" />
        <polygon points="9,5 11,3 11,7" fill="${colors.food}" />
        <circle cx="3.2" cy="4.5" r="0.6" fill="#000000" />
      `;
    }
  },
  dinosaur: {
    renderHead(colors) {
      return `
        <rect width="10" height="10" rx="2" fill="${colors.snakeHead}" />
        <rect x="4" y="5" width="6" height="5" rx="1" fill="${colors.snakeHead}" />
        <polygon points="6,10 7,8 8,10" fill="#ffffff" />
        <circle cx="3.5" cy="3.5" r="1" fill="${colors.sparkle}" />
        <polygon points="1,0 -1,-1 1,2" fill="${colors.sparkle}" />
      `;
    },
    renderBodySegment(index, colors) {
      return `
        <rect width="10" height="10" rx="2" fill="${colors.snakeBody}" />
        <polygon points="5,0 3,-2 7,-2" fill="${colors.sparkle}" />
      `;
    },
    renderTail(colors) {
      return `
        <polygon points="0,1 10,5 0,9" fill="${colors.snakeBody}" />
        <polygon points="3,2 2,-1 5,3" fill="${colors.sparkle}" />
      `;
    },
    renderFood(colors) {
      return `
        <ellipse cx="5" cy="5" rx="3.5" ry="4.5" fill="${colors.food}" />
        <circle cx="3.5" cy="3.5" r="0.8" fill="${colors.sparkle}" opacity="0.7" />
        <circle cx="6.5" cy="6.5" r="0.6" fill="${colors.sparkle}" opacity="0.7" />
        <circle cx="4" cy="7" r="0.7" fill="${colors.sparkle}" opacity="0.7" />
      `;
    }
  },
  unicorn: {
    renderHead(colors) {
      return `
        <rect width="10" height="10" rx="3.5" fill="#fdf0f6" />
        <polygon points="5,-3.5 3.5,0.5 6.5,0.5" fill="#ffe259" />
        <path d="M 5,-3.5 L 5,0.5" stroke="#ffa7c4" stroke-width="0.5" />
        <circle cx="2.5" cy="7.5" r="1.2" fill="#ffb7b2" opacity="0.8" />
        <circle cx="7.5" cy="7.5" r="1.2" fill="#ffb7b2" opacity="0.8" />
        <circle cx="3" cy="4.5" r="0.8" fill="#4a4e69" />
        <circle cx="7" cy="4.5" r="0.8" fill="#4a4e69" />
        <polygon points="1,2 -0.5,-1 2.5,1.5" fill="#fdf0f6" />
        <polygon points="9,2 10.5,-1 7.5,1.5" fill="#fdf0f6" />
        <polygon points="0.8,1.8 0,-0.2 1.8,1.4" fill="#ffa7c4" />
        <polygon points="9.2,1.8 10,-0.2 8.2,1.4" fill="#ffa7c4" />
      `;
    },
    renderBodySegment(index, colors) {
      const unicornBodyColors = ["#ffc6ff", "#bdb2ff", "#9bf6ff", "#caffbf", "#fdffb6", "#ffd166"];
      const segmentColor = unicornBodyColors[index % unicornBodyColors.length];
      return `<rect width="10" height="10" rx="4" fill="${segmentColor}" />`;
    },
    renderTail(colors) {
      return `
        <circle cx="3" cy="5" r="2.5" fill="#ffc6ff" />
        <circle cx="7" cy="5" r="2.5" fill="#ffc6ff" />
        <circle cx="5" cy="4" r="3.2" fill="#ffc6ff" />
        <circle cx="5" cy="6.5" r="2" fill="#ffffff" opacity="0.6" />
      `;
    },
    renderFood(colors) {
      return `
        <polygon points="5,0.5 6.2,3.5 9.5,3.8 7,6 7.8,9.2 5,7.5 2.2,9.2 3,6 0.5,3.8 3.8,3.5" fill="${colors.sparkle}" />
      `;
    }
  },
  ninja: {
    renderHead(colors) {
      return `
        <rect width="10" height="10" rx="3" fill="#1a1a1a" />
        <rect x="2" y="2.5" width="6" height="3" rx="1" fill="#ffffff" />
        <circle cx="3.8" cy="4" r="0.8" fill="#000000" />
        <circle cx="6.2" cy="4" r="0.8" fill="#000000" />
        <path d="M 1,1 L -2,-1 L -1,1 Z" fill="#ff3333" />
        <path d="M 1,2 L -2.5,3 L -1,3 Z" fill="#ff3333" />
      `;
    },
    renderBodySegment(index, colors) {
      const wrapColor = index % 2 === 0 ? "#2b2b2b" : "#1f1f1f";
      return `
        <rect width="10" height="10" rx="2" fill="${wrapColor}" />
        <line x1="0" y1="2" x2="10" y2="8" stroke="#3d3d3d" stroke-width="0.8" />
        <line x1="10" y1="2" x2="0" y2="8" stroke="#3d3d3d" stroke-width="0.8" />
      `;
    },
    renderTail(colors) {
      return `
        <rect x="4" y="0" width="2" height="10" rx="0.5" fill="#e0a96d" />
        <rect x="2" y="7" width="6" height="1.5" rx="0.3" fill="#1a1a1a" />
        <line x1="4" y1="2" x2="6" y2="4" stroke="#000000" stroke-width="0.6" />
        <line x1="4" y1="4" x2="6" y2="6" stroke="#000000" stroke-width="0.6" />
      `;
    },
    renderFood(colors) {
      return `
        <circle cx="5" cy="5" r="4.5" fill="#000000" />
        <circle cx="5" cy="5" r="3.2" fill="#ffffff" />
        <circle cx="5" cy="5" r="1.5" fill="#ff5722" />
        <circle cx="4.2" cy="4.2" r="0.6" fill="#4caf50" />
      `;
    }
  },
  ufo: {
    renderHead(colors) {
      return `
        <ellipse cx="5" cy="6" rx="5" ry="2.2" fill="#8d99ae" />
        <ellipse cx="5" cy="6" rx="4" ry="1.2" fill="#d8f3dc" opacity="0.7" />
        <path d="M 2.5,5 C 2.5,2 7.5,2 7.5,5 Z" fill="#00f5d4" opacity="0.65" />
        <circle cx="5" cy="4" r="1.1" fill="#39ff14" />
        <circle cx="4.6" cy="3.7" r="0.3" fill="#000000" />
        <circle cx="5.4" cy="3.7" r="0.3" fill="#000000" />
        <circle cx="2" cy="6.2" r="0.5" fill="#ffe600" />
        <circle cx="5" cy="6.8" r="0.5" fill="#ffe600" />
        <circle cx="8" cy="6.2" r="0.5" fill="#ffe600" />
      `;
    },
    renderBodySegment(index, colors) {
      return `
        <rect width="10" height="10" rx="1.5" fill="#4a4e69" />
        <rect x="1" y="1" width="8" height="8" rx="1" fill="#c0c0c0" />
        <circle cx="5" cy="5" r="1.8" fill="${colors.glow || '#00f0ff'}" />
      `;
    },
    renderTail(colors) {
      return `
        <polygon points="5,10 1,0 9,0" fill="#00f5d4" opacity="0.4" />
        <polygon points="5,8 2.5,0 7.5,0" fill="#ffffff" opacity="0.8" />
      `;
    },
    renderFood(colors) {
      return `
        <rect x="2.5" y="1.5" width="5" height="7" rx="1" fill="#333533" />
        <rect x="3" y="3" width="4" height="1.2" fill="${colors.food}" />
        <rect x="3" y="5.8" width="4" height="1.2" fill="${colors.food}" />
        <circle cx="5" cy="4.8" r="0.6" fill="#ffffff" />
      `;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const usernameInput = document.getElementById('username-input');
  const skinsGrid = document.getElementById('skins-grid');
  const themesGrid = document.getElementById('themes-grid');
  const speedSlider = document.getElementById('speed-slider');
  const speedVal = document.getElementById('speed-val');
  
  // Toggles
  const toggleGlow = document.getElementById('toggle-glow');
  const toggleParticles = document.getElementById('toggle-particles');
  const toggleTail = document.getElementById('toggle-tail');
  const toggleWave = document.getElementById('toggle-wave');
  const toggleBlink = document.getElementById('toggle-blink');
  const enableCustomColors = document.getElementById('enable-custom-colors');
  
  // Custom Colors
  const colorBg = document.getElementById('color-bg');
  const colorHead = document.getElementById('color-head');
  const colorBody = document.getElementById('color-body');
  const colorFood = document.getElementById('color-food');
  const colorEmpty = document.getElementById('color-empty');
  const colorL1 = document.getElementById('color-l1');
  const colorL2 = document.getElementById('color-l2');
  const colorL3 = document.getElementById('color-l3');
  const colorL4 = document.getElementById('color-l4');

  // Preview / Actions
  const previewImg = document.getElementById('snake-preview-img');
  const statusTag = document.getElementById('status-tag');
  const downloadSvgBtn = document.getElementById('download-svg-btn');
  const downloadPngBtn = document.getElementById('download-png-btn');
  const embedCodeArea = document.getElementById('embed-code-area');
  const copyCodeBtn = document.getElementById('copy-code-btn');
  const soundBtn = document.getElementById('sound-btn');

  // Tabs
  const tabs = document.querySelectorAll('.tab');
  
  // Collapsible Content
  const customThemeTrigger = document.getElementById('custom-theme-trigger');
  const customThemeContent = document.getElementById('custom-theme-content');

  // Play Mode Controls
  const modeAutoplayBtn = document.getElementById('mode-autoplay-btn');
  const modeArcadeBtn = document.getElementById('mode-arcade-btn');
  const autoplayScreen = document.getElementById('autoplay-screen');
  const arcadeScreen = document.getElementById('arcade-screen');
  const arcadeOverlay = document.getElementById('arcade-overlay');
  const arcadeScoreboard = document.getElementById('arcade-scoreboard');
  const startArcadeBtn = document.getElementById('start-arcade-btn');
  const scoreVal = document.getElementById('arcade-score');
  const highScoreVal = document.getElementById('arcade-high-score');
  const remainingVal = document.getElementById('arcade-remaining');

  // --- State Variables ---
  let activeSkin = 'classic';
  let activeTheme = 'classic-dark';
  let activeTab = 'markdown';
  let audioCtx = null;
  let audioInterval = null;
  let isSoundOn = false;

  // --- Game State Variables ---
  let isArcadeMode = false;
  let gameInterval = null;
  let gameScore = 0;
  let gameHighScore = parseInt(localStorage.getItem('gitsnake_high_score') || '0', 10);
  let gameSnake = [];
  let gameDirection = 'right';
  let gameFood = null;
  let gameEatenCount = 0;
  let gameTotalFood = 0;
  let gameActive = false;
  let gamePaused = false;
  let keyQueue = [];
  let contributionGridData = null;

  // --- Collapsible Handler ---
  customThemeTrigger.addEventListener('click', () => {
    customThemeTrigger.classList.toggle('collapsed');
    customThemeContent.classList.toggle('collapsed');
  });

  // --- Grid Selection Handlers ---
  skinsGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.select-item');
    if (!item) return;
    
    skinsGrid.querySelectorAll('.select-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    activeSkin = item.dataset.skin;
    
    if (isArcadeMode && contributionGridData) {
      // Rebuild board SVG to paint correct skin, then update positions
      buildArcadeSVG(contributionGridData);
      drawSnakeInArcade();
      if (gameFood) updateFoodPositionSVG();
    } else {
      updatePreview();
    }
  });

  themesGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.select-item');
    if (!item) return;
    
    themesGrid.querySelectorAll('.select-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    activeTheme = item.dataset.theme;
    
    if (contributionGridData) {
      updateGitStats(contributionGridData);
      if (isArcadeMode) {
        buildArcadeSVG(contributionGridData);
        drawSnakeInArcade();
        if (gameFood) updateFoodPositionSVG();
      }
    }
    
    if (!isArcadeMode) {
      updatePreview();
    }
  });

  // --- Input Change Handlers ---
  let usernameTimeout = null;
  usernameInput.addEventListener('input', () => {
    clearTimeout(usernameTimeout);
    statusTag.textContent = 'Typing...';
    usernameTimeout = setTimeout(() => {
      loadUserData();
      if (!isArcadeMode) updatePreview();
    }, 800);
  });

  usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      clearTimeout(usernameTimeout);
      loadUserData();
      if (!isArcadeMode) updatePreview();
    }
  });

  speedSlider.addEventListener('input', (e) => {
    speedVal.textContent = e.target.value;
  });
  
  speedSlider.addEventListener('change', () => {
    if (isArcadeMode && gameActive && !gamePaused) {
      // Instantly adjust speed during active gameplay!
      clearInterval(gameInterval);
      gameInterval = setInterval(gameTick, speedSlider.value);
    } else if (!isArcadeMode) {
      updatePreview();
    }
  });

  // Toggle handlers
  [toggleGlow, toggleParticles, toggleTail, toggleWave, toggleBlink, enableCustomColors].forEach(el => {
    el.addEventListener('change', () => {
      if (contributionGridData) {
        updateGitStats(contributionGridData);
        if (isArcadeMode) {
          buildArcadeSVG(contributionGridData);
          drawSnakeInArcade();
          if (gameFood) updateFoodPositionSVG();
        }
      }
      if (!isArcadeMode) updatePreview();
    });
  });

  // Color inputs handlers
  [colorBg, colorHead, colorBody, colorFood, colorEmpty, colorL1, colorL2, colorL3, colorL4].forEach(el => {
    el.addEventListener('input', () => {
      if (enableCustomColors.checked) {
        if (contributionGridData) {
          updateGitStats(contributionGridData);
          if (isArcadeMode) {
            buildArcadeSVG(contributionGridData);
            drawSnakeInArcade();
            if (gameFood) updateFoodPositionSVG();
          }
        }
        if (!isArcadeMode) {
          clearTimeout(usernameTimeout);
          usernameTimeout = setTimeout(() => {
            updatePreview();
          }, 300);
        }
      }
    });
  });

  // --- Mode Switching Handlers ---
  modeAutoplayBtn.addEventListener('click', () => {
    if (!isArcadeMode) return;
    isArcadeMode = false;
    
    // Stop game loop
    if (gameInterval) {
      clearInterval(gameInterval);
      gameInterval = null;
    }
    gameActive = false;
    
    modeArcadeBtn.classList.remove('active');
    modeAutoplayBtn.classList.add('active');
    
    arcadeScreen.classList.add('hidden');
    arcadeScoreboard.classList.add('hidden');
    autoplayScreen.classList.remove('hidden');
    
    statusTag.textContent = 'Active Animation';
    updatePreview();
  });

  modeArcadeBtn.addEventListener('click', () => {
    if (isArcadeMode) return;
    isArcadeMode = true;
    
    modeAutoplayBtn.classList.remove('active');
    modeArcadeBtn.classList.add('active');
    
    autoplayScreen.classList.add('hidden');
    arcadeScreen.classList.remove('hidden');
    arcadeScoreboard.classList.remove('hidden');
    
    statusTag.textContent = '🕹️ Play Mode';
    
    if (contributionGridData) {
      initArcadeGame();
    } else {
      loadUserData();
    }
  });

  startArcadeBtn.addEventListener('click', () => {
    if (gamePaused) {
      // Resume
      toggleGamePause();
    } else {
      // New game start
      startArcadeGame();
    }
  });

  // --- URL Builder ---
  function buildApiUrl(action) {
    const user = usernameInput.value.trim() || 'octocat';
    const theme = activeTheme;
    const skin = activeSkin;
    const speed = speedSlider.value;
    
    const glow = toggleGlow.checked;
    const particles = toggleParticles.checked;
    const tail = toggleTail.checked;
    const wave = toggleWave.checked;
    const blink = toggleBlink.checked;

    let url = `${window.location.origin}/api/${action}?user=${encodeURIComponent(user)}`;
    url += `&theme=${theme}&skin=${skin}&speed=${speed}`;
    url += `&tailAnimation=${tail}&foodGlow=${glow}&particleEffects=${particles}&eyeBlinking=${blink}&waveMotion=${wave}`;

    if (enableCustomColors.checked) {
      url += `&custom=true`;
      url += `&bg=${colorBg.value.substring(1)}`;
      url += `&head=${colorHead.value.substring(1)}`;
      url += `&body=${colorBody.value.substring(1)}`;
      url += `&food=${colorFood.value.substring(1)}`;
      url += `&empty=${colorEmpty.value.substring(1)}`;
      url += `&l1=${colorL1.value.substring(1)}`;
      url += `&l2=${colorL2.value.substring(1)}`;
      url += `&l3=${colorL3.value.substring(1)}`;
      url += `&l4=${colorL4.value.substring(1)}`;
    }

    return url;
  }

  // --- Preview Update Handler ---
  function updatePreview() {
    statusTag.textContent = 'Generating...';
    const url = buildApiUrl('preview');
    
    const cacheBusterUrl = `${url}&_t=${Date.now()}`;
    const imgLoader = new Image();
    imgLoader.src = cacheBusterUrl;
    imgLoader.onload = () => {
      previewImg.src = cacheBusterUrl;
      statusTag.textContent = 'Active Animation';
      updateEmbedCode();
      if (isSoundOn && !isArcadeMode) {
        playRetroPowerupSound();
      }
    };
    imgLoader.onerror = () => {
      statusTag.textContent = 'Generation Error';
    };
  }

  // --- Download Handlers ---
  downloadSvgBtn.addEventListener('click', () => {
    const url = buildApiUrl('download') + '&format=svg';
    window.location.href = url;
  });

  downloadPngBtn.addEventListener('click', () => {
    statusTag.textContent = 'Compiling PNG...';
    const url = buildApiUrl('download') + '&format=png';
    window.location.href = url;
    setTimeout(() => {
      statusTag.textContent = isArcadeMode ? '🕹️ Play Mode' : 'Active Animation';
    }, 2000);
  });

  // --- Embed Code Handler ---
  function updateEmbedCode() {
    const url = buildApiUrl('preview');
    
    if (activeTab === 'markdown') {
      embedCodeArea.value = `![GitSnake Pro Contribution Board](${url})`;
    } else if (activeTab === 'html') {
      embedCodeArea.value = `<img src="${url}" alt="GitSnake Pro Contribution Board" />`;
    } else if (activeTab === 'url') {
      embedCodeArea.value = url;
    }
  }

  // Tab controls
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tab;
      updateEmbedCode();
    });
  });

  // Copy button
  copyCodeBtn.addEventListener('click', () => {
    embedCodeArea.select();
    document.execCommand('copy');
    
    const prevText = copyCodeBtn.textContent;
    copyCodeBtn.textContent = 'Copied!';
    copyCodeBtn.style.borderColor = 'var(--accent-green)';
    copyCodeBtn.style.color = 'var(--accent-green)';

    if (isSoundOn) playCoinSound();

    setTimeout(() => {
      copyCodeBtn.textContent = prevText;
      copyCodeBtn.style.borderColor = '';
      copyCodeBtn.style.color = '';
    }, 1500);
  });

  // --- Web Audio Retro Synthesizer ---
  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playCoinSound() {
    initAudio();
    if (!audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    const now = audioCtx.currentTime;
    osc.type = 'square';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(880.00, now + 0.08);
    
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    
    osc.start(now);
    osc.stop(now + 0.25);
  }

  function playRetroPowerupSound() {
    initAudio();
    if (!audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    const now = audioCtx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(330, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.25);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    osc.start(now);
    osc.stop(now + 0.3);
  }

  function playMoveSound() {
    initAudio();
    if (!audioCtx || !isSoundOn) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    const now = audioCtx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    
    osc.start(now);
    osc.stop(now + 0.04);
  }

  function playCrashSound() {
    initAudio();
    if (!audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    const now = audioCtx.currentTime;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.4);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    
    osc.start(now);
    osc.stop(now + 0.45);
  }

  function playVictorySound() {
    initAudio();
    if (!audioCtx) return;
    
    const now = audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0.04, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);
      
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.2);
    });
  }

  soundBtn.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    soundBtn.classList.toggle('active');
    
    if (isSoundOn) {
      soundBtn.textContent = '🔊 Arcade Sound: ON';
      initAudio();
      playRetroPowerupSound();
      
      if (!isArcadeMode) {
        audioInterval = setInterval(() => {
          if (Math.random() > 0.45) {
            playCoinSound();
          }
        }, 1200);
      }
    } else {
      soundBtn.textContent = '🔊 Arcade Sound: OFF';
      clearInterval(audioInterval);
      audioInterval = null;
    }
  });

  // --- GitStats & Data Fetching ---
  async function loadUserData() {
    const user = usernameInput.value.trim() || 'octocat';
    
    try {
      const response = await fetch(`/api/data?user=${encodeURIComponent(user)}`);
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      contributionGridData = data;
      
      updateGitStats(data);
      
      if (isArcadeMode) {
        initArcadeGame();
      }
    } catch (error) {
      console.warn('Falling back to local mock data generator.', error);
      contributionGridData = generateLocalMockData(user);
      updateGitStats(contributionGridData);
      if (isArcadeMode) {
        initArcadeGame();
      }
    }
  }

  function generateLocalMockData(username) {
    const weeks = [];
    const totalWeeks = 53;
    const daysPerWeek = 7;
    let totalContributions = 0;
    
    for (let w = 0; w < totalWeeks; w++) {
      const weekDays = [];
      for (let d = 0; d < daysPerWeek; d++) {
        const r = Math.random();
        let count = 0;
        if (r > 0.4) {
          count = Math.floor(Math.random() * 8) + 1;
        }
        totalContributions += count;
        weekDays.push({
          contributionCount: count,
          weekday: d,
        });
      }
      weeks.push(weekDays);
    }
    return {
      username,
      totalContributions,
      weeks
    };
  }

  function updateGitStats(data) {
    if (!data) return;
    
    document.getElementById('stat-total-commits').textContent = data.totalContributions.toLocaleString();
    
    let longestStreak = 0;
    let currentStreak = 0;
    let peakDailyCommits = 0;
    let levelCounts = [0, 0, 0, 0, 0]; // L0, L1, L2, L3, L4
    let activeDaysCount = 0;
    
    const flatDays = [];
    for (const week of data.weeks) {
      for (const day of week) {
        flatDays.push(day);
      }
    }
    
    for (const day of flatDays) {
      const count = day.contributionCount;
      if (count > peakDailyCommits) peakDailyCommits = count;
      
      if (count > 0) {
        activeDaysCount++;
        currentStreak++;
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
      
      let level = 0;
      if (count > 0) {
        if (count <= 2) level = 1;
        else if (count <= 5) level = 2;
        else if (count <= 9) level = 3;
        else level = 4;
      }
      levelCounts[level]++;
    }
    
    document.getElementById('stat-longest-streak').textContent = `${longestStreak} days`;
    document.getElementById('stat-peak-commits').textContent = peakDailyCommits;
    document.getElementById('stat-active-days').textContent = `${activeDaysCount} days`;
    
    const totalDays = flatDays.length;
    const colors = getActiveThemeColors();
    
    const levels = ['l1', 'l2', 'l3', 'l4'];
    levels.forEach((l, index) => {
      const count = levelCounts[index + 1];
      const pct = totalDays > 0 ? (count / totalDays) * 100 : 0;
      const barFill = document.getElementById(`bar-${l}`);
      const barCount = document.getElementById(`count-${l}`);
      
      if (barFill) {
        barFill.style.width = `${pct}%`;
        barFill.style.backgroundColor = colors[l === 'l1' ? 'level1' : l === 'l2' ? 'level2' : l === 'l3' ? 'level3' : 'level4'];
      }
      if (barCount) barCount.textContent = count;
    });
  }

  function getActiveThemeColors() {
    let colors = { ...(THEMES[activeTheme] || THEMES['classic-dark']) };
    if (enableCustomColors.checked) {
      colors.background = colorBg.value;
      colors.snakeHead = colorHead.value;
      colors.snakeBody = colorBody.value;
      colors.food = colorFood.value;
      colors.emptyCell = colorEmpty.value;
      colors.level1 = colorL1.value;
      colors.level2 = colorL2.value;
      colors.level3 = colorL3.value;
      colors.level4 = colorL4.value;
    }
    return colors;
  }

  function getLevelColor(level, c) {
    if (level === 0) return c.emptyCell;
    if (level === 1) return c.level1;
    if (level === 2) return c.level2;
    if (level === 3) return c.level3;
    return c.level4;
  }

  function adjustBrightness(hex, percent) {
    if (!hex || !hex.startsWith("#")) return hex;
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);

    R = Math.min(255, Math.max(0, R + (R * percent) / 100));
    G = Math.min(255, Math.max(0, G + (G * percent) / 100));
    B = Math.min(255, Math.max(0, B + (B * percent) / 100));

    const rHex = Math.round(R).toString(16).padStart(2, "0");
    const gHex = Math.round(G).toString(16).padStart(2, "0");
    const bHex = Math.round(B).toString(16).padStart(2, "0");

    return `#${rHex}${gHex}${bHex}`;
  }

  // --- Client Side Interactive Game Engine ---
  function buildArcadeSVG(data) {
    const colors = getActiveThemeColors();
    const skin = SKIN_RENDERERS[activeSkin] || SKIN_RENDERERS.classic;
    
    const CELL_SIZE = 10;
    const CELL_GAP = 2;
    const GRID_X = 15;
    const GRID_Y = 55;
    const BOARD_WIDTH = 53;
    const BOARD_HEIGHT = 7;
    
    const CARD_WIDTH = BOARD_WIDTH * (CELL_SIZE + CELL_GAP) - CELL_GAP + GRID_X * 2;
    const CARD_HEIGHT = BOARD_HEIGHT * (CELL_SIZE + CELL_GAP) - CELL_GAP + GRID_Y + 35;
    
    const cardBgColor = colors.background;
    const cardStrokeColor = colors.gridLine || adjustBrightness(colors.background, 20);
    const titleColor = adjustBrightness(colors.level4, 40);
    const subtitleColor = colors.level2;
    
    let gridSVG = '';
    for (let x = 0; x < BOARD_WIDTH; x++) {
      for (let y = 0; y < BOARD_HEIGHT; y++) {
        const col = data.weeks[x];
        const day = col ? col[y] : null;
        const count = day ? day.contributionCount : 0;
        const cx = x * (CELL_SIZE + CELL_GAP);
        const cy = y * (CELL_SIZE + CELL_GAP);
        
        let cellLevel = 0;
        if (count > 0) {
          if (count <= 2) cellLevel = 1;
          else if (count <= 5) cellLevel = 2;
          else if (count <= 9) cellLevel = 3;
          else cellLevel = 4;
        }
        
        const color = getLevelColor(cellLevel, colors);
        gridSVG += `<rect id="arcade-cell-${x}-${y}" x="${cx}" y="${cy}" width="${CELL_SIZE}" height="${CELL_SIZE}" rx="2" fill="${color}" data-level="${cellLevel}" data-count="${count}" data-original-fill="${color}" />\n`;
      }
    }
    
    const legendX = CARD_WIDTH - 15 - 5 * 12 - 35;
    const legendY = CARD_HEIGHT - 20;
    
    const svgHTML = `
      <svg id="arcade-game-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" width="100%" height="100%">
        <defs>
          <linearGradient id="arcade-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${colors.background}" />
            <stop offset="100%" stop-color="${adjustBrightness(colors.background, -15)}" />
          </linearGradient>
          ${colors.glow ? `
          <filter id="arcade-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>` : ''}
        </defs>
        
        <style>
          .arcade-card-bg {
            fill: url(#arcade-bg-grad);
            stroke: ${cardStrokeColor};
            stroke-width: 1.5px;
            rx: 8px;
          }
          .arcade-card-title {
            font-family: 'Outfit', 'Segoe UI', sans-serif;
            font-size: 14px;
            font-weight: 700;
            fill: ${titleColor};
          }
          .arcade-card-subtitle {
            font-family: 'Outfit', 'Segoe UI', sans-serif;
            font-size: 10px;
            font-weight: 500;
            fill: ${subtitleColor};
            opacity: 0.8;
          }
          .arcade-legend-text {
            font-family: 'Segoe UI', sans-serif;
            font-size: 9px;
            fill: ${subtitleColor};
            opacity: 0.7;
          }
        </style>
        
        <!-- Card Background -->
        <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" class="arcade-card-bg" />
        
        <!-- Header -->
        <g transform="translate(15, 20)">
          <text x="0" y="8" class="arcade-card-title">GitSnake Arcade</text>
          <text x="0" y="22" class="arcade-card-subtitle">@${data.username || 'octocat'} • ${data.totalContributions.toLocaleString()} Contributions</text>
        </g>
        
        <!-- Game Board Group -->
        <g transform="translate(${GRID_X}, ${GRID_Y})">
          <!-- Grid cells -->
          <g id="arcade-grid-cells">
            ${gridSVG}
          </g>
          
          <!-- Particle effects group -->
          <g id="arcade-particles-group"></g>
          
          <!-- Food Group -->
          <g id="arcade-food-group" transform="translate(0, 0)" ${colors.glow ? 'filter="url(#arcade-glow)"' : ''}>
            ${skin.renderFood(colors)}
          </g>
          
          <!-- Snake Group -->
          <g id="arcade-snake-group">
            <!-- Body segments -->
            <g id="arcade-snake-body"></g>
            
            <!-- Tail -->
            <g id="arcade-snake-tail" transform="translate(0,0)">
              ${skin.renderTail(colors)}
            </g>
            
            <!-- Head -->
            <g id="arcade-snake-head" transform="translate(0,0)" ${colors.glow ? 'filter="url(#arcade-glow)"' : ''}>
              ${skin.renderHead(colors)}
            </g>
          </g>
        </g>
        
        <!-- Footer Legend -->
        <g transform="translate(${legendX}, ${legendY})">
          <text x="-25" y="8" class="arcade-legend-text">Less</text>
          <rect x="5" y="0" width="10" height="10" rx="1.5" fill="${colors.emptyCell}" />
          <rect x="17" y="0" width="10" height="10" rx="1.5" fill="${colors.level1}" />
          <rect x="29" y="0" width="10" height="10" rx="1.5" fill="${colors.level2}" />
          <rect x="41" y="0" width="10" height="10" rx="1.5" fill="${colors.level3}" />
          <rect x="53" y="0" width="10" height="10" rx="1.5" fill="${colors.level4}" />
          <text x="68" y="8" class="arcade-legend-text">More</text>
        </g>
      </svg>
    `;
    
    document.getElementById('arcade-svg-wrapper').innerHTML = svgHTML;
  }

  function initArcadeGame() {
    if (!contributionGridData) return;
    
    buildArcadeSVG(contributionGridData);
    
    gameScore = 0;
    gameEatenCount = 0;
    gameTotalFood = 0;
    
    const BOARD_WIDTH = 53;
    const BOARD_HEIGHT = 7;
    for (let x = 0; x < BOARD_WIDTH; x++) {
      for (let y = 0; y < BOARD_HEIGHT; y++) {
        const cell = document.getElementById(`arcade-cell-${x}-${y}`);
        if (cell) {
          const level = parseInt(cell.getAttribute('data-level'), 10);
          if (level > 0) {
            gameTotalFood++;
          }
        }
      }
    }
    
    updateScoreboardDisplay();
    
    document.getElementById('arcade-overlay').classList.remove('hidden');
    arcadeOverlay.querySelector('h3').textContent = 'GitSnake Arcade';
    arcadeOverlay.querySelector('p').textContent = 'Eat your contribution blocks to grow and score points!';
    arcadeOverlay.querySelector('#start-arcade-btn').textContent = 'Start Game';
    
    gameActive = false;
    gamePaused = false;
    
    gameSnake = [
      {x: 3, y: 0},
      {x: 2, y: 0},
      {x: 1, y: 0},
      {x: 0, y: 0}
    ];
    gameDirection = 'right';
    keyQueue = [];
    
    spawnGameFood();
    drawSnakeInArcade();
  }

  function drawSnakeInArcade() {
    const colors = getActiveThemeColors();
    const skin = SKIN_RENDERERS[activeSkin] || SKIN_RENDERERS.classic;
    const CELL_SIZE = 10;
    const CELL_GAP = 2;
    const CELL_STEP = CELL_SIZE + CELL_GAP;
    
    const head = gameSnake[0];
    const headGroup = document.getElementById('arcade-snake-head');
    if (headGroup && head) {
      const hx = head.x * CELL_STEP;
      const hy = head.y * CELL_STEP;
      let angle = 90;
      if (gameDirection === 'left') angle = 270;
      else if (gameDirection === 'down') angle = 180;
      else if (gameDirection === 'up') angle = 0;
      headGroup.setAttribute('transform', `translate(${hx}, ${hy}) rotate(${angle})`);
    }
    
    const B = gameSnake.length;
    const tailGroup = document.getElementById('arcade-snake-tail');
    if (tailGroup && B > 1) {
      const tail = gameSnake[B - 1];
      const prev = gameSnake[B - 2];
      const tx = tail.x * CELL_STEP;
      const ty = tail.y * CELL_STEP;
      
      let angle = 90;
      const dx = prev.x - tail.x;
      const dy = prev.y - tail.y;
      if (dx > 0) angle = 90;
      else if (dx < 0) angle = 270;
      else if (dy > 0) angle = 180;
      else if (dy < 0) angle = 0;
      
      tailGroup.setAttribute('transform', `translate(${tx}, ${ty}) rotate(${angle})`);
    }
    
    const bodyContainer = document.getElementById('arcade-snake-body');
    if (bodyContainer) {
      let bodyHTML = '';
      for (let i = 1; i < B - 1; i++) {
        const seg = gameSnake[i];
        if (!seg) continue;
        const sx = seg.x * CELL_STEP;
        const sy = seg.y * CELL_STEP;
        
        const segmentSVG = skin.renderBodySegment(i, colors);
        bodyHTML += `<g transform="translate(${sx}, ${sy})">${segmentSVG}</g>`;
      }
      bodyContainer.innerHTML = bodyHTML;
    }
  }

  function spawnGameFood() {
    const uneatenCells = [];
    const BOARD_WIDTH = 53;
    const BOARD_HEIGHT = 7;
    
    for (let x = 0; x < BOARD_WIDTH; x++) {
      for (let y = 0; y < BOARD_HEIGHT; y++) {
        const cell = document.getElementById(`arcade-cell-${x}-${y}`);
        if (cell) {
          const level = parseInt(cell.getAttribute('data-level'), 10);
          const isEaten = cell.getAttribute('data-eaten') === 'true';
          const isOccupiedBySnake = gameSnake.some(seg => seg.x === x && seg.y === y);
          
          if (gameTotalFood > 0) {
            if (level > 0 && !isEaten && !isOccupiedBySnake) {
              uneatenCells.push({x, y});
            }
          } else {
            if (!isOccupiedBySnake) {
              uneatenCells.push({x, y});
            }
          }
        }
      }
    }
    
    if (uneatenCells.length > 0) {
      const randCell = uneatenCells[Math.floor(Math.random() * uneatenCells.length)];
      gameFood = randCell;
      updateFoodPositionSVG();
    } else {
      gameFood = null;
      const foodGroup = document.getElementById('arcade-food-group');
      if (foodGroup) foodGroup.classList.add('hidden');
      
      if (gameTotalFood > 0 && gameEatenCount >= gameTotalFood) {
        handleGameVictory();
      }
    }
  }

  function updateFoodPositionSVG() {
    if (!gameFood) return;
    const foodGroup = document.getElementById('arcade-food-group');
    if (foodGroup) {
      const CELL_SIZE = 10;
      const CELL_GAP = 2;
      const CELL_STEP = CELL_SIZE + CELL_GAP;
      foodGroup.setAttribute('transform', `translate(${gameFood.x * CELL_STEP}, ${gameFood.y * CELL_STEP})`);
      foodGroup.classList.remove('hidden');
    }
  }

  function startArcadeGame() {
    initAudio();
    playRetroPowerupSound();
    
    document.getElementById('arcade-overlay').classList.add('hidden');
    
    gameActive = true;
    gamePaused = false;
    gameScore = 0;
    gameEatenCount = 0;
    
    if (gameInterval) clearInterval(gameInterval);
    
    const BOARD_WIDTH = 53;
    const BOARD_HEIGHT = 7;
    for (let x = 0; x < BOARD_WIDTH; x++) {
      for (let y = 0; y < BOARD_HEIGHT; y++) {
        const cell = document.getElementById(`arcade-cell-${x}-${y}`);
        if (cell) {
          cell.removeAttribute('data-eaten');
          const origColor = cell.getAttribute('data-original-fill');
          cell.setAttribute('fill', origColor);
        }
      }
    }
    
    gameSnake = [
      {x: 3, y: 0},
      {x: 2, y: 0},
      {x: 1, y: 0},
      {x: 0, y: 0}
    ];
    gameDirection = 'right';
    keyQueue = [];
    
    spawnGameFood();
    drawSnakeInArcade();
    updateScoreboardDisplay();
    
    const speed = speedSlider.value;
    gameInterval = setInterval(gameTick, speed);
  }

  function toggleGamePause() {
    if (!gameActive) return;
    gamePaused = !gamePaused;
    
    const overlay = document.getElementById('arcade-overlay');
    if (gamePaused) {
      clearInterval(gameInterval);
      gameInterval = null;
      overlay.querySelector('h3').textContent = 'Game Paused';
      overlay.querySelector('p').textContent = 'Press SPACE or Click Resume to continue.';
      overlay.querySelector('#start-arcade-btn').textContent = 'Resume';
      overlay.classList.remove('hidden');
    } else {
      overlay.classList.add('hidden');
      const speed = speedSlider.value;
      gameInterval = setInterval(gameTick, speed);
    }
  }

  function gameTick() {
    if (!gameActive || gamePaused) return;
    
    if (keyQueue.length > 0) {
      gameDirection = keyQueue.shift();
    }
    
    playMoveSound();
    
    const head = gameSnake[0];
    let nextX = head.x;
    let nextY = head.y;
    
    if (gameDirection === 'right') nextX++;
    else if (gameDirection === 'left') nextX--;
    else if (gameDirection === 'down') nextY++;
    else if (gameDirection === 'up') nextY--;
    
    if (nextX < 0 || nextX >= 53 || nextY < 0 || nextY >= 7) {
      handleGameOver();
      return;
    }
    
    const collidedWithSelf = gameSnake.some((seg, idx) => idx > 0 && seg.x === nextX && seg.y === nextY);
    if (collidedWithSelf) {
      handleGameOver();
      return;
    }
    
    const newHead = {x: nextX, y: nextY};
    gameSnake.unshift(newHead);
    
    let ateFood = false;
    if (gameFood && nextX === gameFood.x && nextY === gameFood.y) {
      ateFood = true;
      gameEatenCount++;
      
      const foodCell = document.getElementById(`arcade-cell-${nextX}-${nextY}`);
      const colors = getActiveThemeColors();
      
      let level = 0;
      let points = 10;
      if (foodCell) {
        level = parseInt(foodCell.getAttribute('data-level'), 10);
        foodCell.setAttribute('data-eaten', 'true');
        foodCell.setAttribute('fill', colors.emptyCell);
      }
      
      if (gameTotalFood === 0) {
        // Seeding commits on an empty board! Give a random green fill
        if (foodCell) {
          const randL = Math.floor(Math.random() * 4) + 1;
          const seededColor = getLevelColor(randL, colors);
          foodCell.setAttribute('fill', seededColor);
          foodCell.setAttribute('data-level', randL);
        }
        points = 15;
      }
      
      if (level === 1) points = 10;
      else if (level === 2) points = 25;
      else if (level === 3) points = 50;
      else if (level === 4) points = 100;
      
      gameScore += points;
      if (gameScore > gameHighScore) {
        gameHighScore = gameScore;
        localStorage.setItem('gitsnake_high_score', gameHighScore);
      }
      
      triggerParticleBurst(nextX, nextY);
      
      if (isSoundOn) playCoinSound();
      
      updateScoreboardDisplay();
      spawnGameFood();
    }
    
    if (!ateFood) {
      gameSnake.pop();
    }
    
    drawSnakeInArcade();
  }

  function triggerParticleBurst(gridX, gridY) {
    const container = document.getElementById('arcade-particles-group');
    if (!container) return;
    
    const colors = getActiveThemeColors();
    const sparkleColor = colors.sparkle || '#ffffff';
    
    const CELL_SIZE = 10;
    const CELL_GAP = 2;
    const CELL_STEP = CELL_SIZE + CELL_GAP;
    
    const px = gridX * CELL_STEP + CELL_SIZE / 2;
    const py = gridY * CELL_STEP + CELL_SIZE / 2;
    
    const particles = [];
    const numParticles = 8;
    
    for (let i = 0; i < numParticles; i++) {
      const angle = (i / numParticles) * Math.PI * 2 + Math.random() * 0.4;
      const speed = 1.5 + Math.random() * 2;
      const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      particle.setAttribute('r', '1.2');
      particle.setAttribute('fill', sparkleColor);
      particle.setAttribute('cx', px);
      particle.setAttribute('cy', py);
      
      container.appendChild(particle);
      
      particles.push({
        el: particle,
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity: 1
      });
    }
    
    let frames = 0;
    const maxFrames = 20;
    const animInterval = setInterval(() => {
      frames++;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity = 1 - (frames / maxFrames);
        p.el.setAttribute('cx', p.x);
        p.el.setAttribute('cy', p.y);
        p.el.setAttribute('opacity', p.opacity);
        p.el.setAttribute('r', (1.2 + (frames * 0.05)).toFixed(1));
      });
      
      if (frames >= maxFrames) {
        clearInterval(animInterval);
        particles.forEach(p => p.el.remove());
      }
    }, 25);
  }

  function handleGameOver() {
    clearInterval(gameInterval);
    gameInterval = null;
    gameActive = false;
    
    if (isSoundOn) playCrashSound();
    
    const overlay = document.getElementById('arcade-overlay');
    overlay.querySelector('h3').textContent = 'GAME OVER 👾';
    overlay.querySelector('p').innerHTML = `You crashed! Score: <strong>${gameScore}</strong>`;
    overlay.querySelector('#start-arcade-btn').textContent = 'Try Again';
    overlay.classList.remove('hidden');
  }

  function handleGameVictory() {
    clearInterval(gameInterval);
    gameInterval = null;
    gameActive = false;
    
    if (isSoundOn) playVictorySound();
    
    const overlay = document.getElementById('arcade-overlay');
    overlay.querySelector('h3').textContent = 'VICTORY! 🏆';
    overlay.querySelector('p').innerHTML = `You ate all commits!<br>Score: <strong>${gameScore}</strong>`;
    overlay.querySelector('#start-arcade-btn').textContent = 'Play Again';
    overlay.classList.remove('hidden');
  }

  function updateScoreboardDisplay() {
    scoreVal.textContent = String(gameScore).padStart(5, '0');
    highScoreVal.textContent = String(gameHighScore).padStart(5, '0');
    
    if (gameTotalFood > 0) {
      remainingVal.textContent = `${gameEatenCount} / ${gameTotalFood}`;
    } else {
      remainingVal.textContent = `${gameEatenCount} Seeded`;
    }
  }

  // --- Keyboard Control Hook ---
  window.addEventListener('keydown', (e) => {
    if (!isArcadeMode) return;
    
    const key = e.key.toLowerCase();
    
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
    
    if (e.key === ' ' && gameActive) {
      toggleGamePause();
      return;
    }
    
    if (!gameActive || gamePaused) return;
    
    let nextDir = null;
    if (key === 'w' || e.key === 'ArrowUp') nextDir = 'up';
    else if (key === 's' || e.key === 'ArrowDown') nextDir = 'down';
    else if (key === 'a' || e.key === 'ArrowLeft') nextDir = 'left';
    else if (key === 'd' || e.key === 'ArrowRight') nextDir = 'right';
    
    if (nextDir) {
      const lastDir = keyQueue.length > 0 ? keyQueue[keyQueue.length - 1] : gameDirection;
      
      if (nextDir === 'up' && lastDir !== 'down') keyQueue.push(nextDir);
      else if (nextDir === 'down' && lastDir !== 'up') keyQueue.push(nextDir);
      else if (nextDir === 'left' && lastDir !== 'right') keyQueue.push(nextDir);
      else if (nextDir === 'right' && lastDir !== 'left') keyQueue.push(nextDir);
      
      if (keyQueue.length > 2) keyQueue.shift();
    }
  });

  // --- Initial Page Load ---
  loadUserData();
  updatePreview();
});
