import Image from 'next/image';

import { getRepositoryList } from '@/api/github';
import { Pagination } from './Pagination';

export async function RepositoryList({
  githubId,
  page,
}: {
  githubId: string;
  page: number;
}) {
  const repositoryList = await getRepositoryList(githubId, page);

  if (repositoryList.status !== 200) {
    return <div>Error</div>;
  }

  return (
    <section>
      {repositoryList.data.map((repo, index) => {
        return (
          <div
            className='w-max flex flex-row items-center justify-between'
            key={index + 10}
          >
            <Image
              className='rounded-full'
              width={64}
              height={64}
              src={repo.owner.avatar_url}
              alt='repo_image'
            ></Image>
            <div className='w-24 ml-4'>{repo.owner.login}</div>
            <div className='ml-1'>{repo.name}</div>
          </div>
        );
      })}
      <Pagination
        className='mt-4'
        currentPage={page}
        totalPages={repositoryList.data.length <= 0 ? page : page + 1}
      />
    </section>
  );
}
