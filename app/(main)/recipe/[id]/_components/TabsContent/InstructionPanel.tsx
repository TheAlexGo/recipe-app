import { FC, JSX } from 'react';

import Image from 'next/image';

import {
  IPanel,
  Panel,
} from '@/app/(main)/recipe/[id]/_components/TabsContent/Panel';
import { useLoadImage } from '@/hooks/useLoadImage';
import { IStepDB } from '@/types/db';

interface IInstructionPanel extends Omit<IPanel, 'id'> {
  steps: IStepDB[];
}

const Item: FC<IStepDB> = ({ text, image_url }) => {
  const imageSrc = useLoadImage('steps_images', image_url);
  return (
    <li className="flex flex-col">
      <Image
        className="size-32"
        width={128}
        height={128}
        src={imageSrc}
        alt=""
        aria-hidden
      />
      <h4>{text}</h4>
    </li>
  );
};

export const InstructionPanel: FC<IInstructionPanel> = ({
  steps,
  ...props
}): JSX.Element => {
  return (
    <Panel {...props} id="instruction">
      <ol className="mx-4 flex list-decimal flex-col gap-y-3">
        {steps.map((step) => (
          <Item key={step.id} {...step} />
        ))}
      </ol>
    </Panel>
  );
};
