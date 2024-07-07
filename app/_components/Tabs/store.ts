import { createContext, useContext } from 'react';

import { ITab } from '@/app/_components/Tabs/types';

export interface IStore {
  activeTabId: ITab['id'];
  changeActiveTab: (tab: ITab) => void;
}

export const Context = createContext<IStore>({} as IStore);

export const useStore = () => {
  return useContext(Context);
};
