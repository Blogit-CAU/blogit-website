'use server';

import { redirect } from 'next/navigation';
import { postCreate } from '../api/platform/post';
import { hasToken } from './auth';

export async function createPost(_currentState: unknown, formData: FormData) {
  if (await hasToken()) {
    try {
      await postCreate(formData);
    } catch (err) {
      throw new Error('오류가 발생했습니다. 다시 시도해주세요.');
    }
  }

  redirect('/post/share');
}
