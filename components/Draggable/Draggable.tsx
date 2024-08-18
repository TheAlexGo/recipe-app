import { FC, HTMLAttributes, JSX } from 'react';

import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Props } from '@dnd-kit/core/dist/components/DndContext/DndContext';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface IDraggable
  extends Omit<HTMLAttributes<HTMLUListElement>, 'onDragEnd'> {
  items: {
    id: string | number;
  }[];
  onDragEnd?: Props['onDragEnd'];
}

export const Draggable: FC<IDraggable> = ({
  children,
  items,
  onDragEnd,
  ...props
}): JSX.Element => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul {...props}>{children}</ul>
      </SortableContext>
    </DndContext>
  );
};
