export interface Cell {
  x: number; // Column index (0..52)
  y: number; // Row index (0..6)
  count: number;
  level: number; // 0..4
  visited: boolean;
  isFood: boolean;
  date: string;
}

export class Board {
  public readonly width = 53;
  public readonly height = 7;
  public grid: Cell[][] = [];

  constructor(weeksData: { contributionCount: number; date: string }[][]) {
    this.initialize(weeksData);
  }

  private initialize(
    weeksData: { contributionCount: number; date: string }[][],
  ): void {
    this.grid = [];
    // Ensure we have exactly 53 weeks
    const weeksToUse = weeksData.slice(0, this.width);

    for (let x = 0; x < this.width; x++) {
      const col: Cell[] = [];
      const week = weeksToUse[x] || [];

      for (let y = 0; y < this.height; y++) {
        const day = week[y];
        const count = day ? day.contributionCount : 0;
        const date = day ? day.date : "";

        // Standard GitHub color levels based on count
        let level = 0;
        if (count > 0) {
          if (count <= 2) level = 1;
          else if (count <= 5) level = 2;
          else if (count <= 9) level = 3;
          else level = 4;
        }

        col.push({
          x,
          y,
          count,
          level,
          visited: false,
          isFood: false,
          date,
        });
      }
      this.grid.push(col);
    }
  }

  public getCell(x: number, y: number): Cell | null {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return null;
    }
    return this.grid[x][y];
  }

  /**
   * Retrieves all unvisited cells that contain contributions (eligible to be eaten)
   */
  public getRemainingContributions(): Cell[] {
    const cells: Cell[] = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const cell = this.grid[x][y];
        if (cell.count > 0 && !cell.visited) {
          cells.push(cell);
        }
      }
    }
    return cells;
  }

  /**
   * Resets visited flags for all cells
   */
  public reset(): void {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.grid[x][y].visited = false;
        this.grid[x][y].isFood = false;
      }
    }
  }
}
