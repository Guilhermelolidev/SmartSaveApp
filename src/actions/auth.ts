'use server';

import { User } from '@/models/User';
import { signIn, signOut } from '@/utils/auth';
import { connectToDatabase } from '@/utils/db/mongodb';
import { signInSchema, signUpSchema } from '@/utils/schemas';
import { hash } from 'bcryptjs';
import { AuthError, CredentialsSignin } from 'next-auth';
import { redirect } from 'next/navigation';

export async function signInWithGoogleAction() {
  await signIn('google');
}

export async function loginAction(data: FormData) {
  const {
    success,
    data: parsedData,
    error,
  } = signInSchema.safeParse(Object.fromEntries(data.entries()));

  if (!success) {
    return {
      error: error.errors,
    };
  }

  const { email, password } = parsedData;
  try {
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/dash',
      redirect: true,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    if (error instanceof AuthError || error instanceof CredentialsSignin) {
      throw new Error('Credenciais inválidas');
    }

    throw error;
  }
}

export async function signUpAction(prevState: any, data: FormData) {
  await connectToDatabase();

  const {
    success,
    data: parsedData,
    error,
  } = signUpSchema.safeParse(Object.fromEntries(data.entries()));

  if (!success) {
    return {
      error: error.errors,
    };
  }

  const { name, email, password } = parsedData;

  const user = await User.findOne({ email });

  if (user) return;

  const hashedPassword = await hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  redirect('/signin');
}

export async function signOutAction() {
  await signOut();
}
