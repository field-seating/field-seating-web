import { CloudUpload, Search, Inventory, Person } from '@mui/icons-material';

export const tabList = [
  {
    id: 'lookup',
    label: '查詢',
    Icon: Search,
    pathname: '/',
  },
  {
    id: 'upload',
    label: '上傳',
    Icon: CloudUpload,
    pathname: '/upload',
  },
  {
    id: 'inventory',
    label: '收藏',
    Icon: Inventory,
    pathname: '/inventory',
  },
  {
    id: 'profile',
    label: '檔案',
    Icon: Person,
    pathname: '/profile',
  },
];
