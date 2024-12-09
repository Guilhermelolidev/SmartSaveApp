'use client';

import { updateStatusAction } from '@/actions/subscriptions';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { statusOptions } from '@/constants/statusIndicator';
import { Subscription } from '@/entities/subscriptions';
import { cn } from '@/utils/cn';
import { SubscriptionStatus } from '@prisma/client';

interface StatusIndicatorProps {
  subscription: Subscription;
}

export default function StatusIndicator({
  subscription,
}: StatusIndicatorProps) {
  const { status, id } = subscription;

  const getBgBadge = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.Ativo:
        return 'bg-green-400';
      case SubscriptionStatus.Cancelado:
        return 'bg-red-400';
      case SubscriptionStatus.Pausado:
        return 'bg-yellow-400';
    }
  };

  const getTextColor = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.Ativo:
        return 'text-green-400';
      case SubscriptionStatus.Cancelado:
        return 'text-red-400';
      case SubscriptionStatus.Pausado:
        return 'text-yellow-400';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge className={cn(getBgBadge(status), 'px-4 py-2')}>
          <span className='font-roboto font-bold text-16 text-white'>
            {status}
          </span>
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {statusOptions
          .filter(option => option.key !== status)
          .map(option => (
            <DropdownMenuItem
              key={option.key}
              className='cursor-pointer hover:bg-gray-100 rounded-lg py-2 px-4'
              onClick={() => updateStatusAction(id, option.key)}
            >
              <span
                className={cn(
                  getTextColor(option.key),
                  'font-roboto font-bold'
                )}
              >
                {option.action}
              </span>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
