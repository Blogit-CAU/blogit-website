'use server';

import { Octokit } from 'octokit';
import { Endpoints } from '@octokit/types';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export type CommitListPayload =
  Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][number];

export async function getCommitList(
  committer: string,
  owner: string,
  repositoryName: string,
  page: number,
  isInfinite?: boolean,
) {
  const pageSize = 5;
  let res = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    headers: {
      accept: 'application/vnd.github+json',
    },
    committer: committer,
    owner: owner,
    repo: repositoryName,
    per_page: pageSize,
    page: page,
  });

  if (isInfinite) {
    let temp = res.data;
    res.data = [];

    for (let i = 1; i < page; i++) {
      let next = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        headers: {
          accept: 'application/vnd.github+json',
        },
        committer: committer,
        owner: owner,
        repo: repositoryName,
        per_page: pageSize,
        page: i,
      });

      res.data = res.data.concat(next.data);
    }

    res.data = res.data.concat(temp);
  }

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

export async function getCommit(
  owner: string,
  repositoryName: string,
  ref: string,
) {
  const pageSize = 100;
  const res = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
    mediaType: {
      format: 'diff',
    },
    owner: owner,
    repo: repositoryName,
    ref: ref,
    per_page: pageSize,
  });

  return res;
}

export async function searchUser(keyword: string) {
  const pageSize = 5;

  const res = await octokit.request('GET /search/users', {
    headers: {
      accept: 'application/vnd.github+json',
    },
    q: keyword,
    per_page: pageSize,
  });

  return res;
}

export async function getUser(username: string) {
  const res = await octokit.request(`GET /users/${username}`, {
    headers: {
      accept: 'application/vnd.github+json',
    },
  });

  return res;
}
