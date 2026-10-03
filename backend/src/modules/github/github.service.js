const GITHUB_API = "https://api.github.com";

const githubHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2026-03-10",
};

const getGithubProfile = async (username) => {
  const response = await fetch(
    `${GITHUB_API}/users/${encodeURIComponent(username)}`,
    {
      headers: githubHeaders,
    },
  );

  if (response.status === 404) {
    throw new Error("GitHub user not found");
  }

  if (!response.ok) {
  const errorData = await response.text();
  console.error(
    "GitHub Profile Error:",
    response.status,
    errorData,
  );
  throw new Error("Failed to fetch GitHub profile");
}

  return response.json();
};

const getGithubRepositories = async (username) => {
  const response = await fetch(
    `${GITHUB_API}/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=100`,
    {
      headers: githubHeaders,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repositories");
  }

  return response.json();
};



const transformRepository = (repo) => ({
  githubId: repo.id,
  title: repo.name,
  description: repo.description || "",
  technologies: repo.language ? [repo.language] : [],
  githubUrl: repo.html_url,
  projectUrl: repo.homepage || "",
  stars: repo.stargazers_count,
  forks: repo.forks_count,
  topics: repo.topics || [],
  isFork: repo.fork,
  updatedAt: repo.updated_at,
});

const getGithubData = async (username) => {
  const [profile, repositories] = await Promise.all([
    getGithubProfile(username),
    getGithubRepositories(username),
  ]);

    const languageStats = {};

for (const repo of repositories) {
  if (repo.fork || repo.archived || !repo.language) continue;

  languageStats[repo.language] =
    (languageStats[repo.language] || 0) + 1;
}

  return {
  profile: {
    username: profile.login,
    name: profile.name,
    avatar: profile.avatar_url,
    bio: profile.bio,
    location: profile.location,
    githubUrl: profile.html_url,
    publicRepos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
  },

  languageStats,

  repositories: repositories
    .filter((repo) => !repo.fork && !repo.archived)
    .map(transformRepository),
};


};

export default {
  getGithubProfile,
  getGithubRepositories,
  getGithubData,
};