import { ZodIssue } from 'zod';

export const hasError = (errors: ZodIssue[] | undefined, path: string) => {
  if (!errors) return null;
  return errors?.find(item => item.path.includes(path))?.message;
};
