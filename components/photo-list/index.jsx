import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { pathOr } from 'ramda';

import { useFetchPhotos } from 'lib/fetch/photos/get-photos';
import PhotoCard from 'components/ui/photo-card';
import { getPhotoSrc } from 'lib/utils/image-srcset';

const getPhotos = pathOr([], ['photos']);

const PhotoList = () => {
  const router = useRouter();
  const { photoId } = router.query;
  const { data } = useFetchPhotos({ startPhotoId: photoId });

  return (
    <Box display="flex" flexDir="column">
      {getPhotos(data).map((photo) => {
        const { user, id, date, usefulCount, uselessCount } = photo;
        const { src, srcSet, sizes } = getPhotoSrc(photo.dataset);
        return (
          <Box key={id} mb="8">
            <PhotoCard
              src={src}
              srcSet={srcSet}
              sizes={sizes}
              alt={`photo uploaded by ${user.name}`}
              userName={user.name}
              thumbUp={usefulCount}
              thumbDown={uselessCount}
              date={date}
              hideRate
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default PhotoList;
