'use client';

import { images } from '@/constants/images';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='relative'>
        <Image src={images.robobg} alt='logo' width={300} height={300} />
        <span className='absolute top-[52%] left-1/2 transform -translate-x-[60%] -translate-y-1/5 font-roboto font-bold text-14'>
          Recuperando dados...
        </span>
      </div>

      <div className='-mt-[22rem] -ml-10'>
        <div className='relative'>
          <Image src={images.baloon} alt='logo' width={200} height={200} />
          <Image
            src={images.loading}
            alt='logo'
            width={70}
            height={70}
            className='absolute top-[19%] left-[33%] transform -translate-x-1/2 -translate-y-1/2 animate-spin'
          />
        </div>
      </div>
    </div>
  );
}
