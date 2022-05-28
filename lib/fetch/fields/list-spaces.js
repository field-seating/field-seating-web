import { apiClient } from 'lib/fetch';
import useSWR from 'swr';
import { range, repeat } from 'ramda';

const url = (zoneId) => `/api/zones/${zoneId}/spaces`;

const listSpaces = (zoneId) => apiClient.get(url(zoneId));

const mockFetcher = (_, zoneId) => {
  const data = range(1, 51 + Number(zoneId)).reduce((acc, cCol) => {
    return acc.concat(
      repeat(null, 20).map((_, index) => ({
        id: index + (cCol - 1) * 20,
        colNumber: cCol,
        rowNumber: index + 1,
      }))
    );
  }, []);

  return Promise.resolve(data);
};

export const useFetchSpaces = (zoneId) => {
  const key = zoneId ? [url(zoneId), zoneId] : null;

  const { data, error } = useSWR(key, mockFetcher);

  return { data, error };
};

export default listSpaces;
