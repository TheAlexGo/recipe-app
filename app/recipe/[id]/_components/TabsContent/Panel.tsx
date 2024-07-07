import { FC, JSX, PropsWithChildren } from 'react';

import { ITab } from '@/app/_components/Tabs/types';

interface IPanel extends Pick<ITab, 'id'>, PropsWithChildren {}

export const Panel: FC<IPanel> = ({ id, children }): JSX.Element => {
  return (
    <div
      role="tabpanel"
      id={`tabpanel-${id}`}
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
    >
      <p>{children}</p>
    </div>
  );
};
