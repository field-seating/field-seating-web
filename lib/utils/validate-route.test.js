import { validateRouteByMap } from './validate-route';

describe('validateRouteByMap', () => {
  const map = {
    state1: ['/', '/foo', '/bar'],
    state2: ['/'],
    state3: ['/', '/info'],
    'state4.state1': ['/', '/profile'],
  };

  it('should be matched when path is included in map', () => {
    const value = 'state1';
    const validate = validateRouteByMap(map)(value);

    expect(validate('/foo')).toBe(true);
  });

  it('should not be matched when path is not included in map', () => {
    const value = 'state1';
    const validate = validateRouteByMap(map)(value);

    expect(validate('/info')).toBe(false);
  });

  it('should not be matched when value is not in map', () => {
    const value = 'state5';
    const validate = validateRouteByMap(map)(value);

    expect(validate('/info')).toBe(false);
  });
  describe('xstate object value', () => {
    it('should be matched when path is included in map', () => {
      const value = { state4: 'state1' };
      const validate = validateRouteByMap(map)(value);

      expect(validate('/profile')).toBe(true);
    });

    it('should not be matched when path is not included in map', () => {
      const value = { state4: 'state1' };
      const validate = validateRouteByMap(map)(value);

      expect(validate('/info')).toBe(false);
    });
  });
});
