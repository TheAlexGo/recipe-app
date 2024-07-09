import { FC, JSX } from 'react';

import { ITab } from '@/components/Tabs/types';

import { Panel } from './Panel';

interface IContent {
  activeTab: ITab;
}

export const Content: FC<IContent> = ({
  activeTab: { id },
}): JSX.Element | null => {
  switch (id) {
    case 'ingredients':
      return <Panel id={id}>panel ingredients</Panel>;
    case 'instructions':
      return <Panel id={id}>panel instructions</Panel>;
    default:
      return null;
  }
};
