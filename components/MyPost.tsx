'use server';

import { hasToken } from '@/app/actions/auth';
import { BodyMedium, BodySmall, LabelSmall } from './Typography';
import { postList } from '@/app/api/platform/post';
import Link from 'next/link';

export default async function MyPostList() {
  const isAuthenticated = await hasToken();
  const myPosts = isAuthenticated ? await postList() : [];

  return (
    <>
      {isAuthenticated ? (
        <ul className='overflow-y-scroll h-48'>
          {myPosts.length > 0 ? (
            myPosts.map((each, index) => {
              return (
                <Link
                  href={`/post/edit?articleId=${each.articleId}&readOnly`}
                  key={index + 12}
                >
                  <li className='h-10 flex items-center justify-between hover:bg-gray-300 cursor-pointer'>
                    <BodyMedium>{each.title}</BodyMedium>
                    <LabelSmall>
                      {Intl.DateTimeFormat('ko-kr').format(
                        new Date(each.updatedAt),
                      )}
                    </LabelSmall>
                  </li>
                </Link>
              );
            })
          ) : (
            <li className='h-10 flex items-center justify-between'>
              <BodyMedium>{'작성한 글이 없습니다.'}</BodyMedium>
            </li>
          )}
        </ul>
      ) : (
        <BodySmall className='mt-1'>
          {'로그인해서 글을 저장해보세요!'}
        </BodySmall>
      )}
    </>
  );
}
