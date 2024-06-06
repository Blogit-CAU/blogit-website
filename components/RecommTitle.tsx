//components에 RecommTitle.tsx 추가
'use client';
import { useCommitStore } from '@/store';

export default function RecommTitle() {
  const { recomText } = useCommitStore();
  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-[1.5rem]'>💌오늘의 주제 추천💌</h1>
      <ul className='flex flex-col gap-4 items-center'>
        {recomText.map((each, index) => {
          return (
            <li>
              {index+1}: {each}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
