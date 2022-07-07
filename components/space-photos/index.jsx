import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const SpacePhotos = () => {
  const router = useRouter();
  const { spaceId } = router.query;

  return <Box>{spaceId}</Box>;
};

export default SpacePhotos;
