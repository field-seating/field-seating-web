import { apiClient, apiFetcher } from 'lib/fetch';
import useSWR from 'swr';

const url = (fieldId, orientationId, levelId) =>
  `/api/fields/${fieldId}/zones?orientation=${orientationId}&level=${levelId}`;

const listZones = (fieldId, orientationId, levelId) =>
  apiClient.get(url(fieldId, orientationId, levelId));

export const useFetchZones = (fieldId, orientationId, levelId) => {
  const valid = fieldId && orientationId && levelId;
  const { data, error } = useSWR(
    valid ? url(fieldId, orientationId, levelId) : null,
    apiFetcher
  );

  return { data, error };
};

export default listZones;
