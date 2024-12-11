'use server';

import { Subscription } from '@/models/Subscription';
import { auth } from '@/utils/auth';
import { connectToDatabase } from '@/utils/db/mongodb';
import { Types } from 'mongoose';

import { revalidatePath } from 'next/cache';

export async function getSubscriptions() {
  await connectToDatabase();
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error('Usuário não autenticado');
    }

    const response = await Subscription.find({
      userId: session?.user?.id,
    });

    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.error('Erro ao buscar assinaturas:', error);
    throw error;
  }
}

export async function removeSubscriptionAction(_id: Types.ObjectId) {
  await connectToDatabase();
  const session = await auth();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const subscription = await Subscription.deleteOne({
    _id,
    userId: session?.user?.id,
  });

  revalidatePath('/dash');

  return subscription;
}

export async function updateStatusAction(_id: Types.ObjectId, status: string) {
  await connectToDatabase();
  const session = await auth();

  try {
    const subscription = await Subscription.findOne({
      _id,
      userId: new Types.ObjectId(session?.user?.id),
    });

    if (!subscription) {
      return { error: 'Subscription not found' };
    }

    await Subscription.updateOne({ _id }, { status });

    revalidatePath('/dash');
  } catch (error) {
    console.log(error);
  }
}
