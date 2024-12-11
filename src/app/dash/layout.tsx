import { auth } from '@/utils/auth';
import AppBar from './_components/AppBar';

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <>
      <AppBar session={session} />
      <div>{children}</div>
    </>
  );
}
