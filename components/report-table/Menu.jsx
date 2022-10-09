import { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from '@chakra-ui/react';

import { MoreVert } from '@mui/icons-material';
import resolveReport from 'lib/fetch/admin/resolve-report';

const MenuComp = ({ reportId, onPromptOpen, revalidate }) => {
  const resolveToNoIssue = useCallback(() => {
    onPromptOpen({
      title: '處理為「無爭議」',
      description: '注意：同一張照片的回報紀錄將會一併處理',
      onSubmit: () => resolveReport(reportId, 'no_issue').then(revalidate),
    });
  }, [revalidate, reportId, onPromptOpen]);

  const resolveToDeleted = useCallback(() => {
    onPromptOpen({
      title: '處理為「刪除照片」',
      description: '注意：同一張照片的回報紀錄將會一併處理',
      onSubmit: () => resolveReport(reportId, 'deleted').then(revalidate),
    });
  }, [revalidate, reportId, onPromptOpen]);

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
        <MenuItem onClick={resolveToNoIssue}>無爭議</MenuItem>
        <MenuItem onClick={resolveToDeleted}>刪除</MenuItem>
      </MenuList>
    </Menu>
  );
};

MenuComp.propTypes = {
  reportId: PropTypes.number,
  onPromptOpen: PropTypes.func,
  revalidate: PropTypes.func,
};

export default MenuComp;
