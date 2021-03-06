import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { always, any, ifElse, isNil } from 'ramda';
import { useRouter } from 'next/router';
import qs from 'qs';

import getSpacePhotos, {
  url as getSpacePhotosUrl,
} from 'lib/fetch/spaces/get-photos';
import getSpace, {
  url as getSpaceUrl,
  useFetchSpace,
} from 'lib/fetch/fields/get-space';
import SpacePhotos from 'components/space-photos';
import AppBar from 'components/ui/app-bar';
import UploadFloatingButton from 'components/space-photos/upload-floating-button';

export async function getServerSideProps({ query }) {
  const { spaceId } = query;

  const [photosData, spaceData] = await Promise.all([
    getSpacePhotos(spaceId),
    getSpace(spaceId),
  ]);

  return {
    props: {
      fallback: {
        [getSpacePhotosUrl(spaceId)]: photosData,
        [getSpaceUrl(spaceId)]: spaceData,
      },
    },
  };
}

const anyNil = any(isNil);
const renderTitle = ifElse(
  anyNil,
  always(''),
  ([field, zone]) => `${field.name} ${zone.name}`
);

const TopBar = ({ spaceId }) => {
  const { data: space } = useFetchSpace(spaceId);

  const title = renderTitle([space?.zone?.field, space?.zone]);

  const query = qs.stringify({ zone: space?.zoneId }, { addQueryPrefix: true });
  return (
    <>
      <Head>
        <title>{`${title} | 球場坐座`}</title>
      </Head>

      <AppBar title={title} hasBackward backHref={`/${query}`} />
    </>
  );
};

const SpacePhotosPage = ({ fallback }) => {
  const router = useRouter();
  const { spaceId } = router.query;

  return (
    <SWRConfig value={{ fallback }}>
      <Box display="flex" flexDir="column" h="100%">
        <TopBar spaceId={spaceId} />
        <Box px={[4, 16]} py={4} flex="1" overflowY="auto" pos="relative">
          <SpacePhotos />
          <UploadFloatingButton spaceId={spaceId} />
        </Box>
      </Box>
    </SWRConfig>
  );
};

export default SpacePhotosPage;
