import { Button } from '@/components/Button';
import MyPostList from '@/components/MyPost';
import { Pagination } from '@/components/Pagination';
import RecommTitle from '@/components/RecommTitle';
import { Headline_01 } from '@/components/Typography';
import Link from 'next/link';
import React, { Suspense, useEffect } from 'react';

export default async function PostSharedPage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-10'>
      <div className='flex justify-center gap-3 w-full '>
        <section className='p-6 border rounded-xl w-[35%] '>
          <Headline_01>{'내가 작성한 글'}</Headline_01>
          <MyPostList />
        </section>
        <section className='p-10 border rounded-xl w-[35%]'>
          <h1 className='text-[2rem] mb-2 text-[#74AA9C]'>Let's Blog-it!</h1>
          <p className='text-[#74AA9C]'>링크를 클릭해보세요!</p>
          <div className='grid grid-cols-2 items-center gap-3 pt-6 text-[1.5rem]'>
            <a
              href='https://section.blog.naver.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#44b25c] border border-[#80d492] rounded-2xl flex justify-center items-center p-1 hover:bg-[#e0f5e5] transition-all'
            >
              Naver Blog
            </a>
            <a
              href='https://www.tistory.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#eb531f] border border-[#e29177] rounded-2xl flex justify-center items-center p-1 hover:bg-orange-100 transition-all'
            >
              Tistory
            </a>
            <a
              href='https://www.notion.com/'
              target='_blank'
              rel='noopener noreferrer'
              className=' border border-slate-400 rounded-2xl flex justify-center items-center p-1 hover:bg-slate-100 transition-all'
            >
              Notion
            </a>
            <a
              href='https://velog.io/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#7aebb6] border border-[#7aebb6] rounded-2xl flex justify-center items-center p-1 hover:bg-green-100 transition-all'
            >
              Velog
            </a>
          </div>
        </section>
      </div>
      <section className='flex flex-col gap-4'>
        <RecommTitle />
      </section>

      <Link href={'/'}>
        <Button size='L' backgroundColor='#74AA9C' className='h-10'>
          {'다시 글 작성하기'}
        </Button>
      </Link>
    </main>
  );
}
