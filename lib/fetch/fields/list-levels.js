import { apiClient } from 'lib/fetch';
import useSWR from 'swr';

import { levelMap } from './fake-data';

const url = (fieldId) => `/api/fields/${fieldId}/levels`;

const listLevels = (fieldId) => apiClient.get(url(fieldId));

const mockFetcher = (_, fieldId) => Promise.resolve(levelMap[fieldId]);

export const useFetchLevels = (fieldId) => {
  const { data, error } = useSWR(
    fieldId ? [url(fieldId), fieldId] : null,
    mockFetcher
  );

  return { data, error };
};

export default listLevels;
