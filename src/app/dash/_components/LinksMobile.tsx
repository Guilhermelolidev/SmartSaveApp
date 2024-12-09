'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { images } from '@/constants/images';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function LinksMobile() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='transparent'
          size='icon'
          className='shrink-0 md:hidden'
        >
          <Menu size={36} strokeWidth={2.75} />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-full'>
        <SheetTitle className='border-b border-b-gray-300 h-20 flex items-center'>
          <div className='flex items-center gap-2'>
            <Image src={images.logo} alt='logo' width={40} height={30} />
            <div className='flex gap-2 ml-2'>
              <span className='font-roboto font-medium text-30 w-full whitespace-nowrap'>
                Smart Save
              </span>
            </div>
          </div>
        </SheetTitle>
        <nav className='grid gap-6 text-lg font-medium mt-10'>
          <Button
            variant='transparent'
            size='btn'
            onClick={() => setOpen(false)}
          >
            <Link href='/dash' className='px-2 flex gap-2 items-center'>
              <span className='font-roboto font-bold text-20 text-blue-600'>
                Assinaturas
              </span>
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
