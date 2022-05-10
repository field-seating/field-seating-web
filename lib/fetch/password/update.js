import { apiClient } from 'lib/fetch';

const url = '/api/password';

const updatePassword = (token, newPassword) =>
  apiClient.put(url, {
    token,
    newPassword,
  });

export default updatePassword;
