import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';
import { icons } from '@/constants/images';
import { Subscription } from '@prisma/client';
import Image from 'next/image';
import RemoveSubscriptionAction from './RemoveSubscriptionAction';

interface ActionsProps {
  subscription: Subscription;
}

export default function Actions({ subscription }: ActionsProps) {
  return (
    <>
      <TableCell className='flex items-center  gap-2 whitespace-nowrap'>
        <Button variant='transparentIcon' size='icon' className='shrink-0'>
          <Image src={icons.edit} alt='Editar' width={20} height={20} />
        </Button>
        <RemoveSubscriptionAction subscription={subscription} />
      </TableCell>
    </>
  );
}
