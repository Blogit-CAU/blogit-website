'use server';

import { postCreate } from '../api/platform/post';
import { hasToken } from './auth';

export async function createPost(_currentState: unknown, formData: FormData) {
  if (await hasToken()) {
    try {
      const articleId = await postCreate(formData);
      console.info(`${articleId} is created.`);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  return true;
}
