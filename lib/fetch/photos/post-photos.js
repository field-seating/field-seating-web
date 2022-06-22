import { authApiClient } from 'lib/fetch';

const url = '/api/photos';

const postPhotos = (imageFiles, spaceId, datetime) => {
  const formData = new FormData();

  Array.from(imageFiles).forEach((imageFile) => {
    formData.append('images', imageFile);
  });

  formData.append('spaceId', spaceId);
  formData.append('date', datetime);

  return authApiClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default postPhotos;
