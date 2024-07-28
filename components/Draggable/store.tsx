import {
  Children,
  createContext,
  Dispatch,
  FC,
  memo,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type TChildren = Exclude<ReactNode, boolean | null | undefined>;

export interface IDraggableItem {
  node: HTMLElement;
  order: number;
  width: number;
  height: number;
  top: number;
  middle: number;
  bottom: number;
}

interface IStore {
  childrenArray: TChildren[];
  setChildrenArray: Dispatch<SetStateAction<TChildren[]>>;
  gap: number;
  setGap: (gap: number) => void;
  draggable: boolean;
  setDraggable: Dispatch<SetStateAction<boolean>>;
  activeElement: HTMLLIElement | null;
  setActiveElement: Dispatch<SetStateAction<HTMLLIElement | null>>;
  items: IDraggableItem[];
  setItems: Dispatch<SetStateAction<IDraggableItem[]>>;
  containerTop: number;
  setContainerTop: Dispatch<SetStateAction<number>>;
  containerBottom: number;
  setContainerBottom: Dispatch<SetStateAction<number>>;
}

const StoreContext = createContext<IStore>({} as IStore);

export const useStore = (): IStore => {
  return useContext(StoreContext);
};

interface IProvider extends PropsWithChildren {
  contentChildren: ReactNode;
}

export const Provider: FC<IProvider> = memo(({ contentChildren, children }) => {
  const [gap, setGap] = useState(0);
  const [draggable, setDraggable] = useState(false);
  const [activeElement, setActiveElement] = useState<HTMLLIElement | null>(
    null,
  );
  const [items, setItems] = useState<IDraggableItem[]>([]);
  const [containerTop, setContainerTop] = useState(0);
  const [containerBottom, setContainerBottom] = useState(0);
  const [childrenArray, setChildrenArray] = useState<TChildren[]>(
    Children.toArray(contentChildren),
  );

  const value: IStore = useMemo(
    () => ({
      childrenArray,
      setChildrenArray,
      gap,
      setGap,
      draggable,
      setDraggable,
      activeElement,
      setActiveElement,
      items,
      setItems,
      containerTop,
      setContainerTop,
      containerBottom,
      setContainerBottom,
    }),
    [
      childrenArray,
      gap,
      draggable,
      activeElement,
      items,
      containerTop,
      containerBottom,
    ],
  );

  useEffect(() => {
    setChildrenArray(Children.toArray(contentChildren));
  }, [contentChildren]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
});

Provider.displayName = 'Draggable.Provider';
