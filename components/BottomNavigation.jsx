import { Box, IconButton } from '@chakra-ui/react';
import { CloudUpload, Search, Inventory, Person } from '@mui/icons-material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const tabList = [
  {
    id: 'lookup',
    label: '查詢',
    Icon: Search,
    route: '/',
  },
  {
    id: 'upload',
    label: '上傳',
    Icon: CloudUpload,
    route: '/upload',
  },
  {
    id: 'inventory',
    label: '收藏',
    Icon: Inventory,
    route: '/inventory',
  },
  {
    id: 'profile',
    label: '檔案',
    Icon: Person,
    route: '/profile',
  },
];

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <Box as="nav" display="flex">
      {tabList.map(tab => (
        <NextLink key={tab.id} href={tab.route} passHref>
          <IconButton
            as="a"
            flex="1"
            _hover={{
              bg: 'primary.main',
            }}
            _active={{
              bg: undefined,
              color: 'onPrimary.main',
            }}
            _focus={{
              boxShadow: undefined,
            }}
            icon={<tab.Icon />}
            aria-label={tab.label}
            borderRadius={0}
            h="56px"
            bg="primary.main"
            color="onPrimary.transparent"
            isActive={tab.route === pathname}
          />
        </NextLink>
      ))}
    </Box>
  );
};

export default BottomNavigation;
