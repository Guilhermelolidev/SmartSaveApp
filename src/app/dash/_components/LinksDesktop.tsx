'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function LinksDesktop() {
  return (
    <div className='hidden md:flex items-center gap-4 ml-10'>
      <Link href='/dash' className='px-2 flex gap-2 items-center'>
        <Button variant='transparent' size='btn'>
          <span className='font-roboto font-bold text-20 text-blue-600'>
            Assinaturas
          </span>
        </Button>
      </Link>
      <Link href='/dash/categorias' className='px-2 flex gap-2 items-center'>
        <Button variant='transparent' size='btn'>
          <span className='font-roboto font-bold text-20 text-blue-600'>
            Categorias
          </span>
        </Button>
      </Link>
    </div>
  );
}
