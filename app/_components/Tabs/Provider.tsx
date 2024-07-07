'use client';

import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { Context, IStore } from '@/app/_components/Tabs/store';
import { ITab } from '@/app/_components/Tabs/types';

export interface IProvider {
  defaultActiveTab: string;
  onChangeTab?: (tab: ITab) => void;
}

interface IProviderProps extends IProvider, PropsWithChildren {}

export const Provider: FC<IProviderProps> = ({
  defaultActiveTab,
  onChangeTab,
  children,
}) => {
  const [activeTabId, setActiveTabId] = useState<ITab['id']>(defaultActiveTab);

  const changeActiveTab = useCallback(
    (tab: ITab) => {
      setActiveTabId(tab.id);
      onChangeTab?.(tab);
    },
    [onChangeTab],
  );

  const value = useMemo(
    () =>
      ({
        activeTabId,
        changeActiveTab,
      }) as IStore,
    [activeTabId, changeActiveTab],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
