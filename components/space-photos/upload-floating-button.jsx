import { AddIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

import FloatingIconButton from 'components/ui/floating-icon-button';
import useImageUpload from 'components/image-upload/use-image-upload';
import { clickUploadButton, viaMap } from 'lib/utils/tracking/event';

const UploadFloatingButton = ({ spaceId }) => {
  const { onClick, onFileInputChange } = useImageUpload({ spaceId });

  return (
    <Box pos="absolute" right="4" bottom="4">
      <label htmlFor="space-image-uploader">
        <FloatingIconButton
          as="div"
          size="sm"
          onClick={(e) => {
            onClick(e);
            clickUploadButton({ via: viaMap.spacePhotosFloatingButton });
          }}
          label="上傳照片"
        >
          <AddIcon />
        </FloatingIconButton>
        <input
          id="space-image-uploader"
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

export default UploadFloatingButton;
