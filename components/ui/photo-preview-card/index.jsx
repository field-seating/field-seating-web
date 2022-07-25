import { Image, Box, Skeleton, Text, Icon } from '@chakra-ui/react';
import { useCallback, forwardRef } from 'react';
import { useMachine } from '@xstate/react';
import NextLink from 'next/link';
import { ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';

import machine, { selectLoaded } from './machine';

const RateNumber = ({ children }) => (
  <Text fontSize={['xs', 'md']}>{children}</Text>
);

const RateIcon = ({ as }) => <Icon boxSize={['3', '6']} as={as} mr="1" />;

const CustomImage = forwardRef(({ alt, ...props }, ref) => (
  <Image
    loading="lazy"
    objectFit="cover"
    width="100%"
    height="100%"
    ref={ref}
    alt={alt}
    {...props}
  />
));

CustomImage.displayName = 'CustomImage';

const ImageLink = ({ href, src, srcSet, onError, onLoad, alt }) => {
  if (href) {
    return (
      <NextLink href={href} passHref>
        <a>
          <CustomImage
            src={src}
            srcSet={srcSet}
            onError={onError}
            onLoad={onLoad}
            alt={alt}
          />
        </a>
      </NextLink>
    );
  }

  return (
    <CustomImage
      src={src}
      srcSet={srcSet}
      onError={onError}
      onLoad={onLoad}
      alt={alt}
    />
  );
};

const PhotoPreviewCard = ({
  thumbUp,
  thumbDown,
  src,
  alt,
  hideRate,
  srcSet,
  href,
}) => {
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
      w={['160px', '320px', '360px', '480px']}
      display="flex"
      flexDir="column"
      borderColor="onSurface.light"
      borderWidth="1px"
      borderRadius="base"
      overflow="hidden"
    >
      <Skeleton isLoaded={isLoaded}>
        <Box w="100%" h={['120px', '240px', '270px', '360px']}>
          <ImageLink
            href={href}
            src={src}
            srcSet={srcSet}
            alt={alt}
            onError={onError}
            onLoad={onLoad}
          />
        </Box>
      </Skeleton>

      {!hideRate && (
        <Box
          display="flex"
          justifyContent="space-between"
          h={['8', '16', '16', '24']}
          px={['2', '8']}
        >
          <Box display="flex" alignItems="center">
            <RateIcon as={ThumbUpOutlined} mr="1" />
            <RateNumber>{thumbUp}</RateNumber>
          </Box>
          <Box display="flex" alignItems="center">
            <RateIcon as={ThumbDownOutlined} mr="1" />
            <RateNumber>{thumbDown}</RateNumber>
          </Box>
        </Box>
      )}
    </Box>
  );
};

PhotoPreviewCard.defaultProps = {
  src: '',
  alt: 'photo in the field',
  hideRate: false,
  thumbUp: 0,
  thumbDown: 0,
};

export default PhotoPreviewCard;
