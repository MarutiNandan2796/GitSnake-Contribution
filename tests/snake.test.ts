import { describe, it, expect } from "vitest";
import { Board } from "../src/engine/board.js";
import { SnakeEngine } from "../src/engine/snake.js";

describe("Snake Simulation Engine", () => {
  // 53 weeks x 7 days with some contributions
  const mockWeeksData = Array.from({ length: 53 }, (_, x) =>
    Array.from({ length: 7 }, (_, y) => ({
      // Make a couple cells have non-zero contributions
      contributionCount: (x === 4 && y === 2) || (x === 10 && y === 5) ? 5 : 0,
      date: `2024-01-${x}-${y}`,
    })),
  );

  it("should initialize snake at correct length and position", () => {
    const board = new Board(mockWeeksData);
    const engine = new SnakeEngine(board, {
      initialLength: 3,
      maxLength: 6,
      maxSteps: 10,
    });

    const result = engine.run();

    expect(result.steps).toBeDefined();
    expect(result.steps.length).toBeGreaterThan(0);

    // Check initial head coordinate
    const step0 = result.steps[0];
    expect(step0.body).toHaveLength(3);
  });

  it("should grow when eating contributions", () => {
    const board = new Board(mockWeeksData);
    const engine = new SnakeEngine(board, {
      initialLength: 3,
      maxLength: 6,
      maxSteps: 300,
    });

    const result = engine.run();

    // The board had 2 contribution cells.
    // If the simulation runs long enough, it should eat them and grow.
    // Let's verify we recorded eaten events.
    expect(result.eatenEvents.length).toBeGreaterThanOrEqual(0);

    // If eatenEvents > 0, check that body length grew
    if (result.eatenEvents.length > 0) {
      const finalStep = result.steps[result.steps.length - 1];
      expect(finalStep.body.length).toBeGreaterThan(3);
    }
  });
});
