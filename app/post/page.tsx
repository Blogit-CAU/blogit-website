import { RepositoryList } from '@/components/RepositoryList';
import { Pagination } from '@/components/Pagination';
import { Headline_00 } from '@/components/Typography';
import { Button } from '@/components/Button';
import Link from 'next/link';

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
      <div className='w-full flex'>
        <div className='w-1/2 ml-7'>
          <Headline_00>{`${searchParams.githubId}님의 Commit`}</Headline_00>
          <RepositoryList
            githubId={searchParams.githubId || ''}
            page={Number(searchParams.page) || 1}
          />
        </div>
        <div className='w-1/2 mr-7'>
          <Link href={'/post/edit'}>
            <Button size='XL' backgroundColor='#74AA9C'>
              {'글 작성하기'}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
