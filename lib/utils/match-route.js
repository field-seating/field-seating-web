const matchRoute =
  ({ exact = true }) =>
  (router) =>
  (path) => {
    const isPathRoot = path === '/';

    if (isPathRoot) {
      return path === router.pathname;
    }

    if (exact) {
      return path === router.pathname;
    }

    const reg = new RegExp(`^${path}`);
    return reg.test(router.pathname);
  };

export default matchRoute;
