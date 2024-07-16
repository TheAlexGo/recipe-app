import { IMAGE_PLACEHOLDER } from '@/utils/image';
import { createClient } from '@/utils/supabase/client';

export const useLoadImage = (storage: string, imageUrl?: string) => {
  if (!imageUrl) {
    return IMAGE_PLACEHOLDER;
  }
  const supabaseClient = createClient();

  const { data } = supabaseClient.storage.from(storage).getPublicUrl(imageUrl);

  return data.publicUrl;
};
