import { auth } from '@/utils/auth';
import { db } from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const newSubscription = {
    ...data,
    userId: session?.user?.id,
    subscriptionPlan: 'Mensal',
    imageUrl: '',
  };

  try {
    const subscription = await db.subscription.create({
      data: newSubscription,
    });

    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
