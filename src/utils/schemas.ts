import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const newSubscriptionSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  value: z.string().min(1, 'Valor é obrigatório'),
  status: z.enum(['Ativo', 'Cancelado', 'Pausado']),
  category: z.string().min(1, 'Categoria é obrigatório'),
  subscriptionPlan: z.string().min(1, 'Plano é obrigatório'),
});

export type NewSubscriptionSchema = z.infer<typeof newSubscriptionSchema>;
