import { apiClient } from 'lib/fetch';

const url = '/api/users';

const signUp = (name, email, password) =>
  apiClient.post(url, {
    name,
    email,
    password,
  });

export default signUp;
