import { useCallback } from 'react';
import { Image, Box, Skeleton, Text, Icon } from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import { ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';

import machine, { selectLoaded } from './machine';

const RateNumber = ({ children }) => (
  <Text fontSize={['xs', 'lg']}>{children}</Text>
);

const RateIcon = ({ as }) => <Icon boxSize={['3', '6']} as={as} mr="1" />;

const PhotoPreviewCard = ({ thumbUp, thumbDown, src, alt }) => {
  const [current, send] = useMachine(machine);
  const onLoad = useCallback(() => {
    send('LOADED');
  }, [send]);

  const onError = useCallback(() => {
    send('ERROR');
  }, [send]);

  const isLoaded = selectLoaded(current);

  return (
    <Box
      w={['160px', '320px', '320px', '480px']}
      display="flex"
      flexDir="column"
      borderColor="onSurface.light"
      borderWidth="1px"
      borderRadius="base"
      overflow="hidden"
    >
      <Skeleton isLoaded={isLoaded}>
        <Box w="100%" h={['120px', '240px', '240px', '360px']}>
          <Image
            src={src}
            alt={alt}
            loading="lazy"
            objectFit="cover"
            width="100%"
            height="100%"
            onError={onError}
            onLoad={onLoad}
          />
        </Box>
      </Skeleton>

      <Box
        display="flex"
        justifyContent="space-between"
        h={['8', '16', '16', '24']}
        px={['2', '8']}
      >
        <Box display="flex" alignItems="center">
          <RateIcon boxSize="11px" as={ThumbUpOutlined} mr="1" />
          <RateNumber>{thumbUp}</RateNumber>
        </Box>
        <Box display="flex" alignItems="center">
          <RateIcon boxSize="11px" as={ThumbDownOutlined} mr="1" />
          <RateNumber>{thumbDown}</RateNumber>
        </Box>
      </Box>
    </Box>
  );
};

PhotoPreviewCard.defaultProps = {
  src: '',
  alt: 'photo in the field',
};

export default PhotoPreviewCard;
