import { Box, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { pathOr, isEmpty } from 'ramda';

import { useFetchSpacePhotos } from 'lib/fetch/spaces/get-photos';
import PhotoPreviewCard from 'components/ui/photo-preview-card';
import { getSpacePhotoSrc } from 'lib/utils/image-srcset';

import EmptyState from './EmptyState';

const getPhotos = pathOr([], ['photos']);

const SpacePhotos = () => {
  const router = useRouter();
  const { spaceId } = router.query;

  // TODO: handle error
  const { data } = useFetchSpacePhotos(spaceId);
  const photos = getPhotos(data);

  if (isEmpty(photos)) {
    return <EmptyState />;
  }

  return (
    <Box>
      <Grid
        templateColumns={['repeat(2, 1fr)']}
        rowGap={['1', '2']}
        justifyItems="center"
        px={['1em', '2em', '2em', '2em', '16em']}
      >
        {photos.map((photo) => {
          const { src, srcSet } = getSpacePhotoSrc(photo.dataset);
          const id = photo.id;
          const { usefulCount, uselessCount } = photo;

          return (
            <PhotoPreviewCard
              key={id}
              src={src}
              srcSet={srcSet}
              alt={'photo'}
              thumbUp={usefulCount}
              thumbDown={uselessCount}
              href={`/photos/${id}`}
              hideRate
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default SpacePhotos;
