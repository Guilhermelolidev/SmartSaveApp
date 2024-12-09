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
import { NewSubscriptionSchema, newSubscriptionSchema } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Subscription } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface NewSignatureFormProps {
  onSubmit: (data: NewSubscriptionSchema) => void;
  subscription?: Subscription;
  isLoading: boolean;
}

export function SignatureForm({
  onSubmit,
  subscription,
  isLoading,
}: NewSignatureFormProps) {
  const form = useForm<NewSubscriptionSchema>({
    resolver: zodResolver(newSubscriptionSchema),
    defaultValues: {
      name: subscription?.name || '',
      value: subscription?.value?.toString() || '',
      status: subscription?.status || 'Ativo',
      category: subscription?.category || '',
      subscriptionPlan: subscription?.subscriptionPlan || '',
    },
  });

  function handleSubmit(data: NewSubscriptionSchema) {
    onSubmit(data);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-4 mt-4'
        >
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
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <span className='font-roboto font-regular text-16 text-white'>
                  {subscription ? 'Atualizar' : 'Adicionar'}
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
