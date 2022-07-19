import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { always, any, ifElse, isNil } from 'ramda';
import { useRouter } from 'next/router';
import qs from 'qs';

import getSpacePhotos, {
  url as getSpacePhotosUrl,
} from 'lib/fetch/spaces/get-photos';
import getField, {
  url as getFieldUrl,
  useFetchField,
} from 'lib/fetch/fields/get-field';
import getZone, {
  url as getZoneUrl,
  useFetchZone,
} from 'lib/fetch/fields/get-zone';
import getSpace, {
  url as getSpaceUrl,
  useFetchSpace,
} from 'lib/fetch/fields/get-space';
import SpacePhotos from 'components/space-photos';
import AppBar from 'components/ui/app-bar';
import UploadFloatingButton from 'components/space-photos/upload-floating-button';

export async function getServerSideProps({ query }) {
  const { spaceId } = query;
  const photosData = await getSpacePhotos(spaceId);
  const spaceData = await getSpace(spaceId);

  const { zoneId } = spaceData;
  const zoneData = await getZone(zoneId);

  const { fieldId } = zoneData;

  const fieldData = await getField(fieldId);

  return {
    props: {
      fallback: {
        [getSpacePhotosUrl(spaceId)]: photosData,
        [getSpaceUrl(spaceId)]: spaceData,
        [getZoneUrl(zoneId)]: zoneData,
        [getFieldUrl(fieldId)]: fieldData,
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

  const { data: zone } = useFetchZone(space?.zoneId);
  const { data: field } = useFetchField(zone?.fieldId);

  const title = renderTitle([field, zone]);

  const query = qs.stringify({ zone: space?.zoneId });
  return (
    <>
      <Head>
        <title>{`${title} | 球場坐座`}</title>
      </Head>

      <AppBar title={title} hasBackward backHref={`/?${query}`} />
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
