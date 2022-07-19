import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';

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

const PhotosPage = ({ fallback }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>球場照片 | 球場坐座</title>
      </Head>

      <SWRConfig value={{ fallback }}>
        <Box display="flex" flexDir="column" h="100%">
          <AppBar hasBackward onBack={() => router.back()} />
          <Box flex="1" overflowY="auto">
            <PhotoList />
          </Box>
        </Box>
      </SWRConfig>
    </>
  );
};

export default PhotosPage;
