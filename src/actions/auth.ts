'use server';

import { signIn, signOut } from '@/utils/auth';
import { db } from '@/utils/db';
import { dataSeeds } from '@/utils/prisma/seed';
import { signInSchema, signUpSchema } from '@/utils/schemas';
import { hash } from 'bcryptjs';
import { AuthError, CredentialsSignin } from 'next-auth';
import { redirect } from 'next/navigation';

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
      redirectTo: '/dash',
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

export async function signUpAction(prev: any, data: FormData) {
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
  const hashedPassword = await hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await db.subscription.createMany({
    data: dataSeeds.map(subscription => ({
      ...subscription,
      userId: user.id,
    })),
  });

  redirect('/signin');
}

export async function signOutAction() {
  await signOut();
}
