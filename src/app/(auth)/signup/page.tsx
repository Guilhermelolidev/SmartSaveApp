'use client';

import { signUpAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { images } from '@/constants/images';
import { hasError } from '@/utils/form';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { startTransition, useActionState } from 'react';

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUpAction, null);

  return (
    <div className='flex flex-col h-full justify-center items-center'>
      <form
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          startTransition(() => {
            formAction(formData);
          });
        }}
        noValidate
        className='flex flex-col items-center justify-center w-full md:w-[400px]'
      >
        <div className='flex flex-col items-center justify-center gap-4 w-full mt-4'>
          <div className='flex flex-col items-start justify-center gap-1 w-full'>
            <Input
              placeholder='digite seu nome...'
              name='name'
              error={hasError(state?.error, 'name')}
            />
            <span className='font-roboto font-regular text-13 text-red-600'>
              {hasError(state?.error, 'name')}
            </span>
          </div>

          <div className='flex flex-col items-start justify-center gap-1 w-full'>
            <Input
              placeholder='digite seu email...'
              name='email'
              type='email'
              error={hasError(state?.error, 'email')}
            />
            <span className='font-roboto font-regular text-13 text-red-600'>
              {hasError(state?.error, 'email')}
            </span>
          </div>

          <div className='flex flex-col items-start justify-center gap-1 w-full'>
            <Input
              placeholder='********'
              type='password'
              name='password'
              error={hasError(state?.error, 'password')}
            />
            <span className='font-roboto font-regular text-13 text-red-600'>
              {hasError(state?.error, 'password')}
            </span>
          </div>

          <Button className='w-full h-btn' type='submit' disabled={isPending}>
            {isPending && <Loader2 className='w-4 h-4 animate-spin' />}
            <span className='font-roboto font-bold text-18'>Criar conta</span>
          </Button>
        </div>

        <Separator className='w-full my-10' />

        <div className='flex gap-4 items-center'>
          <Button variant='icon' size='icon' type='button' disabled>
            <Image src={images.google} alt='google' width={27} height={27} />
          </Button>
          <Button variant='icon' size='icon' type='button' disabled>
            <Image src={images.x} alt='x' width={24} height={24} />
          </Button>
        </div>
      </form>
    </div>
  );
}
