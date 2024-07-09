'use client';

import { FC, JSX, PropsWithChildren, useState } from 'react';

import cn from 'classnames';

interface ICollapsedText extends PropsWithChildren {}

export const CollapsedText: FC<ICollapsedText> = ({
  children,
}): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);

  const clickHandler = () => {
    setCollapsed((prevValue) => !prevValue);
  };

  return (
    <div>
      <p
        className={cn('mt-1.5 text-neutral-gray-5', {
          'line-clamp-2': !collapsed,
        })}
      >
        {children}{' '}
      </p>
      <button
        type="button"
        className="text-brand-primary"
        onClick={clickHandler}
      >
        View {collapsed ? 'Less' : 'More'}
      </button>
    </div>
  );
};
