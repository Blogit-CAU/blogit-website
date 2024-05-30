'use client';

import { useCommitStore } from '@/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const Home = () => {
  const router = useRouter();
  //const [gitLink, setGitLink] = useState<string>('');
  const linkInput = useRef<HTMLInputElement>(null);
  const commitStore = useCommitStore();

  function handleSubmit() {
    commitStore.clear();
    const next = linkInput.current!.value;
    //setGitLink(next);
    router.push(`/post?githubId=${next}`);
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
        <input
          type='text'
          placeholder='Github ID를 입력해주세요!'
          ref={linkInput}
          className='w-[30%] border border-gray-400 rounded-xl p-3 focus:outline-0 placeholder:pl-2'
        ></input>
        <button
          onClick={handleSubmit}
          className='w-12 border border-gray-400 rounded-xl'
        >
          GO
        </button>
      </div>
    </main>
  );
};

export default Home;
