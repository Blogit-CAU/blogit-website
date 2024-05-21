import TextEditor from '@/components/TextEditor';
import React, { Suspense } from 'react';

export default async function PostEditPage() {
  return (
    <div className='flex flex-col justify-center items-center h-full gap-4'>
      <h1 className='text-[2rem]'>직접 수정하기</h1>
      <TipForWriting />
      <div className='flex w-[70%] mt-4'>
        <input
          type='text'
          placeholder='아티클의 제목을 입력해주세요'
          className='border rounded-lg p-2 w-[20rem] focus:outline-none'
        />
      </div>

      <div className='w-[70%] h-[50%]'>
        <TextEditor />
      </div>
    </div>
  );
}

const TipForWriting: React.FC = () => {
  const sayings = [
    '자신이 떠올린 내용을 틈틈히 메모하는 습관은 글쓰기에 큰 도움이 돼요',
    '자신이 알고 깨달은 내용이면 무엇이든지 적어보아요',
    '내 인생의 절반은 고쳐 쓰는 작업을 위해 존재한다.\n-존 어빙',
    '다른 사람의 글과 비교하지 말아요 우리.',
    '글을 쓸 때 만큼은 솔직해져도 괜찮아요',
  ];
  const sayIcons = ['💌', '💡', '👀', '❤️', '👍', '✌️', '💕'];
  //각 배열의 길이안에서 난수 생성하고 그거 띄우기
  const randomSay = Math.floor(Math.random() * 5);
  const randomIcon = Math.floor(Math.random() * 5);

  return (
    <div className='flex items-center gap-3 w-[70%] px-10 py-5 bg-slate-100 rounded-2xl'>
      <p className=' text-slate-400 whitespace-nowrap'>글쓰기 tip!</p>
      <div>{sayIcons[randomIcon]}</div>
      <p className=' text-slate-600'>{sayings[randomSay]}</p>
    </div>
  );
};
