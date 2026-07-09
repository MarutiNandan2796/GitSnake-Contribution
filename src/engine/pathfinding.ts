import { Board } from "./board.js";

export interface Point {
  x: number;
  y: number;
}

/**
 * Returns string representation of a point for Map hashing
 */
function toKey(p: Point): string {
  return `${p.x},${p.y}`;
}

/**
 * Manhattan distance heuristic for A*
 */
function manhattanDistance(p1: Point, p2: Point): number {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

/**
 * Checks if a point is within board boundaries
 */
function isValid(p: Point, board: Board): boolean {
  return p.x >= 0 && p.x < board.width && p.y >= 0 && p.y < board.height;
}

/**
 * Checks if a point is occupied by the snake's body
 */
function isOccupied(p: Point, body: Point[]): boolean {
  // We check if the point matches any segment in the snake's body
  return body.some((segment) => segment.x === p.x && segment.y === p.y);
}

const DIRECTIONS = [
  { x: 1, y: 0 }, // Right
  { x: -1, y: 0 }, // Left
  { x: 0, y: 1 }, // Down
  { x: 0, y: -1 }, // Up
];

/**
 * BFS Pathfinding: finds the shortest path to target
 */
export function bfsPath(
  start: Point,
  target: Point,
  board: Board,
  body: Point[],
): Point[] | null {
  const queue: { point: Point; path: Point[] }[] = [{ point: start, path: [] }];
  const visited = new Set<string>([toKey(start)]);

  // Treat snake body (except tail tip) as obstacles
  // The tail tip will move in the next step, so we don't treat it as an obstacle
  const obstacles = body.slice(0, -1);

  while (queue.length > 0) {
    const { point, path } = queue.shift()!;

    if (point.x === target.x && point.y === target.y) {
      return path;
    }

    for (const dir of DIRECTIONS) {
      const neighbor = { x: point.x + dir.x, y: point.y + dir.y };
      const key = toKey(neighbor);

      if (
        isValid(neighbor, board) &&
        !visited.has(key) &&
        (!isOccupied(neighbor, obstacles) ||
          (neighbor.x === target.x && neighbor.y === target.y))
      ) {
        visited.add(key);
        queue.push({ point: neighbor, path: [...path, neighbor] });
      }
    }
  }

  return null;
}

/**
 * A* Pathfinding: uses Manhattan distance heuristic
 */
export function aStarPath(
  start: Point,
  target: Point,
  board: Board,
  body: Point[],
): Point[] | null {
  const startKey = toKey(start);
  const openSet: Point[] = [start];
  const cameFrom = new Map<string, Point>();

  const gScore = new Map<string, number>();
  gScore.set(startKey, 0);

  const fScore = new Map<string, number>();
  fScore.set(startKey, manhattanDistance(start, target));

  // Treat snake body except tail tip as obstacles
  const obstacles = body.slice(0, -1);

  while (openSet.length > 0) {
    // Get element in openSet with lowest fScore
    let currentIdx = 0;
    for (let i = 1; i < openSet.length; i++) {
      const scoreI = fScore.get(toKey(openSet[i])) ?? Infinity;
      const scoreCurrent = fScore.get(toKey(openSet[currentIdx])) ?? Infinity;
      if (scoreI < scoreCurrent) {
        currentIdx = i;
      }
    }

    const current = openSet[currentIdx];
    if (current.x === target.x && current.y === target.y) {
      // Reconstruct path
      const path: Point[] = [];
      let temp = current;
      while (cameFrom.has(toKey(temp))) {
        path.push(temp);
        temp = cameFrom.get(toKey(temp))!;
      }
      return path.reverse();
    }

    // Remove current from openSet
    openSet.splice(currentIdx, 1);

    for (const dir of DIRECTIONS) {
      const neighbor = { x: current.x + dir.x, y: current.y + dir.y };
      if (!isValid(neighbor, board)) continue;

      // Allow neighbor to be the target even if it coincides with tail tip
      const isTarget = neighbor.x === target.x && neighbor.y === target.y;
      if (isOccupied(neighbor, obstacles) && !isTarget) continue;

      const neighborKey = toKey(neighbor);
      
      // Calculate turn penalty to avoid robotic zigzags and make movement look human-played
      let turnPenalty = 0;
      const prev = cameFrom.get(toKey(current));
      if (prev) {
        const dxIn = current.x - prev.x;
        const dyIn = current.y - prev.y;
        const dxOut = neighbor.x - current.x;
        const dyOut = neighbor.y - current.y;
        
        if (dxIn !== dxOut || dyIn !== dyOut) {
          turnPenalty = 1.5; // Add 1.5 step cost penalty for turning
        }
      }

      const tentativeGScore = (gScore.get(toKey(current)) ?? Infinity) + 1 + turnPenalty;

      if (tentativeGScore < (gScore.get(neighborKey) ?? Infinity)) {
        cameFrom.set(neighborKey, current);
        gScore.set(neighborKey, tentativeGScore);
        fScore.set(
          neighborKey,
          tentativeGScore + manhattanDistance(neighbor, target),
        );

        if (!openSet.some((p) => p.x === neighbor.x && p.y === neighbor.y)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  // Fallback to BFS
  return bfsPath(start, target, board, body);
}

/**
 * Flood Fill: counts how many empty cells are reachable from a starting point.
 * Used for survival heuristic when trapped.
 */
export function countReachableSpace(
  start: Point,
  board: Board,
  body: Point[],
): number {
  if (!isValid(start, board) || isOccupied(start, body)) {
    return 0;
  }

  const queue: Point[] = [start];
  const visited = new Set<string>([toKey(start)]);
  let count = 0;

  while (queue.length > 0) {
    const current = queue.shift()!;
    count++;

    for (const dir of DIRECTIONS) {
      const neighbor = { x: current.x + dir.x, y: current.y + dir.y };
      const key = toKey(neighbor);

      if (
        isValid(neighbor, board) &&
        !visited.has(key) &&
        !isOccupied(neighbor, body)
      ) {
        visited.add(key);
        queue.push(neighbor);
      }
    }
  }

  return count;
}

/**
 * Survival Heuristic: chooses the best single move direction when trapped
 */
export function getSurvivalMove(
  start: Point,
  board: Board,
  body: Point[],
): Point | null {
  let bestMove: Point | null = null;
  let maxSpace = -1;

  // 1. Try to follow the tail tip if we can find a path to it
  if (body.length > 1) {
    const tail = body[body.length - 1];
    const path = bfsPath(start, tail, board, body);
    if (path && path.length > 0) {
      return path[0];
    }
  }

  // 2. Otherwise, check all valid neighbors and choose the one with the maximum reachable space
  for (const dir of DIRECTIONS) {
    const neighbor = { x: start.x + dir.x, y: start.y + dir.y };
    if (isValid(neighbor, board) && !isOccupied(neighbor, body)) {
      const space = countReachableSpace(neighbor, board, body);
      if (space > maxSpace) {
        maxSpace = space;
        bestMove = neighbor;
      }
    }
  }

  return bestMove;
}
