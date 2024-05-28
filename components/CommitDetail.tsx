'use client';

import React, { useEffect, useState } from 'react';
import CommitItem from './CommitItem';
import { Textarea } from '@headlessui/react';
import { useCommitStore, type Commit } from '@/store';
import { getCommit } from '@/app/api/github';
import classNames from 'classnames';

export function CommitDetail({ commitSha }: { commitSha: string }) {
  const commitStore = useCommitStore();
  const commit = commitStore.commits.find(
    (value) => value.payload.sha === commitSha,
  );

  useEffect(() => {
    async function init() {
      if (commit) {
        const commitDetail = await getCommit(
          commit.owner,
          commit.repo,
          commit.payload.sha,
        );
        commitStore.update(commitSha, {
          ...commit,
          diff: commitDetail.data as unknown as string,
        });
      }
    }
    init();
  }, [commit && commit.payload.sha]);

  return (
    <>
      <Textarea
        className={classNames(
          'mt-3 block w-full resize-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black',
          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
        )}
        value={commit?.diff}
        onChange={(e) => {
          if (commit) {
            commitStore.update(commitSha, { ...commit, diff: e.target.value });
          }
        }}
        rows={10}
      />
    </>
  );
}
