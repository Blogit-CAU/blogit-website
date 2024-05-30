'use client';

import React from 'react';
import { BodyMedium, LabelSmall } from './Typography';
import { Commit, useCommitStore } from '@/store';

export default function CommitItem({ commit }: { commit: Commit }) {
  const commitStore = useCommitStore();
  const isExist = commitStore.commits.find(
    (value) => value.payload.sha === commit.payload.sha,
  );

  const selectedClasses = isExist ? 'bg-gray-200' : '';

  const handleClick = () => {
    if (isExist) {
      commitStore.remove(commit.payload.sha);
    } else {
      commitStore.add(commit);
    }
  };

  return (
    <div
      className={`flex flex-col w-full p-2 hover:bg-gray-300 ${selectedClasses} cursor-pointer`}
      onClick={() => handleClick()}
    >
      <BodyMedium>{commit.payload.commit.message}</BodyMedium>
      <div className='flex'>
        <LabelSmall className='text-gray-500'>
          {commit.payload.committer?.login}
        </LabelSmall>
        <LabelSmall className='text-gray-500 ml-2'>
          {new Intl.DateTimeFormat('ko-KR', {
            dateStyle: 'full',
            timeStyle: 'medium',
          }).format(
            new Date(commit.payload.commit.committer?.date || '1990-01-01'),
          )}
        </LabelSmall>
      </div>
    </div>
  );
}
