import { FC, JSX, useCallback, useState } from 'react';

import { Row } from '@/app/recipe/_components/DynamicInstruction/Row';
import { Button } from '@/components/Button';
import { IRowDB } from '@/types/db';
import { getLocal } from '@/utils/local';

interface IDynamicInstruction {}

export const DynamicInstruction: FC<IDynamicInstruction> = (): JSX.Element => {
  const [rows, setRows] = useState<IRowDB[]>([
    {
      id: `${Date.now()}`,
    },
  ]);

  const clickHandler = useCallback(() => {
    setRows((prevRows) => {
      const arr = [...prevRows];
      arr.push({
        id: `${Date.now()}`,
      });
      return arr;
    });
  }, []);

  const removeHandler = useCallback(
    (rowId: string) =>
      setRows((prevRows) => prevRows.filter(({ id }) => id !== rowId)),
    [],
  );

  return (
    <section>
      <ul className="flex flex-col gap-y-3">
        {rows.map((row) => (
          <Row key={row.id} {...row} onRemove={removeHandler} />
        ))}
      </ul>
      <Button className="mt-3" onClick={clickHandler}>
        {getLocal('actions.add')}
      </Button>
    </section>
  );
};
