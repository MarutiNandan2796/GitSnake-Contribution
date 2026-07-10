import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  fetchGitHubContributions,
  generateMockContributions,
} from "../api/github.js";
import { Board } from "../engine/board.js";
import { SnakeEngine } from "../engine/snake.js";
import { generateSnakeSVG } from "../svg/generator.js";
import { convertSVGToPNG } from "../utils/canvas.js";
import { Logger } from "../utils/logger.js";
import { ThemeColors } from "../themes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve public dashboard files
app.use(express.static(path.join(__dirname, "../../public")));

/**
 * Common generator handler that runs the simulation and generates SVG
 */
async function generateSnakeFromRequest(
  req: express.Request,
): Promise<{ svg: string; username: string }> {
  const username = (req.query.user as string) || "octocat";
  const theme = (req.query.theme as string) || "classic-dark";
  const skin = (req.query.skin as string) || "classic";
  const speed = parseInt(req.query.speed as string, 10) || 120;

  // Options
  const tailAnimation = req.query.tailAnimation !== "false";
  const foodGlow = req.query.foodGlow !== "false";
  const particleEffects = req.query.particleEffects !== "false";
  const eyeBlinking = req.query.eyeBlinking !== "false";
  const waveMotion = req.query.waveMotion !== "false";

  // Custom colors override support
  let customTheme: Partial<ThemeColors> | undefined = undefined;
  if (req.query.custom === "true") {
    customTheme = {};
    if (req.query.bg) customTheme.background = `#${req.query.bg}`;
    if (req.query.grid) customTheme.gridLine = `#${req.query.grid}`;
    if (req.query.empty) customTheme.emptyCell = `#${req.query.empty}`;
    if (req.query.l1) customTheme.level1 = `#${req.query.l1}`;
    if (req.query.l2) customTheme.level2 = `#${req.query.l2}`;
    if (req.query.l3) customTheme.level3 = `#${req.query.l3}`;
    if (req.query.l4) customTheme.level4 = `#${req.query.l4}`;
    if (req.query.head) customTheme.snakeHead = `#${req.query.head}`;
    if (req.query.body) customTheme.snakeBody = `#${req.query.body}`;
    if (req.query.eyes) customTheme.snakeEyes = `#${req.query.eyes}`;
    if (req.query.tongue) customTheme.snakeTongue = `#${req.query.tongue}`;
    if (req.query.food) customTheme.food = `#${req.query.food}`;
    if (req.query.sparkle) customTheme.sparkle = `#${req.query.sparkle}`;
    if (req.query.glow) customTheme.glow = `#${req.query.glow}`;
  }

  let contributionData;

  // Try real API, fallback to mock if token missing or API errors
  try {
    const token = process.env.GITHUB_TOKEN;
    if (token && username !== "mock-user") {
      contributionData = await fetchGitHubContributions(username, token);
    } else {
      contributionData = generateMockContributions(username);
    }
  } catch (error: any) {
    Logger.warn(
      `API fetch failed for "${username}". Falling back to mock data. Reason: ${error.message}`,
    );
    contributionData = generateMockContributions(username);
  }

  // Simulation
  const board = new Board(contributionData.weeks);
  const engine = new SnakeEngine(board, {
    initialLength: 4,
    maxLength: 8,
    maxSteps: 400,
  });

  const simulationResult = engine.run();

  // Generate SVG
  const svg = generateSnakeSVG(
    contributionData,
    simulationResult,
    theme,
    skin,
    {
      speed,
      tailAnimation,
      foodGlow,
      particleEffects,
      eyeBlinking,
      waveMotion,
      customTheme,
    },
  );

  return { svg, username };
}

/**
 * GET /api/data
 * Returns the raw contribution calendar data in JSON format.
 */
app.get("/api/data", async (req, res) => {
  try {
    const username = (req.query.user as string) || "octocat";
    let contributionData;

    try {
      const token = process.env.GITHUB_TOKEN;
      if (token && username !== "mock-user") {
        contributionData = await fetchGitHubContributions(username, token);
      } else {
        contributionData = generateMockContributions(username);
      }
    } catch (error: any) {
      Logger.warn(
        `API fetch failed for "${username}" in /api/data. Falling back to mock data. Reason: ${error.message}`,
      );
      contributionData = generateMockContributions(username);
    }

    return res.json(contributionData);
  } catch (error: any) {
    Logger.error("Error fetching contribution data JSON", error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/preview
 * Returns the SVG image directly. Used for hotlinking in profile READMEs.
 */
app.get("/api/preview", async (req, res) => {
  try {
    const { svg } = await generateSnakeFromRequest(req);
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    return res.send(svg);
  } catch (error: any) {
    Logger.error("Error generating preview SVG", error);
    return res.status(500)
      .send(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="100">
      <text x="10" y="30" fill="red" font-family="sans-serif">Error: ${error.message}</text>
    </svg>`);
  }
});

/**
 * GET /api/download
 * Triggers attachment download of the SVG or static PNG.
 */
app.get("/api/download", async (req, res) => {
  try {
    const format = req.query.format === "png" ? "png" : "svg";
    const { svg, username } = await generateSnakeFromRequest(req);

    if (format === "png") {
      const pngBuffer = convertSVGToPNG(svg);
      res.setHeader("Content-Type", "image/png");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${username}-snake.png"`,
      );
      return res.send(pngBuffer);
    } else {
      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${username}-snake.svg"`,
      );
      return res.send(svg);
    }
  } catch (error: any) {
    Logger.error("Error handling download request", error);
    return res.status(500).send(`Failed to download: ${error.message}`);
  }
});

// Start Express server
app.listen(PORT, () => {
  Logger.success(`GitSnake Pro Server is running at http://localhost:${PORT}`);
});
