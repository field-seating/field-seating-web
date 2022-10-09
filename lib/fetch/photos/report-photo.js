import { apiClient } from 'lib/fetch';

const getUrl = (photoId) => `/api/photos/${photoId}/report`;

const reportPhoto = (photoId) => apiClient.post(getUrl(photoId));

export default reportPhoto;
