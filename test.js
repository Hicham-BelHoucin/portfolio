const fs = require("fs");
const path = require("path");
const axios = require("axios"); // Ensure axios is installed: npm install axios
const { JSDOM } = require("jsdom");

// Your GitHub API key
const GITHUB_API_KEY = "";

// Axios instance with GitHub API key
const axiosInstance = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Authorization: `token ${GITHUB_API_KEY}`,
  },
});

// Fetch profile information
async function getProfileInfo(username) {
  const response = await axiosInstance.get(`/users/${username}`);
  return response.data;
}

// Fetch pinned repositories
async function getPinnedRepos(username, repoNames) {
  const promises = repoNames.map((repo) =>
    axiosInstance.get(`/repos/${username}/${repo}`).then((res) => res.data)
  );
  return await Promise.all(promises);
}

// Fetch GitHub stats
async function getGitHubStats(username) {
  const response = await axiosInstance.get(`/users/${username}/repos`);
  const repos = response.data;

  return repos.reduce(
    (acc, repo) => {
      acc.stars += repo.stargazers_count;
      acc.forks += repo.forks_count;
      acc.reposCount = repos.length;
      return acc;
    },
    { stars: 0, forks: 0, reposCount: 0 }
  );
}

// Fetch latest contributions
async function getLatestContributions(username) {
  const response = await axiosInstance.get(`/users/${username}/events`);
  const events = response.data;
  return events.filter((event) => event.type === "PushEvent").slice(0, 5);
}

// Fetch language breakdown
async function getLanguageBreakdown(username) {
  const response = await axiosInstance.get(`/users/${username}/repos`);
  const repos = response.data;

  const languages = {};
  for (const repo of repos) {
    const langResponse = await axiosInstance.get(repo.languages_url);
    const repoLanguages = langResponse.data;

    for (const [language, lines] of Object.entries(repoLanguages)) {
      languages[language] = (languages[language] || 0) + lines;
    }
  }

  return languages;
}

async function getGitHubCalendarHeatmap(username, token) {
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axiosInstance.post(
      "https://api.github.com/graphql",
      { query }
    );

    const data =
      response.data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week) =>
          week.contributionDays.map((day) => ({
            date: day.date,
            count: day.contributionCount,
          }))
      );

    return data;
  } catch (error) {
    console.error("Error fetching GitHub contribution data:", error);
    return [];
  }
}

// Fetch recent starred repositories
async function getRecentStars(username) {
  const response = await axiosInstance.get(`/users/${username}/starred`);
  return response.data.slice(0, 5);
}

// fetch user achievements (trophies)
async function getAchievements(username) {
  const response = await axiosInstance.get(`/users/${username}/achievements`);
  return response.data;
}

const username = "Hicham-BelHoucin";

(async function () {
  //   const profileInfo = await getProfileInfo(username);
  //   const pinnedRepos = await getPinnedRepos(username, [
  //     "camping-app",
  //     "ft_transcendence",
  //   ]);
  //   const githubStats = await getGitHubStats(username);
  //   const latestContributions = await getLatestContributions(username);
  //   const languageBreakdown = await getLanguageBreakdown(username);
  //   const githubHeatmap = await getGitHubCalendarHeatmap(username);
  //   const recentStars = await getRecentStars(username);

  //   const data = {
  //     profileInfo,
  //     pinnedRepos,
  //     githubStats,
  //     latestContributions,
  //     languageBreakdown,
  //     githubHeatmap,
  //     recentStars,
  //   };

  //   const filePath = path.join(__dirname, "data.json");
  //   fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

  //   console.log(`Data written to ${filePath}`);

  const achievements = await getGitHubCalendarHeatmap(username);
  fs.writeFileSync(
    "heatmap.json",
    JSON.stringify(achievements, null, 2),
    "utf-8"
  );
  console.log(achievements);
})();
