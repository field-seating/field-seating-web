import { useCallback, useContext } from 'react';
import { CloudUpload } from '@mui/icons-material';
import { Box } from '@chakra-ui/react';
import Router from 'next/router';

import BottomNavigationButton from 'components/ui/bottom-navigation-button';
import ImageUploadContext from 'lib/contexts/image-upload';
import useSnackbar from 'components/ui/snackbar';

const FILES_LIMIT = 3;

const isFilesValid = (files) => {
  if (files.length > FILES_LIMIT) {
    return { valid: false, message: '請至多上傳三張圖片' };
  }

  return { valid: true };
};

const ImageUploader = ({ isActive }) => {
  const { setImages } = useContext(ImageUploadContext);
  const snackbar = useSnackbar();

  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      const files = e.target.files;
      console.log(files);

      if (files.length === 0) {
        return;
      }

      const { valid, message } = isFilesValid(files);

      if (!valid) {
        snackbar({ text: message, variant: 'error' });
        return;
      }

      setImages(files);
      Router.push('/upload');
    },
    [setImages, snackbar]
  );

  return (
    <Box flex={1}>
      <label htmlFor="image-uploader">
        <BottomNavigationButton
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
