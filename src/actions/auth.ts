'use server';

import { signIn, signOut } from '@/utils/auth';
import { db } from '@/utils/db';
import { signInSchema, signUpSchema } from '@/utils/schemas';
import { hash } from 'bcryptjs';
import { AuthError, CredentialsSignin } from 'next-auth';
import { redirect } from 'next/navigation';

export const dataSeeds = [
  {
    name: 'Netflix',
    value: 49.9,
    subscriptionPlan: 'Mensal',
    category: 'Streaming de filmes e séries',
    userId: '675660977254bcbd3a05a8fd',
    status: SubscriptionStatus.Ativo,
    imageUrl:
      'https://res.cloudinary.com/dyj9wiami/image/upload/v1733714288/800px-Netflix_icon.svg_amjrok.png',
  },
  {
    name: 'Spotify',
    value: 19.9,
    subscriptionPlan: 'Mensal',
    category: 'Streaming de música',
    imageUrl:
      'https://res.cloudinary.com/dyj9wiami/image/upload/v1733714481/nvz-bAP4aoChSpyENnKdNjMDeeRxCifE_VdTA4U-bJeKeZOAlZesFxFJ72yKlCJR2ro_w240-h480-rw_iyxwnb.webp',
    userId: '675660977254bcbd3a05a8fd',
    status: SubscriptionStatus.Ativo,
  },
  {
    name: 'Xbox Game Pass',
    value: 49.9,
    subscriptionPlan: 'Mensal',
    category: 'Biblioteca de jogos',
    imageUrl:
      'https://res.cloudinary.com/dyj9wiami/image/upload/v1733714532/Project-Latitude-Xbox-deve-intensificar-lancamentos-para-o-PS5-e-o-Switch_nwgsyl.jpg',
    userId: '675660977254bcbd3a05a8fd',
    status: SubscriptionStatus.Ativo,
  },
  {
    name: 'Tinder',
    value: 30,
    subscriptionPlan: 'Mensal',
    category: 'App de relacionamento',
    imageUrl:
      'https://res.cloudinary.com/dyj9wiami/image/upload/v1733714536/tinder_i8dapq.png',
    userId: '675660977254bcbd3a05a8fd',
    status: SubscriptionStatus.Ativo,
  },
];

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
