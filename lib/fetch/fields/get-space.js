import { apiClient, apiFetcher } from 'lib/fetch';
import useSWR from 'swr';

const url = (spaceId) => `/api/spaces/${spaceId}`;

const getSpace = () => apiClient.get(url);

export const useFetchSpace = (spaceId) => {
  const { data, error } = useSWR(spaceId ? url(spaceId) : null, apiFetcher);

  return { data, error };
};

export default getSpace;
