'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { images } from '@/constants/images';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className='flex flex-col md:flex-row h-screen w-full'>
      <div className='w-full md:w-1/2 h-full flex items-center justify-center'>
        <div className='w-full max-w-[400px] px-4'>
          <div className='flex flex-col items-center justify-center gap-2 mb-8'>
            <Image src={images.logo} alt='logo' width={54} height={29} />
            <h1 className='font-roboto font-medium text-30'>Smart Save</h1>
          </div>

          <Tabs value={pathname.includes('signup') ? 'signup' : 'signin'}>
            <TabsList className='w-full h-tabs rounded-tabs'>
              <TabsTrigger
                value='signin'
                className='w-full h-full rounded-tabs'
                onClick={() => {
                  router.push('/signin');
                }}
              >
                Já tenho uma conta
              </TabsTrigger>
              <TabsTrigger
                value='signup'
                className='w-full h-full rounded-tabs'
                onClick={() => {
                  router.push('/signup');
                }}
              >
                Criar conta
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {children}
        </div>
      </div>

      <div className='hidden md:block w-1/2 h-full relative'>
        <Image
          src='/images/background-auth.png'
          alt='logo'
          fill
          className='object-cover'
          priority
        />
      </div>
    </div>
  );
}
