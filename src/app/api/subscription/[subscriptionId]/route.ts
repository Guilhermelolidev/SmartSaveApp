import { NextRequest, NextResponse } from 'next/server';

import { Subscription } from '@/models';
import { auth } from '@/utils/auth';
import { connectToDatabase } from '@/utils/db/mongodb';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ subscriptionId: string }> }
) {
  await connectToDatabase();
  const data = await request.json();
  const { subscriptionId } = await params;
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const subscription = await Subscription.updateOne(
      { _id: subscriptionId },
      {
        ...data,
      }
    );

    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.name : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
