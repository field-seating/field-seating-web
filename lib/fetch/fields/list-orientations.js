import { apiClient } from 'lib/fetch';
import useSWR from 'swr';

import { orientationMap } from './fake-data';

const url = (fieldId) => `/api/fields/${fieldId}/orientations`;

const listOrientatins = (fieldId) => apiClient.get(url(fieldId));

const mockFetcher = (_, fieldId) =>
  Promise.resolve(orientationMap[Number(fieldId)]);

export const useFetchOrientations = (fieldId) => {
  const { data, error } = useSWR(
    fieldId ? [url(fieldId), fieldId] : null,
    mockFetcher
  );
  return { data, error };
};

export default listOrientatins;
