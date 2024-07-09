'use client';

import { FC, JSX, useState } from 'react';

import { Content } from '@/app/recipe/[id]/_components/TabsContent/Content';
import { Tabs } from '@/components/Tabs';
import { ITab } from '@/components/Tabs/types';

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
