'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { NewSignatureForm } from './Forms/NewSignatureForm';

export default function NewSignature() {
  const [isOpenNewSignature, setIsOpenNewSignature] = useState(false);

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
        <NewSignatureForm setIsOpenNewSignature={setIsOpenNewSignature} />
      </SheetContent>
    </Sheet>
  );
}
