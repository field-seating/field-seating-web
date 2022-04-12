import store from 'store2';

export const get = () => store.get('token');
export const set = (token) => store.set('token', token);
export const clear = () => store.clear('token');
