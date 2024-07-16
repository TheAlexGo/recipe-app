import { FC, JSX } from 'react';

import { TbClock } from 'react-icons/tb';

import { Detail, IDetail } from './Detail';

interface IDetailTime extends Pick<IDetail, 'className'> {
  time: number;
}

export const DetailTime: FC<IDetailTime> = ({
  time,
  ...props
}): JSX.Element => {
  return (
    <Detail {...props} icon={TbClock}>
      {(time / 60).toFixed()} мин
    </Detail>
  );
};
