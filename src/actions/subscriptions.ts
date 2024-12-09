'use server';

import { auth } from '@/utils/auth';
import { db } from '@/utils/db';

import { SubscriptionStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getSubscriptions() {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await db.subscription.findMany({
    where: { userId: session?.user?.id },
  });

  return response;
}

export const removeSubscriptionAction = async (id: string) => {
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const subscription = await db.subscription.delete({
    where: {
      id,
      userId: session?.user?.id,
    },
  });

  revalidatePath('/dash');

  return subscription;
};

export const updateStatusAction = async (
  id: string,
  status: SubscriptionStatus
) => {
  const session = await auth();
  try {
    const subscription = await db.subscription.findFirst({
      where: {
        id,
        userId: session?.user?.id,
      },
    });

    if (!subscription) {
      return { error: 'Subscription not found' };
    }

    await db.subscription.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/dash');
  } catch (error) {
    console.log(error);
  }
};
