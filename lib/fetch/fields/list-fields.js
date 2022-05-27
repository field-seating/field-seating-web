import { apiClient } from 'lib/fetch';
import useSWR from 'swr';

import { fieldOptions } from './fake-data';

const url = '/api/fields';

const listFields = () => apiClient.get(url);

const mockFetcher = () => Promise.resolve(fieldOptions);

export const useFetchFields = () => {
  const { data, error } = useSWR(url, mockFetcher);

  return { data, error };
};

export default listFields;
