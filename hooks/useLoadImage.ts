import { createClient } from '@/utils/supabase/client';

export const useLoadImage = (imageUrl: string) => {
  const supabaseClient = createClient();

  const { data: imageData } = supabaseClient.storage
    .from('product_images')
    .getPublicUrl(imageUrl);

  return imageData.publicUrl;
};
