import { apiClient, apiFetcher } from 'lib/fetch';
import useSWR from 'swr';

const url = (zoneId) => `/api/zones/${zoneId}`;

const getZone = () => apiClient.get(url);

export const useFetchZone = (zoneId) => {
  const { data, error } = useSWR(zoneId ? url(zoneId) : null, apiFetcher);

  return { data, error };
};

export default getZone;
