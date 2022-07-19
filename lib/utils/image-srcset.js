export const getSpacePhotoSrc = (photoDataset) => ({
  src: photoDataset.md,
  srcSet: `${photoDataset.xs}, ${photoDataset.sm} 1.5x, ${photoDataset.md} 2x, ${photoDataset.lg} 3x`,
});

export const getPhotoSrc = (photoDataset) => ({
  src: photoDataset.md,
  srcSet: `${photoDataset.sm}, ${photoDataset.md} 1.5x, ${photoDataset.lg} 2x`,
});
