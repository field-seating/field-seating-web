const matchRoute =
  ({ exact = true }) =>
  (path) =>
  (router) => {
    if (exact) {
      return path === router.pathname;
    }

    const reg = new RegExp(`^${path}`);
    return reg.test(router.pathname);
  };

export default matchRoute;
