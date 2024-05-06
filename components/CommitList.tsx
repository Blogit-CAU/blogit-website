import { getCommitList } from '@/api/github';
import React from 'react';
import { BodyMedium, LabelSmall } from './Typography';

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
          <div
            key={index + 11}
            className='flex flex-col w-full p-2 hover:bg-gray-100'
          >
            <BodyMedium>{commit.commit.message}</BodyMedium>
            <div className='flex'>
              <LabelSmall className='text-gray-500'>
                {commit.committer?.login}
              </LabelSmall>
              <LabelSmall className='text-gray-500 ml-2'>
                {new Intl.DateTimeFormat('ko-KR', {
                  dateStyle: 'full',
                  timeStyle: 'medium',
                }).format(
                  new Date(commit.commit.committer?.date || '1990-01-01'),
                )}
              </LabelSmall>
            </div>
          </div>
        );
      })}
    </>
  );
}
