'use client';

import { removeSubscriptionAction } from '@/actions/subscriptions';

import { Button } from '@/components/ui/button';

import { icons } from '@/constants/images';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ISubscription } from '@/models/Subscription';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RemoveSubscriptionAction({
  subscription,
}: {
  subscription: ISubscription;
}) {
  const { id, name } = subscription;
  const [loading, setLoading] = useState(false);

  const handleRemoveSubscription = async () => {
    setLoading(true);
    await removeSubscriptionAction(id);
    setLoading(false);

    toast.success(`Assinatura ${name} removida com sucesso`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='transparentIcon' size='icon' className='shrink-0'>
          <Image src={icons.remove} alt='Remover' width={20} height={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-4 w-fit'>
        <span className='font-roboto font-regular text-16 text-black'>
          Remover {name}?
        </span>

        <div className='flex gap-2'>
          <Button
            variant='destructive'
            className='w-full'
            onClick={handleRemoveSubscription}
          >
            {loading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              <span className='font-roboto font-regular text-16 text-white'>
                Sim
              </span>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
