import { describe, it, expect } from "vitest";
import { Board } from "../src/engine/board.js";
import {
  bfsPath,
  aStarPath,
  getSurvivalMove,
  Point,
} from "../src/engine/pathfinding.js";

describe("Pathfinding Engine", () => {
  // Build a dummy grid of 53 weeks x 7 days filled with 0s
  const dummyWeeksData = Array.from({ length: 53 }, () =>
    Array.from({ length: 7 }, (_, i) => ({
      contributionCount: 0,
      date: `2024-01-0${i}`,
    })),
  );

  it("should find shortest path using BFS and A* when unobstructed", () => {
    const board = new Board(dummyWeeksData);
    const start: Point = { x: 0, y: 0 };
    const target: Point = { x: 3, y: 3 };
    const body: Point[] = [start];

    const pathBfs = bfsPath(start, target, board, body);
    const pathAStar = aStarPath(start, target, board, body);

    expect(pathBfs).not.toBeNull();
    expect(pathAStar).not.toBeNull();

    // Minimum steps for Manhattan distance is 3 + 3 = 6 moves
    expect(pathBfs!.length).toBe(6);
    expect(pathAStar!.length).toBe(6);

    // Check that target cell is reached at the end of path
    expect(pathBfs![pathBfs!.length - 1]).toEqual(target);
    expect(pathAStar![pathAStar!.length - 1]).toEqual(target);
  });

  it("should route around snake body segment obstacles", () => {
    const board = new Board(dummyWeeksData);
    const start: Point = { x: 0, y: 0 };
    const target: Point = { x: 2, y: 0 };

    // Place body segments blockading (1,0)
    // To go from (0,0) to (2,0), path must go down to (0,1) -> (1,1) -> (2,1) -> (2,0)
    const body: Point[] = [start, { x: 1, y: 0 }, { x: 1, y: 1 }];

    const path = aStarPath(start, target, board, body);
    expect(path).not.toBeNull();

    // Check that none of the coordinates in the returned path intersect the body obstacles
    const nonTailBody = body.slice(0, -1);
    path!.forEach((point) => {
      const isObstacle = nonTailBody.some(
        (b) => b.x === point.x && b.y === point.y,
      );
      expect(isObstacle).toBe(false);
    });
  });

  it("should determine survival move when target is unreachable", () => {
    const board = new Board(dummyWeeksData);
    const start: Point = { x: 0, y: 0 };
    // Trap the snake head (0,0) with body segment at (1,0) and tail at (0,1) (adjacent!)
    const body: Point[] = [
      start,
      { x: 1, y: 0 },
      { x: 0, y: 1 }, // Tail
    ];

    const survivalMove = getSurvivalMove(start, board, body);
    // Should choose the tail neighbor (0,1) since it's the tail tip
    expect(survivalMove).not.toBeNull();
    expect(survivalMove!.x).toBe(0);
    expect(survivalMove!.y).toBe(1);

    // Test with one opening (1,0) blocked by non-tail body, and (0,1) open
    const partialTrappedBody = [
      start,
      { x: 1, y: 0 }, // Body segment (obstacle)
      { x: 2, y: 0 }, // Tail segment
    ];

    const move = getSurvivalMove(start, board, partialTrappedBody);
    expect(move).not.toBeNull();
    expect(move!.x).toBe(0);
    expect(move!.y).toBe(1); // Should move down
  });
});
