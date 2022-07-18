export const getPhotoSrc = (photoDataset) => ({
  src: photoDataset.md,
  srcSet: `${photoDataset.xs}, ${photoDataset.sm} 1.5x, ${photoDataset.md} 2x, ${photoDataset.lg} 3x`,
});
