'use client';

import { useEffect } from 'react';
import { deleteToken } from '../actions/auth';
import { redirect, RedirectType } from 'next/navigation';

export default function LogoutPage() {
  useEffect(() => {
    async function init() {
      await deleteToken();
    }
    init();
    alert('로그아웃 되었습니다.');
    redirect('/', RedirectType.replace);
  }, []);

  return (
    <div className='border border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin'></div>
  );
}
