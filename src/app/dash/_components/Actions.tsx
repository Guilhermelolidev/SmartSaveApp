import { TableCell } from '@/components/ui/table';
import { Subscription } from '@prisma/client';
import EditSignature from './EditSignature';
import RemoveSubscriptionAction from './RemoveSubscriptionAction';

interface ActionsProps {
  subscription: Subscription;
}

export default function Actions({ subscription }: ActionsProps) {
  return (
    <>
      <TableCell className='flex items-center  gap-2 whitespace-nowrap'>
        <EditSignature subscription={subscription} />
        <RemoveSubscriptionAction subscription={subscription} />
      </TableCell>
    </>
  );
}
