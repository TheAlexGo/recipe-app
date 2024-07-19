import { SupabaseClient } from '@supabase/supabase-js';

import { getUser } from '@/actions/user';
import { Database } from '@/types/supabase';
import { catchError } from '@/utils/decorators';

export interface ITableDB {
  id: string | number;
  user_id: string;
}

export class BaseModel<T extends ITableDB> {
  protected readonly TABLE;

  protected IMAGES_STORAGE?: string;

  protected readonly supabase: SupabaseClient;

  constructor(
    supabase: SupabaseClient<Database>,
    table: string,
    imagesStorage?: string,
  ) {
    this.supabase = supabase;
    this.TABLE = table;
    this.IMAGES_STORAGE = imagesStorage;
  }

  protected fromTable() {
    return this.supabase.from(this.TABLE);
  }

  @catchError
  private fromImagesStorage() {
    if (!this.IMAGES_STORAGE) {
      throw new Error('IMAGES_STORAGE не объявлен!');
    }
    return this.supabase.storage.from(this.IMAGES_STORAGE);
  }

  @catchError
  async uploadImage(fileName: string, file: File) {
    const { data, error } = await this.fromImagesStorage().upload(
      fileName,
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
  async insert(
    item: Omit<T, 'id' | 'user_id' | 'created_at'>,
    withUserId = true,
  ): Promise<T> {
    const insertData = item;
    if (withUserId) {
      const user = await getUser();
      Object.assign(insertData, {
        user_id: user.id,
      });
    }

    const { data, error } = await this.fromTable().insert(insertData).select();

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
      .eq('id', itemId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
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

  @catchError
  async deleteById(id: number): Promise<T> {
    const { data, error } = await this.fromTable()
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
}
