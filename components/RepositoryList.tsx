import Image from 'next/image';

import { getRepositoryList } from '@/api/github';
import { Pagination } from './Pagination';
import { BodySmall, Subtitle_02 } from './Typography';
import Link from 'next/link';
import CommitList from './CommitList';

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
          <div className='flex flex-col' key={index + 10}>
            <div className='w-max flex flex-row items-center justify-between'>
              <Image
                className='rounded-full'
                width={56}
                height={56}
                src={repo.owner.avatar_url}
                alt='repo_image'
              ></Image>
              <Link
                href={repo.owner.html_url}
                rel='noopener noreferrer'
                target='_blank'
              >
                <Subtitle_02 className='w-24 ml-4'>
                  {repo.owner.login}
                </Subtitle_02>
              </Link>
              <Link
                href={repo.html_url}
                rel='noopener noreferrer'
                target='_blank'
              >
                <BodySmall className='ml-1'>{repo.name}</BodySmall>
              </Link>
            </div>
            <CommitList
              committer={githubId}
              author={repo.owner.login}
              repositoryName={repo.name}
            />
          </div>
        );
      })}
      <Pagination
        className='mt-4 mb-12'
        currentPage={page}
        totalPages={repositoryList.data.length <= 0 ? page : page + 1}
      />
    </section>
  );
}
