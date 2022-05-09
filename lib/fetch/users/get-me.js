import { authApiClient } from 'lib/fetch';

const url = '/api/users/me';

const getMe = () => authApiClient.get(url);

export default getMe;
