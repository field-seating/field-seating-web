import { apiClient } from 'lib/fetch';

const url = '/api/verify-email';

const verfiyEmail = (token) =>
  apiClient.patch(url, {
    token,
  });

export default verfiyEmail;
