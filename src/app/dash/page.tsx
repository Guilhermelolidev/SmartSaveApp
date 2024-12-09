import { getSubscriptions } from '@/actions/subscriptions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Subscription, SubscriptionStatus } from '@prisma/client';
import Image from 'next/image';
import Actions from './_components/Actions';
import NewSignature from './_components/NewSignature';
import StatusIndicator from './_components/StatusIndicator';
import SubscriptionsSummary from './_components/SubscriptionsSummary';

export default async function DashPage() {
  const subscriptions = await getSubscriptions();

  const activeSubscriptions = subscriptions.filter(
    (sub: Subscription) => sub.status === SubscriptionStatus.Ativo
  );

  const stats = {
    totalSubscriptions: subscriptions.length,
    totalActiveSubscriptions: activeSubscriptions.length,
    totalExpenses: activeSubscriptions.reduce(
      (acc, subscription) => acc + subscription.value,
      0
    ),
  };

  return (
    <div className='flex flex-col gap-4 w-full md:px-20 py-5'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-30 font-roboto font-regular text-black'>
            Minhas Assinaturas
          </h1>

          <NewSignature />
        </div>

        <div className='flex flex-col gap-2 items-end'>
          <SubscriptionsSummary stats={stats} />
          <span className='font-roboto font-regular text-16 text-gray-500'>
            Dica: Clique no botão <span className='font-bold'>Ativo</span> para
            alterar o status da assinatura
          </span>
        </div>
      </div>

      <Table>
        <TableHeader className='bg-gray-100 h-[4.25rem]'>
          <TableRow>
            <TableHead className='w-[300px] md:w-[300px]'>
              <span className='font-roboto font-regular text-16 text-gray-500'>
                Serviço
              </span>
            </TableHead>
            <TableHead>
              <span className='font-roboto font-regular text-16 text-gray-500'>
                Valor
              </span>
            </TableHead>
            <TableHead className='w-[300px] md:w-[300px]'>
              <span className='font-roboto font-regular text-16 text-gray-500'>
                Plano
              </span>
            </TableHead>
            <TableHead className='hidden md:table-cell'>
              <span className='font-roboto font-regular text-16 text-gray-500'>
                Categoria
              </span>
            </TableHead>
            <TableHead>
              <span className='font-roboto font-regular text-16 text-gray-500'>
                Status
              </span>
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {subscriptions.map(subscription => {
            const { id, imageUrl, name, value, subscriptionPlan, category } =
              subscription;
            return (
              <TableRow key={id}>
                <TableCell className='w-[300px] md:w-[350px]'>
                  <div className='flex items-center gap-4'>
                    <div className='bg-red rounded-full w-[47px] h-[47px] relative overflow-hidden'>
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt='Serviço'
                          fill
                          className='object-cover'
                        />
                      )}
                    </div>
                    <span className='font-roboto font-bold text-20 text-gray-600'>
                      {name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='font-roboto font-regular text-20 text-gray-600'>
                    {`R$ ${value.toFixed(2)}`}
                  </span>
                </TableCell>
                <TableCell className='w-[300px] md:w-[300px]'>
                  <span className='font-roboto font-regular text-20 text-gray-600'>
                    {subscriptionPlan}
                  </span>
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <span className='font-roboto font-regular text-20 text-gray-600'>
                    {category}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusIndicator subscription={subscription} />
                </TableCell>

                <Actions subscription={subscription} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
