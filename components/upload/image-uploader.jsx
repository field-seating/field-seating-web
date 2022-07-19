import { useCallback, useContext } from 'react';
import { useSelector } from '@xstate/react';
import { CloudUpload } from '@mui/icons-material';
import { Box } from '@chakra-ui/react';
import Router from 'next/router';

import BottomNavigationButton from 'components/ui/bottom-navigation-button';
import useSnackbar from 'components/ui/snackbar';
import { selectReadyNotActive, selectPreparing } from 'lib/machines/auth';
import { GlobalStateContext } from 'lib/contexts/global-state';

const FILES_LIMIT = 3;

const isFilesValid = (files) => {
  if (files.length > FILES_LIMIT) {
    return { valid: false, message: '請至多上傳三張圖片' };
  }

  return { valid: true };
};

const ImageUploader = ({ isActive }) => {
  const { uploadStepperService, authService } = useContext(GlobalStateContext);

  const isReadyNotActive = useSelector(authService, selectReadyNotActive);
  const isAuthPreparing = useSelector(authService, selectPreparing);

  const snackbar = useSnackbar();

  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      const files = e.target.files;

      if (files.length === 0) {
        return;
      }

      const { valid, message } = isFilesValid(files);

      if (!valid) {
        snackbar({ text: message, variant: 'error' });
        return;
      }

      uploadStepperService.send({ type: 'START_FLOW', imageFiles: files });

      Router.push('/upload?space=128');
    },
    [uploadStepperService, snackbar]
  );

  const onClick = useCallback(
    (e) => {
      if (isReadyNotActive) {
        e.preventDefault();
        snackbar({ text: '上傳前請先登入並且驗證信箱', variant: 'error' });
        Router.push('/profile');
        return;
      }

      if (isAuthPreparing) {
        e.preventDefault();
        return;
      }
    },
    [isReadyNotActive, isAuthPreparing, snackbar]
  );

  return (
    <Box flex={1}>
      <label htmlFor="image-uploader">
        <BottomNavigationButton
          onClick={onClick}
          as="div"
          label="上傳"
          icon={<CloudUpload />}
          isActive={isActive}
        />
        <input
          id="image-uploader"
          onChange={onChange}
          type="file"
          accept="image/*"
          name="files"
          multiple
          hidden
        />
      </label>
    </Box>
  );
};

export default ImageUploader;
