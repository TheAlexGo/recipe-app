import { SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

import { getUser } from '@/actions/getUser';
import { catchError } from '@/utils/decorators';

export interface ITableDB {
  id: string | number;
  user_id: string;
}

export class BaseModel<T extends ITableDB> {
  protected readonly TABLE;

  protected IMAGES_STORAGE?: string;

  protected readonly supabase: SupabaseClient;

  constructor(supabase: SupabaseClient, table: string, imagesStorage?: string) {
    this.supabase = supabase;
    this.TABLE = table;
    this.IMAGES_STORAGE = imagesStorage;
  }

  protected fromTable() {
    return this.supabase.from(this.TABLE);
  }

  private fromImagesStorage() {
    if (!this.IMAGES_STORAGE) {
      throw new Error('IMAGES_STORAGE не объявлен!');
    }
    return this.supabase.storage.from(this.IMAGES_STORAGE);
  }

  @catchError
  async uploadImage(file: File) {
    const uniqueID = uuidv4();
    const { data, error } = await this.fromImagesStorage().upload(
      uniqueID,
      file,
      {
        cacheControl: '3600',
        upsert: false,
      },
    );

    if (error) {
      throw error;
    }

    return data!.path;
  }

  @catchError
  async deleteImage(filePath: string) {
    const { error } = await this.fromImagesStorage().remove([filePath]);

    if (error) {
      throw error;
    }
  }

  @catchError
  async insert(recipe: Omit<T, 'id' | 'user_id'>): Promise<T> {
    const user = await getUser();
    const { data, error } = await this.fromTable()
      .insert({
        ...recipe,
        user_id: user.id,
      })
      .select();

    if (error) {
      throw error;
    }

    return data![0];
  }

  @catchError
  async update(
    itemId: T['id'],
    item: Omit<T, 'id' | 'user_id'>,
  ): Promise<void> {
    const { data, error } = await this.fromTable()
      .update(item)
      .eq('id', itemId);

    if (error) {
      throw data;
    }
  }

  @catchError
  async select(itemId: T['id']): Promise<T> {
    const { data, error } = await this.fromTable().select().eq('id', itemId);

    if (error) {
      throw error;
    }

    return data![0];
  }

  @catchError
  async selectAll(): Promise<T[]> {
    const { data, error } = await this.fromTable().select();

    if (error) {
      throw error;
    }

    return data!;
  }

  @catchError
  async selectAllByUserId(): Promise<T[]> {
    const user = await getUser();
    const { data, error } = await this.fromTable()
      .select()
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return data!;
  }
}
