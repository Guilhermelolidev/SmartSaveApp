'use client';

import { loginAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { images } from '@/constants/images';
import { hasError } from '@/utils/form';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { startTransition, useActionState } from 'react';
import { toast } from 'sonner';

export default function SignInPage() {
  const [state, dispatchAction, isPending] = useActionState(
    async (_prevState: any, formData: FormData) => {
      try {
        const response = await loginAction(formData);

        return response;
      } catch (error) {
        if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
          toast.error(error.message, {
            description: 'Verifique suas credenciais e tente novamente.',
            duration: 2000,
          });
        }
      }
    },
    null
  );

  return (
    <div className='flex flex-col h-full justify-center items-center'>
      <form
        className='flex flex-col items-center justify-center w-full md:w-[400px]'
        onSubmit={e => {
          e.preventDefault();
          startTransition(() => {
            dispatchAction(new FormData(e.currentTarget));
          });
        }}
      >
        <div className='flex flex-col items-center justify-center gap-4 w-full mt-4'>
          <div className='flex flex-col items-start justify-center gap-1 w-full'>
            <Input
              placeholder='donaldtrump@gmail.com'
              name='email'
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
            {isPending && <Loader2 className='animate-spin' />}
            <span className='font-roboto font-bold text-18'>Acessar</span>
          </Button>
        </div>

        <Separator className='w-full my-10' />

        <div className='flex gap-4 items-center'>
          <Button variant='icon' size='icon' type='button'>
            <Image src={images.google} alt='google' width={27} height={27} />
          </Button>
          <Button variant='icon' size='icon' type='button'>
            <Image src={images.x} alt='x' width={24} height={24} />
          </Button>
        </div>
      </form>
    </div>
  );
}
