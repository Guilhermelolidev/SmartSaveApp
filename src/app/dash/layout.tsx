export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col w-full h-full'>
        <h1>header</h1>
      <div className='flex flex-col w-full h-full'>{children}</div>
    </div>
  );
}
