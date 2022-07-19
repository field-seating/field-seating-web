export const getSpacePhotoSrc = (photoDataset) => ({
  src: photoDataset.md,
  srcSet: `${photoDataset.xs}, ${photoDataset.sm} 1.5x, ${photoDataset.md} 2x, ${photoDataset.lg} 3x`,
});

export const getPhotoSrc = (photoDataset) => ({
  srcSet: `${photoDataset.sm} 400w, ${photoDataset.md} 800w, ${photoDataset.lg} 1600w`,
});
