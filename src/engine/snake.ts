import { Board, Cell } from "./board.js";
import { Point, aStarPath, getSurvivalMove } from "./pathfinding.js";

export interface SnakeStep {
  stepIndex: number;
  head: Point;
  body: Point[];
  direction: "right" | "left" | "down" | "up";
  foodTarget: Point | null;
  eatenCell: Point | null; // Cell eaten in this step, if any
}

export interface SimulationResult {
  steps: SnakeStep[];
  eatenEvents: { x: number; y: number; stepIndex: number }[];
  totalSteps: number;
  allContributionsEaten: boolean;
}

export interface SnakeConfig {
  initialLength?: number;
  maxLength?: number;
  maxSteps?: number;
}

export class SnakeEngine {
  private board: Board;
  private body: Point[] = [];
  private initialLength: number;
  private maxLength: number;
  private maxSteps: number;

  constructor(board: Board, config: SnakeConfig = {}) {
    this.board = board;
    this.initialLength = config.initialLength || 4;
    this.maxLength = config.maxLength || 8;
    this.maxSteps = config.maxSteps || 400;

    this.reset();
  }

  private reset(): void {
    this.body = [];
    // Start snake at (0,0) extending to the left if possible, or downwards.
    // Since (0,0) is top-left, we can place the head at (0,0) and initial body segments stacked or starting at (0,0).
    // To make it look nice, we start the head at (0,3) and body trailing to the left (0,2), (0,1), (0,0)
    // or start head at (3,0) trailing to (2,0), (1,0), (0,0).
    // Let's start the head at (3,0) and body trailing to the left:
    for (let i = 0; i < this.initialLength; i++) {
      this.body.push({ x: this.initialLength - 1 - i, y: 0 });
    }
  }

  /**
   * Runs the complete simulation of the snake eating contributions.
   * Returns step-by-step history of coordinates.
   */
  public run(): SimulationResult {
    this.reset();
    this.board.reset();

    const steps: SnakeStep[] = [];
    const eatenEvents: { x: number; y: number; stepIndex: number }[] = [];
    let stepCount = 0;

    // Track food target
    let currentFoodCell: Cell | null = null;
    let randomTarget: Point | null = null;

    // Get initial direction
    let lastDirection: "right" | "left" | "down" | "up" = "right";

    while (stepCount < this.maxSteps) {
      const head = this.body[0];
      const remainingContributions = this.board.getRemainingContributions();

      // Determine target food
      if (remainingContributions.length > 0) {
        randomTarget = null;
        // If we don't have a food target or it was eaten, pick the closest one
        if (!currentFoodCell || currentFoodCell.visited) {
          let closestCell = remainingContributions[0];
          let minDist = Infinity;

          for (const cell of remainingContributions) {
            const dist = Math.abs(cell.x - head.x) + Math.abs(cell.y - head.y);
            if (dist < minDist) {
              minDist = dist;
              closestCell = cell;
            }
          }
          currentFoodCell = closestCell;
          currentFoodCell.isFood = true;
        }
      } else {
        currentFoodCell = null;
        // Cruise mode: if all food is eaten, target a random point to wander around
        if (
          !randomTarget ||
          (head.x === randomTarget.x && head.y === randomTarget.y)
        ) {
          randomTarget = {
            x: Math.floor(Math.random() * this.board.width),
            y: Math.floor(Math.random() * this.board.height),
          };
        }
      }

      const target = currentFoodCell
        ? (currentFoodCell as Point)
        : (randomTarget as Point);

      // Find path to target
      let path = aStarPath(head, target, this.board, this.body);
      let nextMove: Point | null = null;

      if (path && path.length > 0) {
        nextMove = path[0];
      } else {
        // If no path to target, attempt survival move
        nextMove = getSurvivalMove(head, this.board, this.body);
      }

      // If absolutely no move is possible, the snake is trapped and dies
      if (!nextMove) {
        break;
      }

      // Determine movement direction
      const dx = nextMove.x - head.x;
      const dy = nextMove.y - head.y;
      let direction: "right" | "left" | "down" | "up" = lastDirection;

      if (dx > 0) direction = "right";
      else if (dx < 0) direction = "left";
      else if (dy > 0) direction = "down";
      else if (dy < 0) direction = "up";

      lastDirection = direction;

      // Check if we are eating a contribution cell
      const targetCell = this.board.getCell(nextMove.x, nextMove.y);
      let eatenCell: Point | null = null;
      let grow = false;

      if (targetCell && targetCell.count > 0 && !targetCell.visited) {
        targetCell.visited = true;
        targetCell.isFood = false;
        eatenCell = { x: targetCell.x, y: targetCell.y };
        eatenEvents.push({
          x: targetCell.x,
          y: targetCell.y,
          stepIndex: stepCount,
        });
        grow = this.body.length < this.maxLength;
      }

      // Move snake
      this.body.unshift(nextMove);
      if (!grow) {
        this.body.pop();
      }

      // Record step
      steps.push({
        stepIndex: stepCount,
        head: { ...nextMove },
        body: this.body.map((p) => ({ ...p })),
        direction,
        foodTarget: currentFoodCell
          ? { x: currentFoodCell.x, y: currentFoodCell.y }
          : null,
        eatenCell,
      });

      stepCount++;

      // If we are in cruise mode and just hit a random target, reset it
      if (
        !currentFoodCell &&
        randomTarget &&
        head.x === randomTarget.x &&
        head.y === randomTarget.y
      ) {
        randomTarget = null;
      }

      // Break early if all contributions are eaten and we have cruised a bit (e.g. at least 30 cruise steps)
      if (
        remainingContributions.length === 0 &&
        stepCount > steps.length + 30
      ) {
        // Add a few more steps to make the ending transition smooth
        break;
      }
    }

    return {
      steps,
      eatenEvents,
      totalSteps: steps.length,
      allContributionsEaten:
        this.board.getRemainingContributions().length === 0,
    };
  }
}
