type SubscriptionsSummaryProps = {
  stats: {
    totalSubscriptions: number;
    totalActiveSubscriptions: number;
    totalExpenses: number;
  };
};

export default function SubscriptionsSummary({
  stats,
}: SubscriptionsSummaryProps) {
  const textActiveServices = `${
    stats.totalActiveSubscriptions === 1
      ? 'Serviço ativo: 1'
      : `Serviços ativos: ${stats.totalActiveSubscriptions}`
  }`;
  return (
    <div className='flex flex-col gap-2 border border-gray-200 rounded-lg p-4 mt-10 w-full md:w-fit text-center md:text-left'>
      <span className='font-roboto font-bold text-20 text-gray-400'>
        {`Serviços encontrados: ${stats.totalSubscriptions}`}
      </span>
      <span className='font-roboto font-bold text-20 text-gray-400'>
        {textActiveServices}
      </span>
      <span className='font-roboto font-bold text-20 text-green-500'>
        {`Gastos totais: R$ ${stats.totalExpenses.toFixed(2)}`}
      </span>
    </div>
  );
}
