'use client';

import { useFormState } from 'react-dom';

import { Button } from '@/components/Button';
import { authenticate } from '@/app/actions/auth';
import { Input } from '@headlessui/react';
import { useEffect } from 'react';
import { redirect, RedirectType } from 'next/navigation';
import Link from 'next/link';
import { LabelSmall } from '@/components/Typography';

export default function LoginPage() {
  const [state, formAction] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state) {
      alert('로그인에 성공하였습니다.');
      redirect('/', RedirectType.replace);
    }
  }, [state]);

  return (
    <form action={formAction} className='flex flex-col items-center gap-3'>
      <Input
        type='text'
        name='memberName'
        placeholder='ID'
        required
        className='w-96 mt-3 block rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
      />
      <Input
        type='password'
        name='password'
        placeholder='Password'
        required
        className='w-96 block rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
      />

      {state === false && <p>{'다시 시도해주세요.'}</p>}

      <Button
        className='w-64 h-10'
        type='submit'
        size='None'
        backgroundColor='#74AA9C'
      >
        {'로그인'}
      </Button>

      <Link href={'/signup'}>
        <LabelSmall>{'회원가입 하기'}</LabelSmall>
      </Link>
    </form>
  );
}
