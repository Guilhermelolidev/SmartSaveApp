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
import { ISubscription } from '@/models/Subscription';
import { cn } from '@/utils/cn';

interface StatusIndicatorProps {
  subscription: ISubscription;
}

export default function StatusIndicator({
  subscription,
}: StatusIndicatorProps) {
  const { status, id } = subscription;

  const getBgBadge = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-400';
      case 'Cancelado':
        return 'bg-red-400';
      case 'Pausado':
        return 'bg-yellow-400';
    }
  };

  const getTextColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'text-green-400';
      case 'Cancelado':
        return 'text-red-400';
      case 'Pausado':
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
