import { SupabaseClient } from '@supabase/supabase-js';

import { BaseModel } from '@/actions/models/base';
import { IFridgeDB } from '@/types/db';
import { Database } from '@/types/supabase';

export class Fridge extends BaseModel<IFridgeDB> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'fridge');
  }
}
