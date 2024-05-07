import { getCommitList } from '@/api/github';
import React from 'react';
import { BodyMedium, LabelSmall } from './Typography';
import CommitItem from './CommitItem';

export default async function CommitList({
  committer,
  author,
  repositoryName,
}: {
  committer: string;
  author: string;
  repositoryName: string;
}) {
  const commitList = await getCommitList(committer, author, repositoryName, 1);

  if (commitList.status !== 200) {
    return <div>Error</div>;
  }

  return (
    <>
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
    </>
  );
}
