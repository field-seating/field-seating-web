import { apiClient, apiFetcher } from 'lib/fetch';
import useSWR from 'swr';

const url = (fieldId) => `/api/fields/${fieldId}/levels`;

const listLevels = (fieldId) => apiClient.get(url(fieldId));

export const useFetchLevels = (fieldId) => {
  const { data, error } = useSWR(fieldId ? url(fieldId) : null, apiFetcher);

  return { data, error };
};

export default listLevels;
