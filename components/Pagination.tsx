'use client';

import React, { startTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import classNames from 'classnames';
import { Button } from './Button';

export const Pagination = ({
  className,
  currentPage,
  totalPages,
}: {
  className?: string;
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const onPageChange = (nextPage: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    updatedSearchParams.set('page', String(nextPage));

    startTransition(() => {
      router.replace(`${pathname}?${updatedSearchParams.toString()}`);
    });
  };

  return (
    <ul className={classNames(className, 'flex flew-row gap-2')}>
      <li>
        <Button
          size='None'
          className='w-16 h-10'
          backgroundColor='#74AA9C'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </Button>
      </li>
      {pages.map((page) => (
        <li key={page} className={currentPage === page ? 'active' : ''}>
          <Button
            size='None'
            className='w-10 h-10'
            backgroundColor={currentPage === page ? '#88a788' : '#FFFFFF'}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        </li>
      ))}
      <li>
        <Button
          size='None'
          className='w-16 h-10'
          backgroundColor='#74AA9C'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </Button>
      </li>
    </ul>
  );
};
