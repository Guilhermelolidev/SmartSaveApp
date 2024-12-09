import { Session } from 'next-auth';
import LinksDesktop from './LinksDesktop';
import LinksMobile from './LinksMobile';
import LogoAndTitle from './LogoAndTitle';
import UserMenu from './UserMenu';

export default function AppBar({ session }: { session: Session | null }) {
  return (
    <header className='sticky top-0 flex h-20 items-center gap-4 border-b border-b-gray-300 bg-white px-4 md:px-6'>
      <nav className='flex w-full items-center  justify-between'>
        <div className='hidden items-center gap-4 md:flex'>
          {/* Logo + Bem vindo */}
          <LogoAndTitle session={session} />

          {/* Links - versão desktop */}
          <LinksDesktop />
        </div>

        {/* Links - versão mobile */}
        <LinksMobile />
        <div className='md:hidden'>
          <LogoAndTitle session={session} />
        </div>

        {/* User Menu */}
        <UserMenu session={session} />
      </nav>
    </header>
  );
}
