'use server';

import { Octokit } from 'octokit';
import { Endpoints } from '@octokit/types';

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});

export type CommitListPayload =
  Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][number];

export async function getCommitList(
  committer: string,
  owner: string,
  repositoryName: string,
  page: number,
) {
  const pageSize = 10;
  const res = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    headers: {
      accept: 'application/vnd.github+json',
    },
    committer: committer,
    owner: owner,
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
