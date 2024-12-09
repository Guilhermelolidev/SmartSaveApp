import { images } from '@/constants/images';
import { Session } from 'next-auth';
import Image from 'next/image';

type LogoAndTitleProps = {
  session: Session | null;
};

export default function LogoAndTitle({ session }: LogoAndTitleProps) {
  return (
    <div className='flex items-center gap-2'>
      <Image src={images.logo} alt='logo' width={40} height={30} />
      <div className='flex gap-2 ml-2 items-center'>
        <span className='font-roboto font-regular text-20 w-full whitespace-nowrap'>
          Bem vindo,
        </span>
        <span className='font-roboto font-bold text-24 whitespace-nowrap'>
          {session?.user?.name}
        </span>
      </div>
    </div>
  );
}
