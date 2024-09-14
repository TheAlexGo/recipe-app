import { FC, FormHTMLAttributes, JSX } from 'react';

import cn from 'classnames';

interface IForm extends FormHTMLAttributes<HTMLFormElement> {}

export const Form: FC<IForm> = ({
  children,
  className,
  ...props
}): JSX.Element => {
  return (
    <form
      {...props}
      className={cn(
        'text-foreground flex w-full flex-1 flex-col justify-center gap-3',
        className,
      )}
    >
      {children}
    </form>
  );
};
