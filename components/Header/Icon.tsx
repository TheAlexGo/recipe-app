import { ButtonHTMLAttributes, FC, JSX, memo } from 'react';

import { IconType } from 'react-icons';

interface IIcon
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  icon: IconType;
  label: string;
}

export const Icon: FC<IIcon> = memo(
  ({ icon: Icon, label, ...props }): JSX.Element => {
    return (
      <button {...props} type="button" aria-label={label}>
        <Icon className="size-6" />
      </button>
    );
  },
);

Icon.displayName = 'Header.Icon';
