import { GitHubContributionData } from "../api/github.js";
import { SimulationResult, SnakeStep } from "../engine/snake.js";
import { ThemeColors, getTheme } from "../themes/index.js";
import { getSkin, SkinRenderer } from "./skins.js";
import { Point } from "../engine/pathfinding.js";

export interface SVGGeneratorOptions {
  speed?: number; // Step duration in ms (default 120ms)
  fps?: number; // Configured speed (steps per second)
  tailAnimation?: boolean;
  foodGlow?: boolean;
  particleEffects?: boolean;
  eyeBlinking?: boolean;
  waveMotion?: boolean;
  customTheme?: Partial<ThemeColors>;
}

/**
 * Calculates smooth rotation angles to prevent spinning full circles (e.g. 270 to 0)
 */
function calculateSmoothAngles(
  steps: SnakeStep[],
  getDirectionVector: (step: SnakeStep) => { dx: number; dy: number },
): number[] {
  const angles: number[] = [];
  let currentAngle = 0;

  // Set initial angle based on the first vector
  if (steps.length > 0) {
    const firstVec = getDirectionVector(steps[0]);
    if (firstVec.dx > 0) currentAngle = 90;
    else if (firstVec.dx < 0) currentAngle = 270;
    else if (firstVec.dy > 0) currentAngle = 180;
    else currentAngle = 0; // Up
  }

  for (let t = 0; t < steps.length; t++) {
    const vec = getDirectionVector(steps[t]);
    let targetAngle = currentAngle;

    if (vec.dx > 0) targetAngle = 90;
    else if (vec.dx < 0) targetAngle = 270;
    else if (vec.dy > 0) targetAngle = 180;
    else if (vec.dy < 0) targetAngle = 0;

    let diff = (targetAngle - (currentAngle % 360) + 360) % 360;
    if (diff > 180) {
      diff -= 360;
    }
    currentAngle += diff;
    angles.push(currentAngle);
  }

  return angles;
}

export function generateSnakeSVG(
  data: GitHubContributionData,
  result: SimulationResult,
  themeName: string,
  skinName: string,
  options: SVGGeneratorOptions = {},
): string {
  const {
    speed = 120,
    tailAnimation = true,
    foodGlow = true,
    particleEffects = true,
    eyeBlinking = true,
    waveMotion = true,
    customTheme,
  } = options;

  // Resolve themes and skins
  let colors = { ...getTheme(themeName) };
  if (customTheme) {
    colors = { ...colors, ...customTheme };
  }

  const skin = getSkin(skinName);
  const steps = result.steps;
  const totalSteps = steps.length;
  const animDuration = ((totalSteps * speed) / 1000).toFixed(2); // Total animation duration in seconds

  // Grid coordinates
  const CELL_SIZE = 10;
  const CELL_GAP = 2;
  const GRID_X = 15;
  const GRID_Y = 55;
  const BOARD_WIDTH = 53;
  const BOARD_HEIGHT = 7;

  // Dimensions of SVG Card
  const CARD_WIDTH =
    BOARD_WIDTH * (CELL_SIZE + CELL_GAP) - CELL_GAP + GRID_X * 2;
  const CARD_HEIGHT =
    BOARD_HEIGHT * (CELL_SIZE + CELL_GAP) - CELL_GAP + GRID_Y + 35;

  // Determine maximum body length achieved in the simulation
  const maxBodyLength = Math.max(...steps.map((s) => s.body.length));

  // --- Smooth angles for head ---
  const headAngles = calculateSmoothAngles(steps, (step) => {
    switch (step.direction) {
      case "right":
        return { dx: 1, dy: 0 };
      case "left":
        return { dx: -1, dy: 0 };
      case "down":
        return { dx: 0, dy: 1 };
      default:
        return { dx: 0, dy: -1 };
    }
  });

  // --- Smooth angles for tail ---
  const tailAngles = calculateSmoothAngles(steps, (step) => {
    const B = step.body.length;
    if (B < 2) return { dx: 0, dy: -1 };
    const tail = step.body[B - 1];
    const prev = step.body[B - 2];
    return { dx: prev.x - tail.x, dy: prev.y - tail.y };
  });

  // --- Generate CSS Keyframes ---
  let cssKeyframes = "";

  // 1. Head Motion Keyframes
  let headFrames = "";
  for (let t = 0; t < totalSteps; t++) {
    const step = steps[t];
    const pct = ((t / totalSteps) * 100).toFixed(2);
    const x = step.head.x * (CELL_SIZE + CELL_GAP);
    const y = step.head.y * (CELL_SIZE + CELL_GAP);
    const angle = headAngles[t];
    headFrames += `    ${pct}% { transform: translate(${x}px, ${y}px) rotate(${angle}deg); }\n`;
  }
  cssKeyframes += `
  @keyframes head-motion {
${headFrames}
  }`;

  // 2. Tail Motion Keyframes
  let tailFrames = "";
  for (let t = 0; t < totalSteps; t++) {
    const step = steps[t];
    const pct = ((t / totalSteps) * 100).toFixed(2);
    const B = step.body.length;
    const tailPos = step.body[B - 1];
    const x = tailPos.x * (CELL_SIZE + CELL_GAP);
    const y = tailPos.y * (CELL_SIZE + CELL_GAP);
    const angle = tailAngles[t];
    const scale = tailAnimation
      ? (0.8 + Math.sin(t * 0.2) * 0.05).toFixed(2)
      : "0.8";
    tailFrames += `    ${pct}% { transform: translate(${x}px, ${y}px) rotate(${angle}deg) scale(${scale}); }\n`;
  }
  cssKeyframes += `
  @keyframes tail-motion {
${tailFrames}
  }`;

  // 3. Body Segments Keyframes (Indices 1 to maxBodyLength-2)
  for (let j = 1; j < maxBodyLength - 1; j++) {
    let segmentFrames = "";
    const segIndex = j - 1;
    for (let t = 0; t < totalSteps; t++) {
      const step = steps[t];
      const pct = ((t / totalSteps) * 100).toFixed(2);
      const isActive = j < step.body.length - 1;

      if (isActive) {
        const segPos = step.body[j];
        const x = segPos.x * (CELL_SIZE + CELL_GAP);
        const y = segPos.y * (CELL_SIZE + CELL_GAP);
        // Add subtle wave motion if configured
        const dy = waveMotion ? (Math.sin(t * 0.3 + j) * 0.5).toFixed(2) : "0";
        segmentFrames += `    ${pct}% { transform: translate(${x}px, calc(${y}px + ${dy}px)); opacity: 1; }\n`;
      } else {
        segmentFrames += `    ${pct}% { opacity: 0; }\n`;
      }
    }
    cssKeyframes += `
  @keyframes segment-${segIndex}-motion {
${segmentFrames}
  }`;
  }

  // 4. Food Position and Pulsing Keyframes
  let foodFrames = "";
  for (let t = 0; t < totalSteps; t++) {
    const step = steps[t];
    const pct = ((t / totalSteps) * 100).toFixed(2);
    if (step.foodTarget) {
      const x = step.foodTarget.x * (CELL_SIZE + CELL_GAP);
      const y = step.foodTarget.y * (CELL_SIZE + CELL_GAP);
      // Food pulsing
      const scale = (1.0 + Math.sin(t * 0.4) * 0.15).toFixed(2);
      foodFrames += `    ${pct}% { transform: translate(${x}px, ${y}px) scale(${scale}); opacity: 1; }\n`;
    } else {
      foodFrames += `    ${pct}% { opacity: 0; }\n`;
    }
  }
  cssKeyframes += `
  @keyframes food-motion {
${foodFrames}
  }`;

  // 5. Eaten Cells Keyframes
  // Track each cell coordinate and write a keyframe rule if it was eaten
  const eatenMap = new Map<string, number>(); // 'x,y' -> stepIndex when eaten
  for (const event of result.eatenEvents) {
    eatenMap.set(`${event.x},${event.y}`, event.stepIndex);
  }

  let cellStyleRules = "";
  for (const [key, stepIdx] of eatenMap.entries()) {
    const [cx, cy] = key.split(",").map(Number);
    const startPct = ((stepIdx / totalSteps) * 100).toFixed(2);
    const endPct = (((stepIdx + 1) / totalSteps) * 100).toFixed(2);

    // We animate cell fading from its level color to L0 (empty)
    const cellClass = `cell-anim-${cx}-${cy}`;
    const cellDay = data.weeks[cx]?.[cy];
    const originalColor = cellDay
      ? getLevelColor(cellDay.contributionCount, colors)
      : colors.emptyCell;

    cssKeyframes += `
  @keyframes cell-fade-${cx}-${cy} {
    0%, ${startPct}% { fill: ${originalColor}; }
    ${endPct}%, 100% { fill: ${colors.emptyCell}; }
  }`;

    cellStyleRules += `
    .${cellClass} {
      animation: cell-fade-${cx}-${cy} ${animDuration}s steps(1) infinite;
    }`;
  }

  // 6. Particle Burst Keyframes (if enabled)
  let particlesSVG = "";
  let particleStyleRules = "";
  if (particleEffects && result.eatenEvents.length > 0) {
    result.eatenEvents.forEach((event, k) => {
      const px = event.x * (CELL_SIZE + CELL_GAP) + CELL_SIZE / 2;
      const py = event.y * (CELL_SIZE + CELL_GAP) + CELL_SIZE / 2;
      const startPct = ((event.stepIndex / totalSteps) * 100).toFixed(2);
      const endPct = (((event.stepIndex + 4) / totalSteps) * 100).toFixed(2); // lasts 4 steps

      // Create 3 particles per eat event going in different directions
      const particleDirs = [
        { dx: -6, dy: -6 },
        { dx: 6, dy: -6 },
        { dx: 0, dy: 8 },
      ];

      particleDirs.forEach((dir, pIdx) => {
        const particleClass = `p-${k}-${pIdx}`;
        particlesSVG += `<circle class="${particleClass}" r="1" fill="${colors.sparkle}" />`;

        cssKeyframes += `
  @keyframes p-anim-${k}-${pIdx} {
    0%, ${startPct}% { transform: translate(${px}px, ${py}px); opacity: 0; }
    ${(((event.stepIndex + 0.1) / totalSteps) * 100).toFixed(2)}% { opacity: 1; }
    ${endPct}%, 100% { transform: translate(${px + dir.dx}px, ${py + dir.dy}px); opacity: 0; }
  }`;

        particleStyleRules += `
    .${particleClass} {
      transform-origin: center;
      animation: p-anim-${k}-${pIdx} ${animDuration}s linear infinite;
    }`;
      });
    });
  }

  // Helper helper to get colors based on level
  function getLevelColor(count: number, c: ThemeColors): string {
    if (count === 0) return c.emptyCell;
    if (count <= 2) return c.level1;
    if (count <= 5) return c.level2;
    if (count <= 9) return c.level3;
    return c.level4;
  }

  // Render static grid cells
  let gridSVG = "";
  for (let x = 0; x < BOARD_WIDTH; x++) {
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      const col = data.weeks[x];
      const day = col ? col[y] : null;
      const count = day ? day.contributionCount : 0;
      const cx = x * (CELL_SIZE + CELL_GAP);
      const cy = y * (CELL_SIZE + CELL_GAP);

      const hasAnimation = eatenMap.has(`${x},${y}`);
      const color = getLevelColor(count, colors);
      const className = hasAnimation ? `cell-anim-${x}-${y}` : "";

      gridSVG += `<rect x="${cx}" y="${cy}" width="${CELL_SIZE}" height="${CELL_SIZE}" rx="2" fill="${color}" ${
        className ? `class="${className}"` : ""
      } />\n      `;
    }
  }

  // Render body segments SVG structure
  let bodySegmentsSVG = "";
  let bodySegmentStyles = "";
  for (let j = 1; j < maxBodyLength - 1; j++) {
    const idx = j - 1;
    bodySegmentsSVG += `
      <g id="snake-segment-${idx}" class="snake-segment-${idx}">
        ${skin.renderBodySegment(j, colors)}
      </g>`;

    bodySegmentStyles += `
    #snake-segment-${idx} {
      animation: segment-${idx}-motion ${animDuration}s linear infinite;
    }`;
  }

  // Eye blinking animation
  let eyeBlinkCSS = "";
  if (eyeBlinking) {
    cssKeyframes += `
  @keyframes eye-blink {
    0%, 90%, 100% { transform: scaleY(1); }
    95% { transform: scaleY(0.1); }
  }`;
    eyeBlinkCSS = `
    #snake-head circle, #snake-head ellipse {
      transform-origin: 5px 5px;
      animation: eye-blink 4s ease-in-out infinite;
    }`;
  }

  // SVGs filters for Glow effects
  const glowFilter =
    foodGlow && colors.glow
      ? `
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>`
      : "";

  const foodGlowAttribute =
    foodGlow && colors.glow ? 'filter="url(#glow)"' : "";

  // Legend levels
  const legendX = CARD_WIDTH - 15 - 5 * 12 - 35;
  const legendY = CARD_HEIGHT - 20;

  // Build the complete SVG output
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" width="100%" height="100%">
  <defs>
    <!-- Background Card Gradient -->
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.background}" />
      <stop offset="100%" stop-color="${adjustBrightness(colors.background, -15)}" />
    </linearGradient>
    ${glowFilter}
  </defs>

  <style>
    /* Card Styles */
    .card-bg {
      fill: url(#bg-grad);
      stroke: ${colors.gridLine || adjustBrightness(colors.background, 20)};
      stroke-width: 1.5px;
      rx: 8px;
    }
    .card-title {
      font-family: 'Outfit', 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
      font-size: 14px;
      font-weight: 700;
      fill: ${adjustBrightness(colors.level4, 40)};
    }
    .card-subtitle {
      font-family: 'Outfit', 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
      font-size: 10px;
      font-weight: 500;
      fill: ${colors.level2};
      opacity: 0.8;
    }
    .legend-text {
      font-family: 'Segoe UI', -apple-system, sans-serif;
      font-size: 9px;
      fill: ${colors.level2};
      opacity: 0.7;
    }

    /* Animation CSS */
    #snake-head {
      transform-origin: 5px 5px;
      animation: head-motion ${animDuration}s linear infinite;
    }
    #snake-tail {
      transform-origin: 5px 5px;
      animation: tail-motion ${animDuration}s linear infinite;
    }
    #food-item {
      transform-origin: 5px 5px;
      animation: food-motion ${animDuration}s linear infinite;
    }
    
    ${bodySegmentStyles}
    ${cellStyleRules}
    ${particleStyleRules}
    ${eyeBlinkCSS}
    ${cssKeyframes}
  </style>

  <!-- Card Background -->
  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" class="card-bg" />

  <!-- Header Section -->
  <g transform="translate(15, 20)">
    <!-- Logo / Brand -->
    <text x="0" y="8" class="card-title">GitSnake Pro</text>
    <text x="0" y="22" class="card-subtitle">@${data.username} • ${data.totalContributions.toLocaleString()} Contributions</text>
  </g>

  <!-- Main Contribution Board -->
  <g transform="translate(${GRID_X}, ${GRID_Y})">
    <!-- Grid Cells -->
    <g id="contribution-grid">
      ${gridSVG}
    </g>

    <!-- Animated Food -->
    <g id="food-item" ${foodGlowAttribute}>
      ${skin.renderFood(colors)}
    </g>

    <!-- Particles -->
    <g id="particles" style="pointer-events: none;">
      ${particlesSVG}
    </g>

    <!-- Snake Group -->
    <g id="snake">
      <!-- Body Segments -->
      ${bodySegmentsSVG}

      <!-- Tail -->
      <g id="snake-tail">
        ${skin.renderTail(colors)}
      </g>

      <!-- Head -->
      <g id="snake-head" ${foodGlowAttribute}>
        ${skin.renderHead(colors)}
      </g>
    </g>
  </g>

  <!-- Footer Legend -->
  <g transform="translate(${legendX}, ${legendY})">
    <text x="-25" y="8" class="legend-text">Less</text>
    <rect x="5" y="0" width="10" height="10" rx="1.5" fill="${colors.emptyCell}" />
    <rect x="17" y="0" width="10" height="10" rx="1.5" fill="${colors.level1}" />
    <rect x="29" y="0" width="10" height="10" rx="1.5" fill="${colors.level2}" />
    <rect x="41" y="0" width="10" height="10" rx="1.5" fill="${colors.level3}" />
    <rect x="53" y="0" width="10" height="10" rx="1.5" fill="${colors.level4}" />
    <text x="68" y="8" class="legend-text">More</text>
  </g>
</svg>`;
}

/**
 * Adjusts color brightness (hex string) for dynamic shadows, lines, borders
 */
export function adjustBrightness(hex: string, percent: number): string {
  // Simple check for hex
  if (!hex.startsWith("#")) return hex;

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
