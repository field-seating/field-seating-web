import { Box } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import { always, any, ifElse, isNil } from 'ramda';
import { useRouter } from 'next/router';

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

const TopBar = () => {
  const router = useRouter();
  const { spaceId } = router.query;

  const { data: space } = useFetchSpace(spaceId);

  const { data: zone } = useFetchZone(space?.zoneId);
  const { data: field } = useFetchField(zone?.fieldId);
  return (
    <AppBar
      title={renderTitle([field, zone])}
      hasBackward
      backHref="/profile"
    />
  );
};

const SpacePhotosPage = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <TopBar />
      <Box px={[4, 16]} py={4}>
        <SpacePhotos />
      </Box>
    </SWRConfig>
  );
};

export default SpacePhotosPage;
