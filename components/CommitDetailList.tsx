'use client';

import { useCommitStore } from '@/store';
import React, { Suspense, useEffect } from 'react';
import CommitItem from './CommitItem';
import { Textarea } from '@headlessui/react';
import { CommitDetail } from './CommitDetail';

export function CommitDetailList() {
  const commits = useCommitStore((state) => state.commits);

  return (
    <div className='mb-10 flex flex-col gap-4'>
      {commits.map((commit, index) => {
        return (
          <div key={index + 19}>
            <CommitItem commit={commit} key={index + 8} />
            <CommitDetail commitSha={commit.payload.sha} />
          </div>
        );
      })}
    </div>
  );
}
