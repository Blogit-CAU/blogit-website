'use server';

import { getToken } from "@/app/actions/auth";

export interface PostCreateRequest {
    title: string;
    content: string;
}

export const postCreate = async (formData: FormData) => {
    const token = await getToken();

    if (!token) {
        throw new Error('login is required');
    }

    const res = await fetch(`${process.env.PLATFORM_BASE_URL!}/api/articles?userId=${token.id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify({
          title: formData.get('title'),
          content: formData.get('content'),
        }),
      });
    
    return (await res.json()) as number;
}