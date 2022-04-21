import { apiClient } from 'lib/fetch';

const url = '/api/users/info';

const usersInfo = () => apiClient.get(url);

export default usersInfo;
