import { FC, JSX } from 'react';

import { IPanel, Panel } from '@/app/recipe/[id]/_components/TabsContent/Panel';

interface IInstructionPanel extends Omit<IPanel, 'id'> {
  recipe: string;
}

export const InstructionPanel: FC<IInstructionPanel> = ({
  recipe,
  ...props
}): JSX.Element => {
  return (
    <Panel {...props} id="instruction">
      {recipe}
    </Panel>
  );
};
