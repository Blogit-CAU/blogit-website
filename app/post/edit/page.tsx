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
  const sayings = ['글을 잘써야지 잘삽니다', 'say2', 'say3', 'say4', 'say5'];
  const sayIcons = ['💌', '💡', '👀', '❤️', '👍', '✌️', '💕'];
  //각 배열의 길이안에서 난수 생성하고 그거 띄우기

  return (
    <div className='flex gap-3 w-[70%] px-10 py-5 bg-slate-100 rounded-2xl'>
      <div>{sayIcons[0]}</div>
      <p className=' text-slate-600'>{sayings[0]}</p>
    </div>
  );
};
