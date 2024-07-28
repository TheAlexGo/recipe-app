import {
  CSSProperties,
  FC,
  JSX,
  LiHTMLAttributes,
  PointerEventHandler,
  useMemo,
  useRef,
  useState,
} from 'react';

import cn from 'classnames';
import { RxDragHandleHorizontal } from 'react-icons/rx';

import { Button } from '@/components/Button';
import logger from '@/utils/logger';

import { TChildren, useStore } from './store';

const ANIMATION_DELAY = 300;

interface IItem extends Omit<LiHTMLAttributes<HTMLLIElement>, 'draggable'> {}

export const Item: FC<IItem> = ({
  children,
  className,
  ...props
}): JSX.Element => {
  const {
    draggable,
    containerTop,
    containerBottom,
    items,
    setActiveElement,
    setDraggable,
    setChildrenArray,
  } = useStore();

  const [currentY, setCurrentY] = useState(0);
  const [zIndex, setZIndex] = useState(0);

  const itemRef = useRef<HTMLLIElement>(null);
  const dragIconRef = useRef<HTMLButtonElement>(null);
  const itemYOffset = useRef(0);
  const topRef = useRef(0);
  const bottomRef = useRef(0);
  const heightRef = useRef(0);

  const coordsStyle = useMemo(() => {
    const result: CSSProperties = {
      top: `${currentY}px`,
      zIndex,
    };
    return result;
  }, [currentY, zIndex]);

  const pointerDownHandler: PointerEventHandler<HTMLButtonElement> = ({
    clientY,
    pointerId,
  }) => {
    const item = itemRef.current!;
    const dragIcon = dragIconRef.current!;

    dragIcon.setPointerCapture(pointerId);

    const { y, height } = item.getBoundingClientRect();
    topRef.current = y;
    heightRef.current = height;
    bottomRef.current = y + height;
    itemYOffset.current = y + height - clientY;

    setDraggable(true);
    setActiveElement(item);
  };

  const overDragItem = (y: number) => {
    const currentY = y + (y >= 0 ? bottomRef.current : topRef.current);
    logger.log(currentY);
    const halfHeight = heightRef.current / 2;
    /**
     * Больше middle (600)
     * Может быть больше bottom (700), но не более bottom (700) + height (200)
     */
    const switchItem = items.find(
      ({ node, middle, top, bottom }) =>
        !node.isEqualNode(itemRef.current) &&
        (y < 0
          ? top - halfHeight < currentY && currentY < middle
          : middle < currentY && currentY < bottom + halfHeight),
    );
    logger.log(switchItem);
    return switchItem;
  };

  const moveHandler: PointerEventHandler<HTMLButtonElement> = ({
    movementY,
  }) => {
    if (draggable) {
      setZIndex(1);
      setCurrentY((prevY) => {
        let newY = prevY + movementY;
        if (
          (movementY > 0 && bottomRef.current + newY > containerBottom) ||
          (movementY < 0 && topRef.current + newY + movementY < containerTop)
        ) {
          newY = prevY;
        }
        return newY;
      });
    }
  };

  const pointerUpHandler: PointerEventHandler<HTMLButtonElement> = () => {
    setCurrentY(0);
    setDraggable(false);
    setActiveElement(null);

    const switchItem = overDragItem(currentY);
    const currentItem = items.find(({ node }) =>
      node.isEqualNode(itemRef.current),
    );
    if (switchItem && currentItem) {
      setChildrenArray((prevChildren) => {
        return prevChildren.reduce<TChildren[]>((acc, item, index) => {
          if (switchItem.order === index) {
            acc.push(prevChildren[currentItem!.order]);
          } else if (currentItem!.order === index) {
            acc.push(prevChildren[switchItem.order]);
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
      });
    }
    setTimeout(() => {
      setZIndex(0);
    }, ANIMATION_DELAY);
  };

  return (
    <li
      {...props}
      className="relative flex items-center gap-x-3"
      style={coordsStyle}
      data-testid="draggable-item"
      ref={itemRef}
    >
      <Button.Icon
        className="shrink-0 cursor-grab touch-none"
        icon={RxDragHandleHorizontal}
        size="big"
        withPadding={false}
        onPointerDown={pointerDownHandler}
        onPointerMove={moveHandler}
        onPointerUp={pointerUpHandler}
        ref={dragIconRef}
      />
      <div className={cn('w-full', className)}>{children}</div>
    </li>
  );
};
