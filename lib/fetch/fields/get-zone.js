import { apiFetcher } from 'lib/fetch';
import useSWR from 'swr';

export const url = (zoneId) => `/api/zones/${zoneId}`;

const getZone = (zoneId) => apiFetcher(url(zoneId));

export const useFetchZone = (zoneId) => {
  const { data, error } = useSWR(zoneId ? url(zoneId) : null, apiFetcher);

  return { data, error };
};

export default getZone;
