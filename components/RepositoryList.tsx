import Image from 'next/image';

import { getRepositoryList } from '@/app/api/github';
import { Pagination } from './Pagination';
import { BodySmall, Subtitle_02 } from './Typography';
import Link from 'next/link';
import CommitList from './CommitList';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

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
    <section className='my-2'>
      {repositoryList.data.map((repo, index) => {
        return (
          <div className='flex flex-col my-4' key={index + 10}>
            <Disclosure as='div' defaultOpen={false}>
              <DisclosureButton className='group flex w-full items-center justify-between'>
                <div className='w-max flex flex-row items-center justify-between my-1'>
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
                <ChevronDownIcon className='size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180' />
              </DisclosureButton>
              <DisclosurePanel className='mt-2'>
                <CommitList
                  committer={githubId}
                  author={repo.owner.login}
                  repositoryName={repo.name}
                />
              </DisclosurePanel>
            </Disclosure>
          </div>
        );
      })}
      <Pagination
        className='mt-4 mb-12 mx-auto'
        currentPage={page}
        totalPages={repositoryList.data.length <= 0 ? page : page + 1}
      />
    </section>
  );
}
