import axios from 'axios';
import { get as getToken } from 'lib/storage/token';
import { isServerSide } from 'lib/utils/env';

export const apiClient = axios.create();

export const authApiClient = axios.create();

authApiClient.interceptors.request.use((config) => {
  const apiToken = getToken();
  if (apiToken) {
    config.headers.authorization = `Bearer ${apiToken}`;
  }
  return config;
});

const apiHost = process.env.API_HOST;

export const apiFetcher = (url) =>
  isServerSide()
    ? apiClient.get(`${apiHost}${url}`).then((res) => res.data?.data)
    : apiClient.get(url).then((res) => res.data?.data);

export const authApiFetcher = (url) =>
  isServerSide()
    ? authApiClient.get(`${apiHost}${url}`).then((res) => res.data?.data)
    : authApiClient.get(url).then((res) => res.data?.data);
