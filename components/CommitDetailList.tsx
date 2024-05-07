'use client';

import { useCommitStore } from '@/store';
import React, { Suspense, useEffect } from 'react';
import CommitItem from './CommitItem';
import { Textarea } from '@headlessui/react';
import { CommitDetail } from './CommitDetail';
import Link from 'next/link';
import { Button } from './Button';
import { useRouter } from 'next/navigation';

export function CommitDetailList() {
  const router = useRouter();
  const commits = useCommitStore((state) => state.commits);

  return (
    <>
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
      <Button
        disabled={commits.length <= 0}
        className='w-full h-11'
        size='None'
        backgroundColor='#74AA9C'
        onClick={() => {
          router.push('/post/edit');
        }}
      >
        {'글 작성하기'}
      </Button>
    </>
  );
}
