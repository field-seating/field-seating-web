import { Box } from '@chakra-ui/react';
import { SWRConfig } from 'swr';

import AppBar from 'components/ui/app-bar';
import PhotoList from 'components/photo-list';
import getPhotos, { url as getPhotosUrl } from 'lib/fetch/photos/get-photos';

export async function getServerSideProps({ query }) {
  const { photoId } = query;
  const photosData = await getPhotos({ startPhotoId: photoId });

  return {
    props: {
      fallback: {
        [getPhotosUrl({ startPhotoId: photoId })]: photosData,
      },
    },
  };
}

const SpacePhotosPage = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <AppBar hasBackward backHref="/profile" />
      <Box>
        <PhotoList />
      </Box>
    </SWRConfig>
  );
};

export default SpacePhotosPage;
