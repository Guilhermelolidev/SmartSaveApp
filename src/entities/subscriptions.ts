import { SubscriptionStatus } from '@prisma/client';

export interface Subscription {
  id: string;
  name: string;
  value: number;
  subscriptionPlan: string;
  category: string;
  status: SubscriptionStatus;
  imageUrl?: string | null;
  createdAt: Date;
  userId: string;
}
