'use client';

import { FC, JSX, useState } from 'react';

import { Tabs } from '@/app/_components/Tabs';
import { ITab } from '@/app/_components/Tabs/types';
import { Content } from '@/app/recipe/[id]/_components/TabsContent/Content';

interface ITabsContent {
  items: ITab[];
}

export const TabsContent: FC<ITabsContent> = ({ items }): JSX.Element => {
  const [activeTab, setActiveTab] = useState(items[0]);

  return (
    <div>
      <Tabs
        label="Элементы меню"
        className="mt-6"
        defaultActiveTab={items[0].id}
        onChangeTab={setActiveTab}
      >
        {items.map((tab) => (
          <Tabs.Item key={tab.id} {...tab}>
            {tab.id}
          </Tabs.Item>
        ))}
      </Tabs>
      <Content activeTab={activeTab} />
    </div>
  );
};
