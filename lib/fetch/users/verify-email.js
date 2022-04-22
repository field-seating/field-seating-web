import { authApiClient } from 'lib/fetch';

const url = '/api/users/verify-email';

const usersVerifyEmail = () => authApiClient.post(url);

export default usersVerifyEmail;
