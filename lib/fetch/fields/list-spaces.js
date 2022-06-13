import { apiClient, apiFetcher } from 'lib/fetch';
import useSWR from 'swr';

const url = (zoneId) => `/api/zones/${zoneId}/spaces`;

const listSpaces = (zoneId) => apiClient.get(url(zoneId));

export const useFetchSpaces = (zoneId) => {
  const key = zoneId ? url(zoneId) : null;

  const { data, error } = useSWR(key, apiFetcher);

  return { data, error };
};

export default listSpaces;
