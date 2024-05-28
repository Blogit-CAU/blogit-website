'use client';

import { getCommitList } from '@/api/github';
import { Endpoints } from '@octokit/types';

import { BodySmall } from './Typography';
import CommitItem from './CommitItem';
import { useEffect, useState } from 'react';
import { InfiniteScrollProvider } from './InfiniteScrollProvider';

export default function CommitList({
  committer,
  author,
  repositoryName,
}: {
  committer: string;
  author: string;
  repositoryName: string;
}) {
  const [page, setPage] = useState<number>(1);
  const [commitList, setCommitList] =
    useState<Endpoints['GET /repos/{owner}/{repo}/commits']['response']>();

  useEffect(() => {
    const fetchList = async () => {
      setCommitList(
        await getCommitList(committer, author, repositoryName, 1, true),
      );
    };

    fetchList();
  }, []);

  if (!commitList || commitList.status !== 200 || commitList.data.length <= 0) {
    return <BodySmall>{'Commit 목록이 없습니다.'}</BodySmall>;
  }

  const handleLoading = async () => {
    const prevSize = commitList.data.length;

    const nextPage = page + 1;
    setPage(nextPage);
    const nextList = await getCommitList(
      committer,
      author,
      repositoryName,
      nextPage,
      true,
    );

    if (prevSize >= nextList.data.length) {
      return;
    }

    setCommitList(nextList);
  };

  return (
    <InfiniteScrollProvider onLoadMore={handleLoading}>
      {commitList.data.map((commit, index) => {
        return (
          <CommitItem
            key={index + 11}
            commit={{
              owner: author,
              repo: repositoryName,
              payload: commit,
              diff: '',
            }}
          />
        );
      })}
    </InfiniteScrollProvider>
  );
}
