import {
  Image,
  Box,
  Skeleton,
  Text,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from '@chakra-ui/react';
import { useCallback, forwardRef } from 'react';
import { useMachine } from '@xstate/react';
import NextLink from 'next/link';
import {
  ThumbDownOutlined,
  ThumbUpOutlined,
  MoreVert,
} from '@mui/icons-material';

import machine, { selectLoaded } from '../photo-preview-card/machine';
import { renderDate } from './helpers';

const RateNumber = ({ children }) => <Text fontSize={['xs']}>{children}</Text>;

const RateIcon = ({ as }) => <Icon boxSize={['3']} as={as} mr="1" />;

const CustomImage = forwardRef(({ alt, ...props }, ref) => (
  <Image
    loading="lazy"
    objectFit="contain"
    width="100%"
    height="100%"
    background="onSurface.lighter"
    ref={ref}
    alt={alt}
    {...props}
  />
));

CustomImage.displayName = 'CustomImage';

const ImageLink = ({ href, src, srcSet, onError, onLoad, alt, sizes }) => {
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
            sizes={sizes}
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
      sizes={sizes}
    />
  );
};

const PhotoCard = ({
  thumbUp,
  thumbDown,
  src,
  alt,
  srcSet,
  sizes,
  href,
  userName,
  date,
  hideRate,
  hasAction,
  menuList,
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
      w="100%"
      display="flex"
      flexDir="column"
      borderBottomColor="onSurface.light"
      borderBottomWidth="1px"
      overflow="hidden"
      bg="surface.main"
    >
      <Skeleton isLoaded={isLoaded}>
        <Box h={['320px', '480px']}>
          <ImageLink
            href={href}
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            onError={onError}
            onLoad={onLoad}
          />
        </Box>
      </Skeleton>

      <Box py="1">
        <Box display="flex" h="6" px="4" alignItems="center">
          <Text color="onSurface.main" fontSize="sm">
            {userName}
          </Text>
        </Box>
        <Box display="flex" h="6" px="4" alignItems="center">
          <Text color="onSurface.40" fontSize="xs">
            {renderDate(date)}
          </Text>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          h={['8']}
          px={['4']}
        >
          {!hideRate && (
            <Box display="flex">
              <Box display="flex" alignItems="center" mr="4">
                <RateIcon as={ThumbUpOutlined} />
                <RateNumber>{thumbUp}</RateNumber>
              </Box>
              <Box display="flex" alignItems="center">
                <RateIcon as={ThumbDownOutlined} />
                <RateNumber>{thumbDown}</RateNumber>
              </Box>
            </Box>
          )}
          {hasAction && (
            <Box display="flex">
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<MoreVert />}
                  bg="surface"
                  color="primary.main"
                  variant="ghost"
                  _hover={{
                    bg: 'primary.transparent',
                    borderColor: 'primary.main',
                  }}
                  _active={{
                    bg: 'surface',
                    borderColor: 'primary.main',
                  }}
                  _focus={{
                    bg: 'surface',
                    boxShadow: 'onSurface',
                  }}
                />
                <MenuList>
                  {menuList.map(({ title, onClick, icon }, index) => (
                    <MenuItem key={index} icon={icon} onClick={onClick}>
                      {title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

PhotoCard.defaultProps = {
  src: '',
  alt: 'photo in the field',
  thumbUp: 0,
  thumbDown: 0,
  date: '',
  userName: '',
  hideRate: false,
  hasAction: true,
  menuList: [],
};

export default PhotoCard;
