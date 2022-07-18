import { apiClient, apiFetcher } from 'lib/fetch';
import useSWR from 'swr';

const url = (spaceId) => `/api/spaces/${spaceId}/photos`;

const getSpacePhotos = () => apiClient.get(url);

export const useFetchSpacePhotos = (spaceId) => {
  const { data, error } = useSWR(spaceId ? url(spaceId) : null, apiFetcher);

  return { data, error };
};

export default getSpacePhotos;
