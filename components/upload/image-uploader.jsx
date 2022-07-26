import { CloudUpload } from '@mui/icons-material';
import { Box } from '@chakra-ui/react';
import useImageUpload from 'components/image-upload/use-image-upload';
import { clickUploadButton, viaMap } from 'lib/utils/tracking/event';
import BottomNavigationButton from 'components/ui/bottom-navigation-button';

const ImageUploader = ({ isActive }) => {
  const { onClick, onFileInputChange } = useImageUpload();
  return (
    <Box flex={1}>
      <label htmlFor="image-uploader">
        <BottomNavigationButton
          onClick={(e) => {
            onClick(e);

            clickUploadButton({ via: viaMap.bottomNavigationButton });
          }}
          as="div"
          label="上傳"
          icon={<CloudUpload />}
          isActive={isActive}
        />
        <input
          id="image-uploader"
          onChange={onFileInputChange}
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
