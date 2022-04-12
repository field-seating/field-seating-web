import { apiClient } from 'lib/fetch';

const url = '/api/signin';

const signIn = (email, password) =>
  apiClient.post(url, {
    email,
    password,
  });

export default signIn;
