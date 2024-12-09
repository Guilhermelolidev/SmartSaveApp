'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { api } from '@/utils/api';
import { formatCurrency } from '@/utils/form';
import { NewSubscriptionSchema } from '@/utils/schemas';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { SignatureForm } from './Forms/SignatureForm';

export default function NewSignature() {
  const [isOpenNewSignature, setIsOpenNewSignature] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: NewSubscriptionSchema) => {
      const newSubscription = {
        ...data,
        value: formatCurrency(data.value),
      };
      return api.post('/subscription', newSubscription);
    },
    onSuccess: () => {
      setIsOpenNewSignature(false);
      router.refresh();
      toast.success('Assinatura adicionada com sucesso');
    },
    onError: () => {
      toast.error('Erro ao adicionar assinatura');
    },
  });

  function onSubmit(data: NewSubscriptionSchema) {
    const newSubscription = {
      ...data,
    };

    mutation.mutate(newSubscription);
  }

  return (
    <Sheet open={isOpenNewSignature} onOpenChange={setIsOpenNewSignature}>
      <SheetTrigger asChild>
        <Button variant='primary' size='btn' className='w-fit px-6'>
          <span className='font-roboto font-bold text-16 text-white'>
            Nova Assinatura
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full md:w-[540px]' side='left'>
        <SheetHeader>
          <SheetTitle className='mt-2'>
            <span className='font-roboto font-bold text-20 text-black'>
              Nova Assinatura
            </span>
          </SheetTitle>
        </SheetHeader>
        <SignatureForm onSubmit={onSubmit} isLoading={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
}
