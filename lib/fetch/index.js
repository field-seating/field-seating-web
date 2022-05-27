import axios from 'axios';
import { get as getToken } from 'lib/storage/token';

export const apiClient = axios.create();

export const authApiClient = axios.create();

authApiClient.interceptors.request.use((config) => {
  const apiToken = getToken();
  if (apiToken) {
    config.headers.authorization = `Bearer ${apiToken}`;
  }
  return config;
});

export const apiFetcher = (...args) =>
  apiClient.get(...args).then((res) => res.data);

export const authApiFetcher = (...args) =>
  authApiClient.get(...args).then((res) => res.data);
