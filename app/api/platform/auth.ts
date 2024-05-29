'use server';

export interface SignInResponse {
  id: number;
  token: string;
}

export const signIn = async (formData: FormData) => {
  const res = await fetch(`${process.env.PLATFORM_BASE_URL!}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      memberName: formData.get('memberName'),
      password: formData.get('password'),
    }),
  });

  return (await res.json()) as SignInResponse;
};