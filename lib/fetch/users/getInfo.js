import { authApiClient } from 'lib/fetch';

const url = '/api/users/info';

const usersInfo = () => authApiClient.get(url);

export default usersInfo;
