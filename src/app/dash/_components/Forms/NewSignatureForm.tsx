'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { statusOptions } from '@/constants/statusIndicator';
import { api } from '@/utils/api';
import { formatCurrency } from '@/utils/form';
import { NewSubscriptionSchema, newSubscriptionSchema } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';

interface NewSignatureFormProps {
  setIsOpenNewSignature: (isOpen: boolean) => void;
}

export function NewSignatureForm({
  setIsOpenNewSignature,
}: NewSignatureFormProps) {
  const router = useRouter();
  const form = useForm<NewSubscriptionSchema>({
    resolver: zodResolver(newSubscriptionSchema),
    defaultValues: {
      name: '',
      value: '',
      status: 'Ativo',
      category: '',
      subscriptionPlan: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: NewSubscriptionSchema) => {
      const newSubscription = {
        ...data,
        value: formatCurrency(data.value),
      };
      return api.post('/subscription', newSubscription);
    },
    onSuccess: () => {
      toast.success('Assinatura adicionada com sucesso');
      router.refresh();
      form.reset();
      setIsOpenNewSignature(false);
    },
    onError: () => {
      toast.error('Erro ao adicionar assinatura');
    },
  });

  function onSubmit(data: NewSubscriptionSchema) {
    const newSubscription = {
      ...data,
    };

    mutation.mutate(newSubscription);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Digite o nome da assinatura...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='value'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NumericFormat
                    customInput={Input}
                    thousandSeparator='.'
                    decimalSeparator=','
                    prefix='R$ '
                    decimalScale={2}
                    fixedDecimalScale
                    onFocus={() => {
                      if (field.value === '') {
                        field.onChange('');
                      }
                    }}
                    placeholder='Digite o valor da assinatura R$ 0,00'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='subscriptionPlan'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Digite o plano...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className='text-gray-400 text-[13px] ml-2'>
            Ex: Assinatura mensal, Assinatura anual, etc.
          </span>

          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Digite a categoria...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className='text-gray-400 text-[13px] ml-2'>
            Ex: Streaming, Jogos, etc.
          </span>

          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-full border border-slate-400 h-input rounded-2xl px-6 py-2'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(status => (
                        <SelectItem key={status.key} value={status.key}>
                          {status.key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button
              className='w-full h-input rounded-2xl mt-4'
              type='submit'
              disabled={mutation.isPending}
            >
              {mutation.isPending && (
                <Loader2 className='w-4 h-4 animate-spin' />
              )}
              <span className='font-roboto font-regular text-16 text-white'>
                Adicionar assinatura
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
