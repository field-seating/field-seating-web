import { AddIcon } from '@chakra-ui/icons';

import FloatingIconButton from 'components/ui/floating-icon-button';
import useImageUpload from 'components/image-upload/use-image-upload';
import { clickUploadButton, viaMap } from 'lib/utils/tracking/event';

const UploadFloatingButton = ({ spaceId }) => {
  const { onClick, onFileInputChange } = useImageUpload({ spaceId });

  return (
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
  );
};

export default UploadFloatingButton;
