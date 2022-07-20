import { useCallback, useContext } from 'react';
import { useSelector } from '@xstate/react';
import Router from 'next/router';
import qs from 'qs';

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

const useImageUpload = ({ spaceId } = {}) => {
  const { uploadStepperService, authService } = useContext(GlobalStateContext);

  const isReadyNotActive = useSelector(authService, selectReadyNotActive);
  const isAuthPreparing = useSelector(authService, selectPreparing);

  const snackbar = useSnackbar();

  const onFileInputChange = useCallback(
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

      Router.push(`/upload${qs.stringify({ space: spaceId })}`, {
        addQueryPrefix: true,
      });
    },
    [uploadStepperService, snackbar, spaceId]
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

  return {
    onClick,
    onFileInputChange,
  };
};

export default useImageUpload;
