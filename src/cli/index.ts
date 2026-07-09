import "dotenv/config";
import fs from "fs";
import path from "path";
import {
  fetchGitHubContributions,
  generateMockContributions,
} from "../api/github.js";
import { Board } from "../engine/board.js";
import { SnakeEngine } from "../engine/snake.js";
import { generateSnakeSVG } from "../svg/generator.js";
import { convertSVGToPNG } from "../utils/canvas.js";
import { Logger } from "../utils/logger.js";
import { isValidTheme } from "../themes/index.js";
import { isValidSkin } from "../svg/skins.js";

function printHelp(): void {
  console.log(`
GitSnake Pro CLI - Generate Custom Animated GitHub Contribution Snakes

Usage:
  npm run generate -- --user <username> [options]

Options:
  --user <name>       GitHub username (required)
  --theme <theme>     Theme name: classic-light, classic-dark, matrix, cyberpunk, neon, ocean, sakura, fire, galaxy
  --skin <skin>       Snake skin: classic, dragon, robot, pacman, ghost, fox, cat, dinosaur (default: classic)
  --speed <number>    Step duration in milliseconds (default: 120)
  --dark              Force dark theme (classic-dark)
  --light             Force light theme (classic-light)
  --png               Also export static PNG version of the graph
  --out <path>        Output SVG filename or directory (default: current directory)
  --help, -h          Print this help message
  `);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    process.exit(0);
  }

  // Parse arguments
  let username = "";
  let themeInput = "";
  let skinInput = "classic";
  let speedInput = 120;
  let forceDark = false;
  let forceLight = false;
  let exportPng = false;
  let outPath = ".";

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--user" && args[i + 1]) {
      username = args[++i];
    } else if (arg === "--theme" && args[i + 1]) {
      themeInput = args[++i];
    } else if (arg === "--skin" && args[i + 1]) {
      skinInput = args[++i];
    } else if (arg === "--speed" && args[i + 1]) {
      const parsed = parseInt(args[++i], 10);
      if (!isNaN(parsed)) speedInput = parsed;
    } else if (arg === "--dark") {
      forceDark = true;
    } else if (arg === "--light") {
      forceLight = true;
    } else if (arg === "--png") {
      exportPng = true;
    } else if (arg === "--out" && args[i + 1]) {
      outPath = args[++i];
    }
  }

  if (!username) {
    Logger.error("Missing required argument: --user <username>");
    printHelp();
    process.exit(1);
  }

  // Validation
  if (themeInput && !isValidTheme(themeInput)) {
    Logger.warn(`Invalid theme "${themeInput}". Falling back to default.`);
  }

  if (!isValidSkin(skinInput)) {
    Logger.warn(`Invalid skin "${skinInput}". Falling back to "classic".`);
    skinInput = "classic";
  }

  // Determine theme
  let themeName = themeInput || "classic-dark";
  if (forceDark) themeName = "classic-dark";
  if (forceLight) themeName = "classic-light";

  Logger.info(`Starting GitSnake Pro generation for user: ${username}`);
  Logger.info(
    `Theme: ${themeName}, Skin: ${skinInput}, Step speed: ${speedInput}ms`,
  );

  let contributionData;

  // Try fetching real contributions, fallback to mock if token is missing or request fails
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      Logger.warn(
        "GITHUB_TOKEN not found. Generating mock contributions for demonstration.",
      );
      contributionData = generateMockContributions(username);
    } else {
      Logger.info("Fetching contribution calendar from GitHub API...");
      contributionData = await fetchGitHubContributions(username, token);
      Logger.success(
        `Successfully fetched contributions! Total: ${contributionData.totalContributions}`,
      );
    }
  } catch (error: any) {
    Logger.error(
      "Failed to fetch from GitHub API. Falling back to realistic mock contributions.",
      error.message,
    );
    contributionData = generateMockContributions(username);
  }

  // Run the simulation
  Logger.info("Running snake simulation...");
  const board = new Board(contributionData.weeks);
  const engine = new SnakeEngine(board, {
    initialLength: 4,
    maxLength: 8,
    maxSteps: 400,
  });

  const simulationResult = engine.run();
  Logger.info(
    `Simulation complete. Steps run: ${simulationResult.totalSteps}. Eaten contributions: ${simulationResult.eatenEvents.length}`,
  );

  // Generate SVG content
  Logger.info("Generating SVG animation card...");
  const svgContent = generateSnakeSVG(
    contributionData,
    simulationResult,
    themeName,
    skinInput,
    {
      speed: speedInput,
    },
  );

  // Calculate destination path
  let finalSvgPath = outPath;
  if (fs.existsSync(outPath) && fs.lstatSync(outPath).isDirectory()) {
    finalSvgPath = path.join(outPath, "github-snake.svg");
  }

  // Write SVG file
  try {
    fs.mkdirSync(path.dirname(finalSvgPath), { recursive: true });
    fs.writeFileSync(finalSvgPath, svgContent);
    Logger.success(`SVG generated and saved to: ${finalSvgPath}`);

    // If no specific theme was forced, let's also generate a dark version automatically if outputting to directory
    if (!themeInput && !forceDark && !forceLight && outPath === ".") {
      const darkSvgContent = generateSnakeSVG(
        contributionData,
        simulationResult,
        "classic-dark",
        skinInput,
        {
          speed: speedInput,
        },
      );
      const darkSvgPath = path.join(
        path.dirname(finalSvgPath),
        "github-snake-dark.svg",
      );
      fs.writeFileSync(darkSvgPath, darkSvgContent);
      Logger.success(`Dark theme SVG generated and saved to: ${darkSvgPath}`);

      if (exportPng) {
        const darkPngBuffer = convertSVGToPNG(darkSvgContent);
        const darkPngPath = path.join(
          path.dirname(finalSvgPath),
          "github-snake-dark.png",
        );
        fs.writeFileSync(darkPngPath, darkPngBuffer);
        Logger.success(`Dark theme static PNG saved to: ${darkPngPath}`);
      }
    }

    // Export PNG if requested
    if (exportPng) {
      const finalPngPath = finalSvgPath.replace(".svg", ".png");
      Logger.info("Rendering SVG to static PNG...");
      const pngBuffer = convertSVGToPNG(svgContent);
      fs.writeFileSync(finalPngPath, pngBuffer);
      Logger.success(`Static PNG saved to: ${finalPngPath}`);
    }
  } catch (err: any) {
    Logger.error("Failed to write output files.", err);
    process.exit(1);
  }
}

main().catch((err) => {
  Logger.error("Fatal error in CLI process.", err);
  process.exit(1);
});
