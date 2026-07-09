import { describe, it, expect } from "vitest";
import { generateMockContributions } from "../src/api/github.js";

describe("GitHub Contribution Fetcher & Mock Generator", () => {
  it("should generate a valid 53-week, 7-day contribution matrix", () => {
    const data = generateMockContributions("testuser");

    expect(data.username).toBe("testuser");
    expect(data.weeks).toHaveLength(53);

    // Check that each week contains exactly 7 days
    data.weeks.forEach((week) => {
      expect(week).toHaveLength(7);

      week.forEach((day) => {
        expect(day).toHaveProperty("date");
        expect(day).toHaveProperty("contributionCount");
        expect(day).toHaveProperty("color");
        expect(day).toHaveProperty("weekday");
        expect(day.weekday).toBeGreaterThanOrEqual(0);
        expect(day.weekday).toBeLessThanOrEqual(6);
      });
    });
  });

  it("should calculate totalContributions matching the sum of days", () => {
    const data = generateMockContributions("dummy");
    let sum = 0;

    for (const week of data.weeks) {
      for (const day of week) {
        sum += day.contributionCount;
      }
    }

    expect(data.totalContributions).toBe(sum);
  });
});
