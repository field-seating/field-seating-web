import matchRoute from './match-route';

describe('match-route', () => {
  describe('exact', () => {
    it('should be matched for the exactly same route in exact mode', () => {
      const matchFunc = matchRoute({ exact: true })({ pathname: '/profile' });
      expect(matchFunc('/profile')).toBe(true);
    });

    it('should not be matched for the same path with subpath in exact mode', () => {
      const matchFunc = matchRoute({ exact: true })({
        pathname: '/profile/sign-in',
      });
      expect(matchFunc('/profile')).toBe(false);
    });

    it('should be matched for the same path in non exact mode', () => {
      const matchFunc = matchRoute({ exact: false })({ pathname: '/profile' });
      expect(matchFunc('/profile')).toBe(true);
    });

    it('should be matched for the same path with subpath in non exact mode', () => {
      const matchFunc = matchRoute({ exact: false })({
        pathname: '/profile/sign-in',
      });
      expect(matchFunc('/profile')).toBe(true);
    });

    it('should not be matched for the different path with subpath in non exact mode', () => {
      const matchFunc = matchRoute({ exact: false })({
        pathname: '/lookup/profile',
      });
      expect(matchFunc('/profile')).toBe(false);
    });

    it('should not be matched for a root path rule with path not root in non exact mode', () => {
      const matchFunc = matchRoute({ exact: false })({
        pathname: '/lookup',
      });
      expect(matchFunc('/')).toBe(false);
    });
  });
});
