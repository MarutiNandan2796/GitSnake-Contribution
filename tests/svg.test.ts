import { describe, it, expect } from "vitest";
import { generateMockContributions } from "../src/api/github.js";
import { Board } from "../src/engine/board.js";
import { SnakeEngine } from "../src/engine/snake.js";
import { generateSnakeSVG } from "../src/svg/generator.js";

describe("SVG Generation & Visual Themes", () => {
  it("should generate SVG markup with CSS animations", () => {
    const contributionData = generateMockContributions("mockuser");
    const board = new Board(contributionData.weeks);
    const engine = new SnakeEngine(board, {
      initialLength: 4,
      maxLength: 8,
      maxSteps: 50,
    });
    const result = engine.run();

    const svg = generateSnakeSVG(contributionData, result, "matrix", "dragon", {
      speed: 100,
      tailAnimation: true,
      foodGlow: true,
      particleEffects: true,
    });

    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain("<style>");
    expect(svg).toContain("@keyframes head-motion");
    expect(svg).toContain("@keyframes tail-motion");
    expect(svg).toContain("@keyframes food-motion");

    // Check theme colors injected
    expect(svg).toContain("#39ff14"); // Matrix neon green
    expect(svg).toContain("#000802"); // Matrix background

    // Check dragon skin structures injected
    expect(svg).toContain("<!-- Dragon Head -->");
    expect(svg).toContain("<!-- Spikes on scales -->");
  });
});
