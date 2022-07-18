import { Box, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { pathOr } from 'ramda';

import { useFetchSpacePhotos } from 'lib/fetch/spaces/get-photos';
import PhotoPreviewCard from 'components/ui/photo-preview-card';

const getPhotos = pathOr([], ['photos']);

const SpacePhotos = () => {
  const router = useRouter();
  const { spaceId } = router.query;

  // TODO: handle error
  const { data } = useFetchSpacePhotos(spaceId);

  return (
    <Box>
      <Grid
        templateColumns={['repeat(2, 1fr)']}
        rowGap="8"
        justifyItems="center"
      >
        {getPhotos(data).map((photo) => {
          const url = photo.dataset.lg;
          const id = photo.id;
          const { usefulCount, uselessCount } = photo;

          return (
            <PhotoPreviewCard
              key={id}
              src={url}
              alt={'photo'}
              thumbUp={usefulCount}
              thumbDown={uselessCount}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default SpacePhotos;
