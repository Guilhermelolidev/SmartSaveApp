import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/utils/auth';
import { db } from '@/utils/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ subscriptionId: string }> }
) {
  const data = await request.json();
  const { subscriptionId } = await params;
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const subscription = await db.subscription.update({
      where: { id: subscriptionId },
      data: {
        ...data,
      },
    });

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
