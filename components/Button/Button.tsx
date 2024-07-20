import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, JSX } from 'react';

import cn from 'classnames';
import { LinkProps } from 'next/dist/client/link';
import Link from 'next/link';

interface IMainProps {
  view?: 'primary' | 'danger' | 'custom';
  fill?: boolean;
}

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    IMainProps {
  href?: never;
}

type LinkPropsExt = Omit<LinkProps, 'href' | 'as'>;

export interface ILinkProps
  extends Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      keyof LinkPropsExt | 'type'
    >,
    LinkPropsExt,
    IMainProps {
  href: string;
}

export type IButton = IButtonProps | ILinkProps;

export const Button: FC<IButton> = ({
  className,
  children,
  view = 'primary',
  fill = true,
  ...props
}): JSX.Element => {
  const classes = cn(
    {
      'flex items-center justify-center rounded-2xl p-4 font-bold':
        view !== 'custom',
      'bg-brand-secondary text-white': view === 'primary',
      'bg-brand-danger text-white': view === 'danger',
      'w-full': fill,
    },
    className,
  );
  if (typeof props.href !== 'undefined') {
    return (
      <Link {...props} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={cn(classes, {
        'opacity-70': props.disabled,
      })}
    >
      {children}
    </button>
  );
};
