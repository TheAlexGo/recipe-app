'use client';

import { FC, JSX, memo, PropsWithChildren } from 'react';

import cn from 'classnames';

import { useStore } from '@/components/Tabs/store';
import { ITab } from '@/components/Tabs/types';

interface IItem extends ITab, PropsWithChildren {}

export const Item: FC<IItem> = memo(
  ({ children, ...tabProps }): JSX.Element => {
    const { activeTabId, changeActiveTab } = useStore();
    const { id } = tabProps;

    const isActive = id === activeTabId;

    const clickHandler = () => {
      changeActiveTab(tabProps);
    };

    return (
      <button
        id={`tab-${id}`}
        role="tab"
        type="button"
        className={cn('w-full flex-1 rounded-2xl p-3', {
          'bg-brand-primary text-white': isActive,
        })}
        onClick={clickHandler}
        aria-controls={`tabpanel-${id}`}
      >
        {children}
      </button>
    );
  },
);

Item.displayName = 'Tabs.Item';
