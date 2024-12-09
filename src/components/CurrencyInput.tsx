'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';
import { forwardRef, useState } from 'react';

interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onValueChange?: (value: number) => void;
  value?: number;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, onValueChange, value, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(() => {
      return value ? (value / 100).toFixed(2) : '';
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;

      // Remove tudo exceto números e ponto
      value = value.replace(/[^0-9.]/g, '');

      // Garante apenas um ponto decimal
      const parts = value.split('.');
      if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');

      // Limita a 2 casas decimais
      if (parts[1]?.length > 2) {
        value = parts[0] + '.' + parts[1].slice(0, 2);
      }

      setDisplayValue(value);

      // Converte para centavos e chama onValueChange
      const numericValue = parseFloat(value || '0') * 100;
      onValueChange?.(numericValue);
    };

    const handleBlur = () => {
      // Formata o valor ao perder o foco
      if (displayValue) {
        const formatted = parseFloat(displayValue).toFixed(2);
        setDisplayValue(formatted);
      }
    };

    return (
      <div className='relative'>
        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
          R$
        </span>
        <Input
          {...props}
          ref={ref}
          type='text'
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn('pl-9', className)}
        />
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };
