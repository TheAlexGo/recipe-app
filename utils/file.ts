import imageCompression from 'browser-image-compression';

const defaultOptions = {
  maxSizeMB: 1,
};

export const compressFile = async (
  imageFile: File,
  options = defaultOptions,
): Promise<File> => {
  const blob = await imageCompression(imageFile, options);

  return new File([blob], imageFile.name, {
    lastModified: imageFile.lastModified,
    type: imageFile.type,
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
