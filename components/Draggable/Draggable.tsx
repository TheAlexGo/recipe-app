import { FC, HTMLAttributes, JSX, memo, useLayoutEffect, useRef } from 'react';

import { DRAGGABLE_ITEM_SELECTOR } from '@/components/Draggable/constants';

import { Provider, useStore } from './store';

interface IDraggable extends HTMLAttributes<HTMLUListElement> {}

const DraggableWrapper: FC<IDraggable> = memo(({ ...props }) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const {
    childrenArray,
    setItems,
    activeElement,
    setContainerTop,
    setContainerBottom,
  } = useStore();

  useLayoutEffect(() => {
    const container = containerRef.current!;
    const { y, height } = container.getBoundingClientRect();
    setContainerTop(y);
    setContainerBottom(y + height);
    setItems(
      [...container.querySelectorAll(DRAGGABLE_ITEM_SELECTOR)].map(
        (node, index) => {
          const el = node as HTMLElement;
          const { y, width, height } = el.getBoundingClientRect();
          return {
            node: el,
            order: index,
            width,
            height,
            top: y,
            middle: (2 * y + height) / 2,
            bottom: y + height,
          };
        },
      ),
    );
  }, [
    childrenArray,
    setItems,
    setContainerTop,
    setContainerBottom,
    activeElement,
  ]);

  return (
    <ul {...props} ref={containerRef}>
      {childrenArray}
    </ul>
  );
});

DraggableWrapper.displayName = 'Draggable.DraggableWrapper';

export const Draggable: FC<IDraggable> = ({
  children,
  ...props
}): JSX.Element => {
  return (
    <Provider contentChildren={children}>
      <DraggableWrapper {...props} />
    </Provider>
  );
};
