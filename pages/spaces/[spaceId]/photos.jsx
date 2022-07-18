import { Box } from '@chakra-ui/react';
import { SWRConfig } from 'swr';

import getSpacePhotos from 'lib/fetch/spaces/get-photos';
import SpacePhotos from 'components/space-photos';

export async function getServerSideProps({ query }) {
  const { spaceId } = query;
  const photosData = await getSpacePhotos(spaceId);

  return {
    props: {
      fallback: {
        [`/api/spaces/${spaceId}/photos`]: photosData,
      },
    },
  };
}
const SpacePhotosPage = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Box px={[4, 16]} py={4}>
        <SpacePhotos />
      </Box>
    </SWRConfig>
  );
};

export default SpacePhotosPage;
