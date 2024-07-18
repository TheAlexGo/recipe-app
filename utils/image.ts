export const IMAGE_PLACEHOLDER = 'https://placehold.co/600x400.png';

export const downloadImage = async (imageUrl: string): Promise<Blob> => {
  const response = await fetch(`${process.env.PROXY_URL}/${imageUrl}`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  return response.blob();
};
