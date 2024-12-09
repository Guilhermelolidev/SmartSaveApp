'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { icons } from '@/constants/images';
import { api } from '@/utils/api';
import { formatCurrency } from '@/utils/form';
import { NewSubscriptionSchema } from '@/utils/schemas';
import { Subscription } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { SignatureForm } from './Forms/SignatureForm';

interface EditSignatureProps {
  subscription: Subscription;
}

export default function EditSignature({ subscription }: EditSignatureProps) {
  const [isOpenNewSignature, setIsOpenNewSignature] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: NewSubscriptionSchema) => {
      const editedSubscription = {
        ...data,
        value: formatCurrency(data.value),
      };

      return api.put(`/subscription/${subscription.id}`, editedSubscription);
    },
    onSuccess: () => {
      setIsOpenNewSignature(false);
      router.refresh();
      toast.success('Assinatura editada com sucesso');
    },
    onError: () => {
      toast.error('Erro ao editar assinatura');
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
        <Button variant='transparentIcon' size='icon' className='shrink-0'>
          <Image src={icons.edit} alt='Editar' width={20} height={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full md:w-[540px]' side='right'>
        <SheetHeader>
          <SheetTitle className='mt-2'>
            <span className='font-roboto font-bold text-20 text-black'>
              Editar Assinatura
            </span>
          </SheetTitle>
        </SheetHeader>
        <SignatureForm
          onSubmit={onSubmit}
          subscription={subscription}
          isLoading={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
}
