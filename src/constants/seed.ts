import { SubscriptionStatus } from '@prisma/client';

export const dataSeeds = [
  {
    name: 'Netflix',
    value: 49.9,
    subscriptionPlan: 'Mensal',
    category: 'Streaming de filmes e séries',
    userId: '675660977254bcbd3a05a8fd',
    status: SubscriptionStatus.Ativo,
    imageUrl:
      'https://res.cloudinary.com/dyj9wiami/image/upload/v1733714288/800px-Netflix_icon.svg_amjrok.png',
  },
  {
    name: 'Spotify',
    value: 19.9,
    subscriptionPlan: 'Mensal',
    category: 'Streaming de música',
    imageUrl:
      'https://res.cloudinary.com/dyj9wiami/image/upload/v1733714481/nvz-bAP4aoChSpyENnKdNjMDeeRxCifE_VdTA4U-bJeKeZOAlZesFxFJ72yKlCJR2ro_w240-h480-rw_iyxwnb.webp',
    userId: '675660977254bcbd3a05a8fd',
    status: SubscriptionStatus.Ativo,
  },
  {
    name: 'Tinder',
    value: 30,
    subscriptionPlan: 'Mensal',
    category: 'App de relacionamento',
    imageUrl:
      'https://res.cloudinary.com/dyj9wiami/image/upload/v1733714536/tinder_i8dapq.png',
    userId: '675660977254bcbd3a05a8fd',
    status: SubscriptionStatus.Ativo,
  },
];
