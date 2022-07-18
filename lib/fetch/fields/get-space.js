import { apiFetcher } from 'lib/fetch';
import useSWR from 'swr';

export const url = (spaceId) => `/api/spaces/${spaceId}`;

const getSpace = (spaceId) => apiFetcher(url(spaceId));

export const useFetchSpace = (spaceId) => {
  const { data, error } = useSWR(spaceId ? url(spaceId) : null, apiFetcher);

  return { data, error };
};

export default getSpace;
