import { IProductDB } from '@/types/db';

export type AddHandler = (product: IProductDB) => void;
export type RemoveHandler = (product: IProductDB) => void;
