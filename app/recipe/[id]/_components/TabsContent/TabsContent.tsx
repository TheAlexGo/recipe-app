'use client';

import { FC, JSX, useCallback, useState } from 'react';

import { Tabs } from '@/components/Tabs';
import { ITab } from '@/components/Tabs/types';

interface ITabsContent {
  items: {
    tab: ITab;
    panel: JSX.Element;
  }[];
}

export const TabsContent: FC<ITabsContent> = ({ items }): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const changeTabHandler = useCallback(
    (tab: ITab) => {
      const currentItem = items.find((item) => item.tab.id === tab.id)!;
      setSelectedItem(currentItem);
    },
    [items],
  );

  return (
    <div>
      <Tabs
        label="Элементы меню"
        className="mt-6"
        defaultActiveTab={items[0].tab.id}
        onChangeTab={changeTabHandler}
      >
        {items.map(({ tab }) => (
          <Tabs.Item key={tab.id} {...tab}>
            {tab.id}
          </Tabs.Item>
        ))}
      </Tabs>

      <div className="mt-6">{selectedItem.panel}</div>
    </div>
  );
};
