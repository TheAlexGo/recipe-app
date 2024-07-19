import imageCompression, { Options } from 'browser-image-compression';

const defaultOptions: Options = {
  maxSizeMB: 1,
  fileType: 'image/webp',
};

export const compressFile = async (
  imageFile: File,
  options: Options = defaultOptions,
): Promise<File> => {
  const blob = await imageCompression(imageFile, options);

  return new File([blob], imageFile.name, {
    lastModified: blob.lastModified,
    type: blob.type,
  });
};

export const mutateInputFiles = (
  input: HTMLInputElement,
  files: File | File[],
) => {
  const dataTransfer = new DataTransfer();
  if ('length' in files) {
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
  } else {
    dataTransfer.items.add(files);
  }
  // eslint-disable-next-line no-param-reassign
  input.files = dataTransfer.files;
};
