import { RepositoryList } from '@/components/RepositoryList';
import { Headline_00 } from '@/components/Typography';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { CommitDetailList } from '@/components/CommitDetailList';

export default async function PostPage({
  searchParams,
}: {
  searchParams: {
    githubId?: string;
    page?: string;
  };
}) {
  return (
    <>
      <div className='w-full flex gap-4'>
        <div className='w-1/2 ml-7'>
          <Headline_00>{`${searchParams.githubId}님의 Commit`}</Headline_00>
          <RepositoryList
            githubId={searchParams.githubId || ''}
            page={Number(searchParams.page) || 1}
          />
        </div>
        <div className='w-1/2 mr-7'>
          <CommitDetailList />
        </div>
      </div>
    </>
  );
}
