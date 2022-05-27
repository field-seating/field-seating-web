import { apiClient } from 'lib/fetch';
import useSWR from 'swr';
import { range } from 'ramda';

const url = (fieldId, orientationId, levelId) =>
  `/api/fields/${fieldId}?orientation=${orientationId}&level=${levelId}`;

const listZones = (fieldId, orientationId, levelId) =>
  apiClient.get(url(fieldId, orientationId, levelId));

const mockFetcher = (_, fieldId, orientationId, levelId) =>
  Promise.resolve(
    range(1, 11).map((id) => ({
      id,
      name: `${fieldId}-${orientationId}-${levelId}-${id}`,
    }))
  );

export const useFetchZones = (fieldId, orientationId, levelId) => {
  const { data, error } = useSWR(
    fieldId
      ? [url(fieldId, orientationId, levelId), fieldId, orientationId, levelId]
      : null,
    mockFetcher
  );

  return { data, error };
};

export default listZones;
