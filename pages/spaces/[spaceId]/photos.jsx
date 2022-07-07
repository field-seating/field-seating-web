import { Box } from '@chakra-ui/react';

import SpacePhotos from 'components/space-photos';

const SpacePhotosPage = () => {
  return (
    <Box px={[4, 16, 32, 48]} py={4}>
      <SpacePhotos />
    </Box>
  );
};

export default SpacePhotosPage;
