import TextEditor from '@/components/TextEditor';
import React, { Suspense } from 'react';

export default async function PostEditPage() {
  return (
    <div className='flex flex-col justify-center items-center h-[100vh] gap-4'>
      <h1 className='text-[2rem]'>직접 수정하기</h1>
      <TipForWriting />
      <div className='w-[70%] m-10'>
        <TextEditor />
      </div>
    </div>
  );
}

const TipForWriting: React.FC = () => {
  return <div>ddkjdkfj</div>;
};
