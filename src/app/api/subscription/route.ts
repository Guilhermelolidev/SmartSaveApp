import { Subscription } from '@/models/Subscription';
import { auth } from '@/utils/auth';
import { connectToDatabase } from '@/utils/db/mongodb';
import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await connectToDatabase();
  const data = await request.json();
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const newSubscription = {
    ...data,
    userId: new Types.ObjectId(session?.user?.id),
    imageUrl: '',
  };

  try {
    const subscription = await new Subscription(newSubscription).save();

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
