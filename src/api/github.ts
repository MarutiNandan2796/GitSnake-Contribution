export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
  weekday: number; // 0 (Sunday) to 6 (Saturday)
}

export interface GitHubContributionData {
  username: string;
  totalContributions: number;
  weeks: ContributionDay[][];
}

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

const CONTRIBUTION_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetches contributions from the real GitHub GraphQL API
 */
export async function fetchGitHubContributions(
  username: string,
  token?: string,
): Promise<GitHubContributionData> {
  const apiToken = token || process.env.GITHUB_TOKEN;

  if (!apiToken) {
    throw new Error(
      "GitHub Access Token is required to fetch real data. Set the GITHUB_TOKEN environment variable or pass a token.",
    );
  }

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${apiToken}`,
      "User-Agent": "GitSnakePro-ContributionFetcher",
    },
    body: JSON.stringify({
      query: CONTRIBUTION_QUERY,
      variables: { login: username },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "No error body");
    throw new Error(
      `GitHub API request failed with status ${response.status}: ${errorBody}`,
    );
  }

  const result = (await response.json()) as any;

  if (result.errors && result.errors.length > 0) {
    throw new Error(
      `GitHub GraphQL errors: ${result.errors.map((e: any) => e.message).join(", ")}`,
    );
  }

  const user = result.data?.user;
  if (!user) {
    throw new Error(`GitHub User "${username}" not found.`);
  }

  const calendar = user.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    throw new Error(
      `Could not retrieve contribution calendar for user "${username}".`,
    );
  }

  const totalContributions = calendar.totalContributions;
  const weeksData = calendar.weeks || [];

  // Parse into our standard matrix representation
  const weeks: ContributionDay[][] = weeksData.map((week: any) => {
    return week.contributionDays.map((day: any) => ({
      date: day.date,
      contributionCount: day.contributionCount,
      color: day.color,
      weekday: day.weekday,
    }));
  });

  return {
    username,
    totalContributions,
    weeks,
  };
}

/**
 * Generates realistic mock contribution data for offline testing or when token is missing
 */
export function generateMockContributions(
  username: string,
): GitHubContributionData {
  const weeks: ContributionDay[][] = [];
  const totalWeeks = 53;
  const daysPerWeek = 7;
  let totalContributions = 0;

  // We start 1 year ago and go forward
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - totalWeeks * daysPerWeek);

  // Helper to determine weekday
  const currentDate = new Date(startDate);

  for (let w = 0; w < totalWeeks; w++) {
    const weekDays: ContributionDay[] = [];
    for (let d = 0; d < daysPerWeek; d++) {
      // Advance date
      const dateStr = currentDate.toISOString().split("T")[0];
      const weekday = currentDate.getDay();

      // Create a nice distribution of contributions
      // Use noise/sine-waves or random numbers to make it look like a natural contribution grid
      const r = Math.random();
      let count = 0;
      let color = "#ebedf0"; // default L0

      // Add weekend/weekday bias (developers commit less on weekends)
      const isWeekend = weekday === 0 || weekday === 6;
      const thresholdMultiplier = isWeekend ? 0.4 : 1.0;

      if (r < 0.6 * thresholdMultiplier) {
        count = 0;
        color = "#ebedf0";
      } else if (r < 0.8 * thresholdMultiplier) {
        count = Math.floor(Math.random() * 2) + 1; // 1-2
        color = "#9be9a8";
      } else if (r < 0.92 * thresholdMultiplier) {
        count = Math.floor(Math.random() * 3) + 3; // 3-5
        color = "#40c463";
      } else if (r < 0.98 * thresholdMultiplier) {
        count = Math.floor(Math.random() * 4) + 6; // 6-9
        color = "#30a14e";
      } else {
        count = Math.floor(Math.random() * 6) + 10; // 10-15
        color = "#216e39";
      }

      totalContributions += count;
      weekDays.push({
        date: dateStr,
        contributionCount: count,
        color,
        weekday,
      });

      // Next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(weekDays);
  }

  return {
    username,
    totalContributions,
    weeks,
  };
}
