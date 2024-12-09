'use client';

import { signOutAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { images } from '@/constants/images';
import { Session } from 'next-auth';
import Image from 'next/image';

export default function UserMenu({ session }: { session: Session | null }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='transparent'
            size='icon'
            className='rounded-full h-12 w-12 p-0'
          >
            <Image
              src={images.user}
              alt='User'
              width={48}
              height={48}
              className='h-full w-full object-cover rounded-full hover:scale-105 transition-all duration-300 hover:opacity-80'
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[180px] p-4 rounded-2xl'>
          <DropdownMenuLabel className='text-center'>
            <strong>{session?.user?.name?.toUpperCase()}</strong>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className='border-gray-300' />
          <div className='flex flex-col gap-2 mt-4'>
            <DropdownMenuItem asChild>
              <Button
                variant='transparent'
                className='w-full rounded-xl cursor-pointer'
              >
                <span className='font-roboto font-regular text-16 text-blue-600 '>
                  Meus dados
                </span>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant='transparent'
                className='w-full rounded-xl cursor-pointer'
                onClick={signOutAction}
              >
                <span className='font-roboto font-regular text-16 text-red-500 '>
                  Sair do sistema
                </span>
              </Button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
