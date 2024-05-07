'use client';

import { Button } from '@/components/Button';
import MyPostList from '@/components/MyPost';
import { Pagination } from '@/components/Pagination';
import { usePostStore } from '@/store/post';
import Link from 'next/link';
import React, { Suspense, useEffect } from 'react';

export default function PostSharedPage() {
  const postStore = usePostStore();

  function handleDownload() {
    const fileName = 'mypost.md';
    const fileContent = postStore.post;

    const element = document.createElement('a');
    const file = new Blob([fileContent], { type: 'text/plain' });
    window.open(URL.createObjectURL(file), 'post_download');
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-10'>
      <div className='flex justify-center gap-3 w-full '>
        <section className='p-10 border rounded-xl w-[35%] '>
          <MyPostList />
        </section>
        <section className='p-10 border rounded-xl w-[35%]'>
          <h1 className='text-[2rem]'>글 업로드 하기</h1>
          <p>링크를 클릭해보세요!</p>
          <div className='flex flex-col'>
            <a
              href='https://www.tistory.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Tistory
            </a>
            <a
              href='https://velog.io/'
              target='_blank'
              rel='noopener noreferrer'
            >
              velog
            </a>
            <a
              href='https://www.notion.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Notion
            </a>
            <a
              href='https://section.blog.naver.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Naver Blog
            </a>
          </div>
        </section>
      </div>
      <section className='flex flex-col gap-4'>
        <h1>이런 글을 써보는 건 어때요?</h1>
        //지피티에게 주제 받아오기
        <ul className='flex gap-4'>
          <li>theme1</li>
          <li>theme2</li>
          <li>theme3</li>
          <li>theme4</li>
        </ul>
      </section>
      <Button
        size='L'
        backgroundColor='#95afa8'
        className='h-10 my-1'
        onClick={handleDownload}
      >
        {'글 다운로드 하기'}
      </Button>
      <Link href={'/'}>
        <Button size='L' backgroundColor='#74AA9C' className='h-10'>
          {'다시 글 작성하기'}
        </Button>
      </Link>
    </main>
  );
}
