import { apiClient, apiFetcher } from 'lib/fetch';
import useSWR from 'swr';

const url = (fieldId) => `/api/fields/${fieldId}/orientations`;

const listOrientatins = (fieldId) => apiClient.get(url(fieldId));

export const useFetchOrientations = (fieldId) => {
  const { data, error } = useSWR(fieldId ? url(fieldId) : null, apiFetcher);
  return { data, error };
};

export default listOrientatins;
