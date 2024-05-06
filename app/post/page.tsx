import { RepositoryList } from '@/components/RepositoryList';
import { Pagination } from '@/components/Pagination';

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
          <h2>{`${searchParams.githubId}님의 Commit`}</h2>
          <RepositoryList
            githubId={searchParams.githubId || ''}
            page={Number(searchParams.page) || 1}
          />
        </div>
        <div className='w-1/2 mr-7'></div>
      </div>
    </>
  );
}
