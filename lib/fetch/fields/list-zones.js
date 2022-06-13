import { apiClient, apiFetcher } from 'lib/fetch';
import useSWR from 'swr';

const url = (fieldId, orientationId, levelId) =>
  `/api/fields/${fieldId}/zones?orientationId=${orientationId}&levelId=${levelId}`;

const listZones = (fieldId, orientationId, levelId) =>
  apiClient.get(url(fieldId, orientationId, levelId));

export const useFetchZones = (fieldId, orientationId, levelId) => {
  const { data, error } = useSWR(
    fieldId ? url(fieldId, orientationId, levelId) : null,
    apiFetcher
  );

  return { data, error };
};

export default listZones;
