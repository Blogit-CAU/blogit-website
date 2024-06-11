'use client';

import { Commit, useCommitStore } from '@/store';
import React, { Suspense, useEffect, useState } from 'react';
import CommitItem from './CommitItem';
import { CommitDetail } from './CommitDetail';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { getModerations } from '@/app/api/openai';
import { papagoTranslation } from '@/app/api/naver-cloud';
import { BodyMedium, Headline_02, LabelLarge } from './Typography';
import {
  Description,
  Dialog,
} from '@headlessui/react';

export function CommitDetailList() {
  const maxLength = 5000;
  const router = useRouter();
  const commits = useCommitStore((state) => state.commits);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [harmCommit, setHarmCommit] = useState<Commit | null>(null);

  const handleSubmit = async () => {
    // Translate into English
    let translated: string[] = [];
    for (const value of commits) {
      const tran = await papagoTranslation(value.diff);
      translated.push(tran.message.result.translatedText);
    }
    process.env.NODE_ENV !== 'production' && console.log(translated);

    // Check moderation
    const res = await getModerations(translated);
    process.env.NODE_ENV !== 'production' && console.log(res);

    // Validate
    for (let i = 0; i < res.results.length; i++) {
      if (res.results[i].flagged) {
        setIsOpen(true);
        setHarmCommit(commits[i]);
        return;
      }
    }

    router.push('/post/edit');
  };

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
        disabled={
          commits.length <= 0 ||
          commits.reduce((acc, commit) => acc + commit.diff.length, 0) >
            maxLength ||
          isOpen
        }
        className='w-full h-11'
        size='None'
        backgroundColor='#74AA9C'
        onClick={handleSubmit}
      >
        {'글 작성하기'}
      </Button>
      <BodyMedium className='mt-4'>
        {`글자수 제한 : ${commits.reduce((acc, commit) => acc + commit.diff.length, 0)} / ${maxLength}`}
      </BodyMedium>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50'
      >
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
          <div className='max-w-lg space-y-4 border bg-white p-12'>
            <Headline_02 className='font-bold'>
              유해성이 감지되었습니다
            </Headline_02>
            <Description>
              아래의 Commit에 유해성이 감지되었습니다. 해당 내용을 확인하고 다시
              글을 생성해주세요.
            </Description>
            <LabelLarge>{`${harmCommit?.diff.substring(0, 50)}...`}</LabelLarge>
            <div className='flex gap-4'>
              <Button
                className='w-40'
                size='S'
                backgroundColor='#74AA9C'
                onClick={() => setIsOpen(false)}
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
