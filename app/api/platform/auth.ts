'use server';

export interface SignInResponse {
  id: number;
  token: string;
}

export interface SignUpResponse {
  id: number;
}

export const signIn = async (formData: FormData) => {
  console.info(formData + 'signin request');
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

export const signUp = async (formData: FormData) => {
  console.info(formData + 'signup request');
  const res = await fetch(`${process.env.PLATFORM_BASE_URL!}/signup`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: formData.get('email'),
      memberName: formData.get('memberName'),
      password: formData.get('password'),
    }),
  });

  return (await res.json()) as SignUpResponse;
};
