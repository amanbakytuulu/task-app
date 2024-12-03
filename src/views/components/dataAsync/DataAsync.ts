import { ReactElement } from 'react';

export interface IBlockProps<TData> {
  loading?: boolean;
  error?: string;
  data: TData | null | undefined;
  children: (data: TData) => ReactElement;
}
