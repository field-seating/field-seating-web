import { authApiClient } from 'lib/fetch';

const url = '/api/users/me';

const updateMe = ({ name }) => authApiClient.put(url, { name });

export default updateMe;
