import { SubscriptionStatus } from '@prisma/client';

export const statusOptions: {
  key: SubscriptionStatus;
  action: string;
}[] = [
  {
    key: SubscriptionStatus.Ativo,
    action: 'Ativar',
  },
  {
    key: SubscriptionStatus.Cancelado,
    action: 'Cancelar',
  },
  {
    key: SubscriptionStatus.Pausado,
    action: 'Pausar',
  },
];
