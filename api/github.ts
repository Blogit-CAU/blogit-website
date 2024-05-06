'use server';

import { Octokit } from 'octokit';

const octokit = new Octokit({});

export async function getCommitList(
  userId: string,
  repositoryName: string,
  page: number,
) {
  const pageSize = 10;
  const res = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    headers: {
      accept: 'application/vnd.github+json',
    },
    owner: userId,
    repo: repositoryName,
    per_page: pageSize,
    page: page,
  });

  return res;
}

export async function getRepositoryList(userId: string, page: number) {
  const pageSize = 10;
  const res = await octokit.request('GET /users/{username}/repos', {
    headers: {
      accept: 'application/vnd.github+json',
    },
    username: userId,
    type: 'all',
    sort: 'updated',
    direction: 'desc',
    per_page: pageSize,
    page: page,
  });

  return res;
}
