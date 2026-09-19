import { Octokit } from '@octokit/rest';

// Only create octokit if token exists
const octokit = process.env.GITHUB_TOKEN
  ? new Octokit({ auth: process.env.GITHUB_TOKEN })
  : null;

const USERNAME = process.env.GITHUB_USERNAME || 'swapnil-890';

export interface Commit {
  sha: string;
  message: string;
  repo: string;
  date: string;
  url: string;
}

export interface RepoStats {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  lastPush: string;
  url: string;
}

export async function getRecentCommits(limit = 5): Promise<Commit[]> {
  if (!octokit) return [];

  try {
    const { data } = await octokit.activity.listPublicEventsForUser({
      username: USERNAME,
      per_page: 50,
    });

    const commits: Commit[] = [];

    for (const event of data) {
      const payload = event.payload as any;
      if (event.type === 'PushEvent' && payload && Array.isArray(payload.commits)) {
        for (const commit of payload.commits) {
          commits.push({
            sha: (commit.sha || '').substring(0, 7),
            message: (commit.message || '').split('\n')[0],
            repo: event.repo.name,
            date: event.created_at || new Date().toISOString(),
            url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          });

          if (commits.length >= limit) {
            return commits;
          }
        }
      }
    }

    return commits;
  } catch (error) {
    console.error('Error fetching GitHub commits:', error);
    return [];
  }
}

export async function getRepoStats(repoName: string): Promise<RepoStats | null> {
  if (!octokit) return null;

  try {
    const owner = USERNAME;
    const name = repoName.includes('/') ? repoName.split('/')[1] : repoName;
    
    const { data } = await octokit.repos.get({
      owner,
      repo: name,
    });

    return {
      name: data.name,
      description: data.description || '',
      language: data.language || '',
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      lastPush: data.pushed_at || '',
      url: data.html_url,
    };
  } catch (error) {
    console.error(`Error fetching stats for repo ${repoName}:`, error);
    return null;
  }
}

export async function getRepoLanguages(repoName: string): Promise<Record<string, number>> {
  if (!octokit) return {};

  try {
    const owner = USERNAME;
    const name = repoName.includes('/') ? repoName.split('/')[1] : repoName;

    const { data } = await octokit.repos.listLanguages({
      owner,
      repo: name,
    });

    return data;
  } catch (error) {
    console.error(`Error fetching languages for repo ${repoName}:`, error);
    return {};
  }
}
