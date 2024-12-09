import { ZodIssue } from 'zod';

export const hasError = (
  errors: ZodIssue[] | undefined | string,
  path: string
) => {
  if (!errors) return null;
  return errors instanceof Array
    ? errors?.find(item => item.path.includes(path))?.message
    : errors;
};

export const formatCurrency = (value: string) => {
  const cleanValue = value.replace(/[R$\s.]/g, '');
  const normalizedValue = cleanValue.replace(',', '.');
  const numberValue = Number(normalizedValue);
  return Number(numberValue.toFixed(2));
};
