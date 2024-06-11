'use server';

import { getToken } from '@/app/actions/auth';
import axios from 'axios';

export interface PostCreateRequest {
  title: string;
  content: string;
}

export type PostListResponse = {
  articleId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}[];

export interface PostDetailResponse {
  articleId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const postCreate = async (formData: FormData) => {
  const token = await getToken();
  if (!token) {
    console.error(formData);
    throw new Error('login is required');
  }

  const payload = JSON.stringify({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  // Edge 런타임 환경에서는 fetch() POST 요청이 GET으로 들어가는 것 같아서 axios로 변경
  const res = await axios.post(
    `${process.env.PLATFORM_BASE_URL!}/api/articles?userId=${token.id}`,
    payload,
    {
      maxRedirects: 0,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.token}`,
      },
    },
  );

  return (await res.data) as number;
};

export const postList = async () => {
  const token = await getToken();

  if (!token) {
    throw new Error('login is required');
  }

  const res = await fetch(
    `${process.env.PLATFORM_BASE_URL!}/api/articles/user/${token.id}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.token}`,
      },
    },
  );

  return (await res.json()) as PostListResponse;
};

export const getPost = async (articleId: number) => {
  const token = await getToken();

  if (!token) {
    throw new Error('login is required');
  }

  const res = await fetch(
    `${process.env.PLATFORM_BASE_URL!}/api/articles/${articleId}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token.token}`,
      },
    },
  );

  return (await res.json()) as PostDetailResponse;
};
