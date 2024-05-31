'use server';

import { redirect } from 'next/navigation';
import { postCreate } from '../api/platform/post';
import { hasToken } from './auth';

export async function createPost(_currentState: unknown, formData: FormData) {
  if (await hasToken()) {
    try {
      await postCreate(formData);
    } catch (err) {
      return false;
    }
  }

  redirect('/post/share');
}
