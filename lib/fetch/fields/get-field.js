import { apiClient, apiFetcher } from 'lib/fetch';
import useSWR from 'swr';

const url = (fieldId) => `/api/fields/${fieldId}`;

const getField = () => apiClient.get(url);

export const useFetchField = (fieldId) => {
  const { data, error } = useSWR(fieldId ? url(fieldId) : null, apiFetcher);

  return { data, error };
};

export default getField;
