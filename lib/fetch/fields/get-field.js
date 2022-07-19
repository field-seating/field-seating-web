import { apiFetcher } from 'lib/fetch';
import useSWR from 'swr';

export const url = (fieldId) => `/api/fields/${fieldId}`;

const getField = (fieldId) => apiFetcher(url(fieldId));

export const useFetchField = (fieldId) => {
  const { data, error } = useSWR(fieldId ? url(fieldId) : null, apiFetcher);

  return { data, error };
};

export default getField;
