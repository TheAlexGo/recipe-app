import { createClient } from '@/utils/supabase/client';

export const useLoadImage = (storage: string, imageUrl?: string) => {
  if (!imageUrl) {
    return 'https://placehold.co/600x400.png';
  }
  const supabaseClient = createClient();

  const { data } = supabaseClient.storage.from(storage).getPublicUrl(imageUrl);

  return data.publicUrl;
};
