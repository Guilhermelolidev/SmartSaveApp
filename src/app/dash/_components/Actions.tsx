import { TableCell } from '@/components/ui/table';
import { ISubscription } from '@/models/Subscription';
import EditSignature from './EditSignature';
import RemoveSubscriptionAction from './RemoveSubscriptionAction';

interface ActionsProps {
  subscription: ISubscription;
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
