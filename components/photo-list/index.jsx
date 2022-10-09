import { useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { isEmpty, pathOr } from 'ramda';

import { useFetchPhotos } from 'lib/fetch/photos/get-photos';
import PhotoCard from 'components/ui/photo-card';
import { getPhotoSrc } from 'lib/utils/image-srcset';
import EmptyState from 'components/space-photos/EmptyState';
import Prompt from 'components/ui/prompt';
import usePrompt from 'components/ui/prompt/usePrompt';
import useSnackbar from 'components/ui/snackbar';
import reportPhoto from 'lib/fetch/photos/report-photo';

import { generateAnonymousName } from './helpers';

const getPhotos = pathOr([], ['photos']);

const PhotoList = () => {
  const router = useRouter();
  const { photoId } = router.query;
  const { data } = useFetchPhotos({ startPhotoId: photoId });
  const promptPayload = usePrompt();
  const snackbar = useSnackbar();

  const reportPhotoFunc = useCallback(
    (photoId) => {
      reportPhoto(photoId).then(() => {
        snackbar({ text: '回報成功' });
      });
    },
    [snackbar]
  );

  const photos = getPhotos(data);

  if (isEmpty(photos)) {
    return <EmptyState />;
  }

  return (
    <Box display="flex" flexDir="column">
      {photos.map((photo) => {
        const { user, id, date, usefulCount, uselessCount } = photo;
        const { src, srcSet, sizes } = getPhotoSrc(photo.dataset);

        const userName = user ? user.name : generateAnonymousName();
        return (
          <Box key={id} mb="8">
            <PhotoCard
              src={src}
              srcSet={srcSet}
              sizes={sizes}
              alt={`photo uploaded by ${userName}`}
              userName={userName}
              thumbUp={usefulCount}
              thumbDown={uselessCount}
              date={date}
              hideRate
              hasAction
              menuList={[
                {
                  title: '回報',
                  onClick: () => {
                    promptPayload.onOpen({
                      title: '回報圖片',
                      description: '送出後管理員將會審查該圖片是否違反規定',
                      onSubmit: () => reportPhotoFunc(id),
                    });
                  },
                },
              ]}
            />
          </Box>
        );
      })}
      <Prompt
        isOpen={promptPayload.isOpen}
        onClose={promptPayload.onClose}
        onSubmit={promptPayload.onSubmit}
        title={promptPayload.title}
        description={promptPayload.description}
      />
    </Box>
  );
};

export default PhotoList;
