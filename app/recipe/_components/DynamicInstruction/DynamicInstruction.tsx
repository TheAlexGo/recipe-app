import { FC, JSX, useCallback, useState } from 'react';

import { Button } from '@/components/Button';
import { Draggable } from '@/components/Draggable';
import { IStepDB } from '@/types/db';
import { getLocal } from '@/utils/local';

import { IRow, Row } from './Row';

interface IDynamicInstruction {
  initialSteps?: IStepDB[];
}

export const DynamicInstruction: FC<IDynamicInstruction> = ({
  initialSteps,
}): JSX.Element => {
  const [rows, setRows] = useState<IRow[]>(
    initialSteps || [
      {
        id: Date.now(),
      } as IStepDB,
    ],
  );

  const clickHandler = useCallback(() => {
    setRows((prevRows) => {
      const arr = [...prevRows];
      arr.push({
        id: Date.now(),
      } as IStepDB);
      return arr;
    });
  }, []);

  const removeHandler = useCallback(
    (rowId: number | string) =>
      setRows((prevRows) => prevRows.filter(({ id }) => id !== rowId)),
    [],
  );

  return (
    <section>
      <Draggable className="flex flex-col gap-y-3">
        {rows.map((row) => (
          <Row key={row.id} {...row} onRemove={removeHandler} />
        ))}
      </Draggable>
      <Button className="mt-3" onClick={clickHandler}>
        {getLocal('actions.add')}
      </Button>
    </section>
  );
};
