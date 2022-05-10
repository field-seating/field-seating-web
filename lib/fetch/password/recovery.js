import { apiClient } from 'lib/fetch';

const url = '/api/password/recovery';

const recoveryPassword = (email) =>
  apiClient.post(url, {
    email,
  });

export default recoveryPassword;
