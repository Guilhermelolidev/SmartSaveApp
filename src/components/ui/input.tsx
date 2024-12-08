import * as React from 'react';

import { icons } from '@/constants/images';
import { cn } from '@/utils/cn';
import Image from 'next/image';

type InputProps = React.ComponentProps<'input'> & {
  icon?: boolean;
  error?: string | null;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, ...props }, ref) => {
    return (
      <div className='w-full relative'>
        <input
          type={type}
          className={cn(
            'flex h-input w-full transition-all rounded-default border border-slate-400 bg-white px-6 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-slate-400   focus-visible:slate-400  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300',
            className,
            error && 'border-red-600'
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <Image
            src={icons.check}
            alt='icon'
            width={24}
            height={24}
            className='absolute right-4 top-1/2 -translate-y-1/2'
          />
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
