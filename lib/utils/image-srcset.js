export const getSpacePhotoSrc = (photoDataset) => ({
  src: photoDataset.md,
  srcSet: `${photoDataset.sm} 400w, ${photoDataset.md} 800w, ${photoDataset.lg} 1600w`,
});

export const getPhotoSrc = (photoDataset) => ({
  srcSet: `${photoDataset.sm} 400w, ${photoDataset.md} 800w, ${photoDataset.lg} 1600w`,
});
