import { FC, JSX, memo, PropsWithChildren } from 'react';

import { IconType } from 'react-icons';

interface IItem extends PropsWithChildren {
  icon: IconType;
}

export const Item: FC<IItem> = memo(({ icon: Icon, children }): JSX.Element => {
  return (
    <li className="flex items-center gap-3">
      <div className="inline-block rounded-xl bg-neutral-gray-4 p-2">
        <Icon className="size-6 text-neutral-dark" />
      </div>
      {children}
    </li>
  );
});

Item.displayName = 'Nutritions.Item';
