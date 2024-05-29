'use server';

import { signIn, SignInResponse, signUp } from '@/app/api/platform/auth';
import { AES } from '@/util/security';
import { cookies } from 'next/headers';

export async function saveToken(sessionData: SignInResponse) {
  const encryptedSessionData = AES.encrypt(JSON.stringify(sessionData));
  cookies().set('session', encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
}

export async function getToken() {
  const encryptedSessionData = cookies().get('session')?.value;

  if (!encryptedSessionData) {
    return null;
  }

  return JSON.parse(AES.decrypt(encryptedSessionData)) as SignInResponse;
}

export async function deleteToken() {
  cookies().delete('session');
}

export async function authenticate(_currentState: unknown, formData: FormData) {
  let res;
  try {
    res = await signIn(formData);
    await saveToken(res);
  } catch (err: any) {
    return false;
  }

  return true;
}

export async function signup(_currentState: unknown, formData: FormData) {
  let res;
  try {
    res = await signUp(formData);
  } catch (err: any) {
    return false;
  }

  return true;
}
