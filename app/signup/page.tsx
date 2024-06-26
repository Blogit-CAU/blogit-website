'use client';

import { Button } from '@/components/Button';
import { Input } from '@headlessui/react';
import Link from 'next/link';
import { redirect, RedirectType } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { signup } from '../actions/auth';
import { LabelMedium } from '@/components/Typography';

export default function SignupPage() {
  const [state, formAction] = useFormState(signup, undefined);

  useEffect(() => {
    if (state === 'SUCCESS') {
      alert('회원가입에 성공하였습니다.');
      redirect('/', RedirectType.replace);
    }
  }, [state]);

  return (
    <form action={formAction} className='flex flex-col items-center gap-3'>
      <Input
        type='email'
        name='email'
        placeholder='email'
        required
        className='w-96 mt-3 block rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
      />
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

      {state === 'ERROR' && (
        <LabelMedium className='text-red-500'>
          {'이메일 또는 아이디가 중복입니다. 다시 시도해주세요.'}
        </LabelMedium>
      )}
      {state === 'PASSWORD_INVALID' && (
        <LabelMedium className='text-red-500'>
          {'비밀번호를 영문, 숫자, 특수문자 포함 8자 이상으로 설정해주세요.'}
        </LabelMedium>
      )}

      <Button
        className='w-64 h-10'
        type='submit'
        size='None'
        backgroundColor='#74AA9C'
      >
        {'회원가입'}
      </Button>
    </form>
  );
}
