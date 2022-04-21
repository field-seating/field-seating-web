import { type, equals, isNil, always, any, head, toPairs } from 'ramda';
import matchRoute from './match-route';

const transformToPath = (value) => {
  //handle xstate object value; now support for two level object
  if (equals('Object')(type(value))) {
    const [k, v] = head(toPairs(value));
    return `${k}.${v}`;
  }

  return value;
};

export const validateRouteByMap = (map) => (value) => {
  const path = transformToPath(value);
  const allowList = map[path];

  if (isNil(allowList)) {
    return always(false);
  }

  return (pathname) => {
    return any(matchRoute({ exact: false })({ pathname }))(allowList);
  };
};
