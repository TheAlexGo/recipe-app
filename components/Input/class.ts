import cn from 'classnames';

import { InputSizes } from '@/components/Input/types';

export const getInputClasses = ({
  size = 'normal',
  fill = true,
  error = false,
}: {
  size?: InputSizes;
  fill?: boolean;
  error?: boolean;
}) =>
  cn('border focus-within:ring focus-visible:outline-0', {
    'border-neutral-gray-4': !error,
    'border-brand-danger': error,
    'rounded-2xl p-4': size === 'normal',
    'rounded-xl p-2': size === 'small',
    'w-full': fill,
  });
