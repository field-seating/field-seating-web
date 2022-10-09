import { authApiFetcher } from 'lib/fetch';
import useSWR from 'swr';

export const url = () => `/api/admin/reports`;

export const useFetchReports = () => {
  const { data, error } = useSWR(url(), authApiFetcher);

  return { data, error };
};
