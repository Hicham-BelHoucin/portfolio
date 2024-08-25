interface ProfileInfo {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

async function getProfileInfo(username: string): Promise<ProfileInfo> {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  return data;
}

async function getUserRepos(username: string): Promise<Repository[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const repos: Repository[] = await response.json();
  return repos;
}

interface Repository {
  name: string;
  html_url: string;
  languages_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
}

async function getPinnedRepos(
  username: string,
  repoNames: string[]
): Promise<Repository[]> {
  const promises = repoNames.map((repo) =>
    fetch(`https://api.github.com/repos/${username}/${repo}`).then((res) =>
      res.json()
    )
  );
  return await Promise.all(promises);
}

interface GitHubStats {
  stars: number;
  forks: number;
  reposCount: number;
}

async function getGitHubStats(username: string): Promise<GitHubStats> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const repos: Repository[] = await response.json();

  const stats = repos.reduce(
    (acc, repo) => {
      acc.stars += repo.stargazers_count;
      acc.forks += repo.forks_count;
      return acc;
    },
    { stars: 0, forks: 0, reposCount: repos.length }
  );

  return stats;
}

interface GitHubEvent {
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
}

async function getLatestContributions(
  username: string
): Promise<GitHubEvent[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/events`
  );
  const events: GitHubEvent[] = await response.json();
  return events.filter((event) => event.type === "PushEvent").slice(0, 5);
}

interface LanguageBreakdown {
  [language: string]: number;
}

async function getLanguageBreakdown(
  username: string
): Promise<LanguageBreakdown> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const repos: Repository[] = await response.json();

  const languages: LanguageBreakdown = {};
  for (const repo of repos) {
    const langResponse = await fetch(repo.languages_url);
    const repoLanguages: LanguageBreakdown = await langResponse.json();

    for (const [language, lines] of Object.entries(repoLanguages)) {
      languages[language] = (languages[language] || 0) + lines;
    }
  }

  return languages;
}

async function getGitHubCalendarHeatmap(username: string): Promise<string> {
  const response = await fetch(
    `https://github.com/users/${username}/contributions`
  );
  const text = await response.text();
  return text;
}

interface StarredRepository extends Repository {}

async function getRecentStars(username: string): Promise<StarredRepository[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/starred`
  );
  const stars: StarredRepository[] = await response.json();
  return stars.slice(0, 5);
}

const username = "your-github-username";

(async function () {
  const profileInfo = await getProfileInfo(username);
  const pinnedRepos = await getPinnedRepos(username, ["repo1", "repo2"]);
  const githubStats = await getGitHubStats(username);
  const latestContributions = await getLatestContributions(username);
  const languageBreakdown = await getLanguageBreakdown(username);
  const githubHeatmap = await getGitHubCalendarHeatmap(username);
  const recentStars = await getRecentStars(username);

  // format all this data and write it to a file caaled data.json
  const fs = require("fs");
  const path = require("path");

  const data = {
    profileInfo,
    pinnedRepos,
    githubStats,
    latestContributions,
    languageBreakdown,
    githubHeatmap,
    recentStars,
  };

  const filePath = path.join(__dirname, "data.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

  console.log(`Data written to ${filePath}`);
})();

export {
  getProfileInfo,
  getPinnedRepos,
  getGitHubStats,
  getLatestContributions,
  getLanguageBreakdown,
  getGitHubCalendarHeatmap,
  getRecentStars,
};
