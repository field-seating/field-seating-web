import { useCallback } from 'react';
import { CloudUpload } from '@mui/icons-material';
import { Box } from '@chakra-ui/react';

import BottomNavigationButton from 'components/ui/bottom-navigation-button';

const ImageUploader = ({ isActive }) => {
  const onChange = useCallback((e) => {
    e.preventDefault();
    console.log(e.target.files);
  }, []);

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
