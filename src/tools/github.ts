import axios from "axios";
const username = "Hicham-BelHoucin";
const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});

export async function getGithubData() {
  try {
    const { data } = await axiosInstance.get(`/users/${username}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getGithubRepos() {
  try {
    const { data } = await axiosInstance.get(`/users/${username}/repos`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getGithubRepo(repoName: string) {
  try {
    const { data } = await axiosInstance.get(`/repos/${username}/${repoName}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getGithubRepoLanguages(repoName: string) {
  try {
    const { data } = await axiosInstance.get(
      `/repos/${username}/${repoName}/languages`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getGitHubContributionData() {
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
        (week: {
          contributionDays: { date: string; contributionCount: number }[];
        }) =>
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
