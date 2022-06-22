import { apiClient, apiFetcher } from 'lib/fetch';
import useSWR from 'swr';

const url = '/api/fields';

const listFields = () => apiClient.get(url);

export const useFetchFields = () => {
  const { data, error } = useSWR(url, apiFetcher);

  return { data, error };
};

export default listFields;
