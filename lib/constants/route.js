import { Search, Person } from '@mui/icons-material';
import ImageUploader from 'components/upload/image-uploader';

export const tabList = [
  {
    id: 'lookup',
    label: '查詢',
    Icon: Search,
    pathname: '/',
  },
  {
    id: 'upload',
    pathname: '/upload',
    Component: ImageUploader,
  },
  //{
  //id: 'inventory',
  //label: '收藏',
  //Icon: Inventory,
  //pathname: '/inventory',
  //},
  {
    id: 'profile',
    label: '檔案',
    Icon: Person,
    pathname: '/profile',
  },
];

export const authStateRouteMap = {
  init: ['/', '/profile'],
  setup: ['/', '/profile'],
  anonymous: ['/', '/profile'],
  'login.inactive': ['/', '/profile', '/upload'],
  'login.active': ['/', '/profile', '/upload', '/inventory'],
};
