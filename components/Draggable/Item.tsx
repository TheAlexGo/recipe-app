import { FC, JSX, LiHTMLAttributes } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import cn from 'classnames';
import { RxDragHandleHorizontal } from 'react-icons/rx';

import { Button } from '@/components/Button';

interface IItem
  extends Omit<LiHTMLAttributes<HTMLLIElement>, 'draggable' | 'id'> {
  id: string | number;
}

export const Item: FC<IItem> = ({
  children,
  className,
  id,
  ...props
}): JSX.Element => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
    setActivatorNodeRef,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleX: 1,
        scaleY: 1,
      },
    ),
    zIndex: isDragging ? 999 : undefined,
    transition,
  };

  return (
    <li
      {...props}
      className="relative flex items-center gap-x-3"
      style={style}
      data-testid="draggable-item"
      ref={setNodeRef}
    >
      <Button.Icon
        className="shrink-0 cursor-grab touch-none"
        icon={RxDragHandleHorizontal}
        size="big"
        withPadding={false}
        {...attributes}
        {...listeners}
        ref={setActivatorNodeRef}
      />
      <div className={cn('w-full', className)}>{children}</div>
    </li>
  );
};
