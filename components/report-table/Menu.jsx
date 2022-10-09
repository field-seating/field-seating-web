import {
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from '@chakra-ui/react';

import { MoreVert } from '@mui/icons-material';

const MenuComp = () => {
  return (
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
        <MenuItem onClick={() => console.log('resolved')}>無爭議</MenuItem>
        <MenuItem onClick={() => console.log('deleted')}>刪除</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuComp;
