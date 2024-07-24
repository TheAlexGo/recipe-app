import cn from 'classnames';

import { InputSizes } from '@/components/Input/types';

export const getInputClasses = ({
  size = 'normal',
  fill = true,
}: {
  size?: InputSizes;
  fill?: boolean;
}) =>
  cn('border border-neutral-gray-4 focus-within:ring focus-visible:outline-0', {
    'rounded-2xl p-4': size === 'normal',
    'rounded-xl p-2': size === 'small',
    'w-full': fill,
  });
