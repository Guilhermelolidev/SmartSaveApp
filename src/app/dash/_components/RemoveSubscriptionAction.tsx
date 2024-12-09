'use client';

import { removeSubscriptionAction } from '@/actions/subscriptions';

import { Button } from '@/components/ui/button';

import { icons } from '@/constants/images';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Subscription } from '@prisma/client';
import Image from 'next/image';
import { toast } from 'sonner';

export default function RemoveSubscriptionAction({
  subscription,
}: {
  subscription: Subscription;
}) {
  const { id, name } = subscription;

  const handleRemoveSubscription = async () => {
    const subscription = await removeSubscriptionAction(id);

    toast.success(`Assinatura ${subscription.name} removida com sucesso`);
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
            <span className='font-roboto font-regular text-16 text-white'>
              Sim
            </span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
