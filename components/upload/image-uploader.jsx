import { useCallback, useContext } from 'react';
import { useActor } from '@xstate/react';
import { CloudUpload } from '@mui/icons-material';
import { Box } from '@chakra-ui/react';
import Router from 'next/router';

import BottomNavigationButton from 'components/ui/bottom-navigation-button';
import useSnackbar from 'components/ui/snackbar';
import { selectLoginActive } from 'lib/machines/auth';
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
  const [authState] = useActor(authService);
  const [, sendToUploadStepperActor] = useActor(uploadStepperService);

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

      sendToUploadStepperActor({ type: 'START_FLOW', imageFiles: files });

      Router.push('/upload');
    },
    [sendToUploadStepperActor, snackbar]
  );

  const onClick = useCallback(
    (e) => {
      if (selectLoginActive(authState)) {
        return;
      }
      e.preventDefault();
      snackbar({ text: '上傳前請先登入', variant: 'error' });
    },
    [authState, snackbar]
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
