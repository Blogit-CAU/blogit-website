import React from 'react';
import { RepositoryList } from '@/components/RepositoryList';

export default async function PostPage({
    searchParams
}: {
    searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { githubId } = searchParams as { [key: string]: string };

  return (
    <>
      <div className='w-full flex'>
        <div className='w-1/2 ml-7'>
            <h2>{`${githubId}님의 Commit`}</h2>
            <RepositoryList githubId={githubId || ''} />
        </div>
        <div className='w-1/2 mr-7'>

        </div>
      </div>
    </>
  );
}