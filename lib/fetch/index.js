import axios from 'axios';
import { get as getToken } from 'lib/storage/token';

export const apiClient = axios.create();

apiClient.interceptors.request.use((config) => {
  const apiToken = getToken();
  if (apiToken) {
    config.headers.authorization = `Bearer ${apiToken}`;
  }
  return config;
});
