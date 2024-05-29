import React from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import Image from 'next/image';
import Link from 'next/link';
import { Headline_01, Headline_02, Subtitle_02 } from '@/components/Typography';
import { getToken } from './actions/auth';

export const metadata: Metadata = {
  title: 'Blogit, power up your technical writing with AI',
  description: "Let's not compare our writing to someone else's.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <header className='bg-white'>
          <nav
            className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
            aria-label='Global'
          >
            <div className='flex lg:flex-1'>
              <Link
                href='/'
                className='-m-1.5 p-1.5 flex flex-row items-center'
              >
                <span className='sr-only'>Blogit</span>
                <Image width={36} height={36} src={'/logo.svg'} alt=''></Image>
                <Headline_01 className='ml-4'>{'blog, it'}</Headline_01>
                <Subtitle_02 className='ml-4'>
                  {'기술 포스트 작성 도우미'}
                </Subtitle_02>
              </Link>
            </div>
            {/* <div className='hidden lg:flex lg:gap-x-12'>
              <Link
                href='#'
                className='text-sm font-semibold leading-6 text-gray-900'
              >
                Features
              </Link>
              <Link
                href='#'
                className='text-sm font-semibold leading-6 text-gray-900'
              >
                Marketplace
              </Link>
              <Link
                href='#'
                className='text-sm font-semibold leading-6 text-gray-900'
              >
                Company
              </Link>
            </div> */}
            {(await getToken()) === null ? (
              <div className='lg:flex lg:flex-1 lg:justify-end'>
                <Link
                  href='/login'
                  className='text-sm font-semibold leading-6 text-gray-900'
                >
                  Log in
                </Link>
              </div>
            ) : (
              <div className='lg:flex lg:flex-1 lg:justify-end'>
                <Link
                  href='/logout'
                  className='text-sm font-semibold leading-6 text-gray-900'
                >
                  Log out
                </Link>
              </div>
            )}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
