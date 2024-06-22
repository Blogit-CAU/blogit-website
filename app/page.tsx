'use client';

import { useCommitStore } from '@/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { getUser, searchUser } from './api/github';

import { Endpoints } from '@octokit/types';
import _ from 'lodash';
import { LabelLarge, LabelMedium } from '@/components/Typography';

const Home = () => {
  const router = useRouter();
  const linkInput = useRef<HTMLInputElement>(null);
  const commitStore = useCommitStore();

  const [query, setQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [queryResults, setQueryResults] = useState<
    Endpoints['GET /search/users']['response']['data']['items']
  >([]);

  // TODO Remove from React 19
  const debouncedSearch = useCallback(
    _.debounce(async (searchQuery: string) => {
      console.log('Searching for:', searchQuery);
      const res = await searchUser(searchQuery);
      setQueryResults(res.data.items);
    }, 300),
    [],
  );

  function handleItemClick(
    each: Endpoints['GET /search/users']['response']['data']['items'][0],
  ) {
    linkInput.current?.focus();
    setIsSearching(false);
    setQuery(each.login);
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;

    setQuery(next);

    if (next.length > 0) {
      debouncedSearch(next);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }

  async function handleSubmit() {
    commitStore.clear();

    try {
      await getUser(query);
    } catch (e) {
      alert('잘못된 유저 이름입니다. 다시 입력해주세요.');
      return;
    }

    router.push(`/post?githubId=${query}`);
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-20 pb-44'>
      <div>
        <h1 className='text-[5rem]'>BloGit</h1>
        <Image
          width={100}
          height={200}
          src={'/logo.svg'}
          alt='blogitLogo'
        ></Image>
      </div>
      <div className='w-full flex justify-center gap-2'>
        <div className='w-[50%] relative'>
          {isSearching && (
            <div className='w-full flex flex-col'>
              {queryResults.map((each, index) => {
                return (
                  <div
                    key={index}
                    className='flex flex-row gap-2 items-center py-2 hover:bg-gray-300 cursor-pointer'
                    onClick={(e) => handleItemClick(each)}
                  >
                    <Image
                      width={64}
                      height={64}
                      src={each.avatar_url}
                      alt='avatar'
                      className='rounded-full ml-2'
                    ></Image>
                    <LabelLarge>{each.login}</LabelLarge>
                  </div>
                );
              })}
            </div>
          )}
          <input
            type='text'
            placeholder='Github ID를 입력해주세요!'
            value={query}
            onChange={handleChange}
            className='w-full border border-gray-400 rounded-xl p-3 focus:outline-0 placeholder:pl-2'
          ></input>
        </div>
        <button
          onClick={handleSubmit}
          className='w-12 h-12 border border-gray-400 rounded-xl mt-auto'
        >
          GO
        </button>
      </div>
    </main>
  );
};

export default Home;
