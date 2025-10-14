'use server';

import dbConnect from '@/lib/db';
import { compare } from 'bcrypt';
import { setSessionCookie } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Sign } from '@/utils/models/Schema';

const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_API_JWT);

export async function signInAction(formData) {
  console.log('[signInAction]', formData);
  const email = formData.get('email');
  const password = formData.get('password');
  const user = await authenticateUser(email, password);
  if (!user) {
    return { isError: true, message: 'Invalid credentials' };
  }
await setSessionCookie(user)
  redirect('/');
}


export async function authenticateUser(email, password) {
  await dbConnect();
  const user = await Sign.findOne({ email });
  if (user && await compare(password, user.passwordHash)) {
    return user;
  }
}


