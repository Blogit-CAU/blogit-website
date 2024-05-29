'use server';

import { signIn, SignInResponse, signUp } from '@/app/api/platform/auth';
import CryptoJS from 'crypto-js';
import { cookies } from 'next/headers';

export async function saveToken(sessionData: SignInResponse) {
  const encryptedJson = CryptoJS.AES.encrypt(JSON.stringify({ data: sessionData }), process.env.COOKIE_SECURITY_KEY!).toString()
  const encryptedSessionData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptedJson))

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

  const decryptedData = CryptoJS.enc.Base64.parse(encryptedSessionData).toString(CryptoJS.enc.Utf8)
  const decrypted = CryptoJS.AES.decrypt(decryptedData, process.env.COOKIE_SECURITY_KEY!).toString(CryptoJS.enc.Utf8);
  console.log(decrypted);
  const { data } = JSON.parse(decrypted);

  return data as SignInResponse;
}

export async function hasToken() {
  const encryptedSessionData = cookies().get('session')?.value;

  if (!encryptedSessionData) {
    return false;
  }

  return true;
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
