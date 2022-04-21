import matchRoute from './match-route';

describe('match-route', () => {
  describe('exact', () => {
    it('should be matched for the exactly same route in exact mode', () => {
      const matchFunc = matchRoute({ exact: true })('/profile');
      expect(matchFunc({ pathname: '/profile' })).toBe(true);
    });

    it('should not be matched for the same path with subpath in exact mode', () => {
      const matchFunc = matchRoute({ exact: true })('/profile');
      expect(matchFunc({ pathname: '/profile/sign-in' })).toBe(false);
    });

    it('should be matched for the same path in non exact mode', () => {
      const matchFunc = matchRoute({ exact: false })('/profile');
      expect(matchFunc({ pathname: '/profile' })).toBe(true);
    });

    it('should be matched for the same path with subpath in non exact mode', () => {
      const matchFunc = matchRoute({ exact: false })('/profile');
      expect(matchFunc({ pathname: '/profile/sign-in' })).toBe(true);
    });

    it('should not be matched for the different path with subpath in non exact mode', () => {
      const matchFunc = matchRoute({ exact: false })('/profile');
      expect(matchFunc({ pathname: '/lookup/profile' })).toBe(false);
    });
  });
});
