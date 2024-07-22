import { FC, JSX, MouseEventHandler, PropsWithChildren } from 'react';

interface IContent extends PropsWithChildren {
  className?: string;
}

export const Content: FC<IContent> = ({ className, children }): JSX.Element => {
  const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={className} onClickCapture={clickHandler}>
      {children}
    </div>
  );
};
