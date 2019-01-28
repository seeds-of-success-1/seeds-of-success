import { toggle } from './logic';

describe('Tests Toggle Show button', () => {
    test('when given true, returns false', () => {
      expect(toggle(true)).toBe(false)
    })
  
    test('when given false, returns true', () => {
      expect(toggle(false)).toBe(true)
    })
  
    test('if given an object, should return false', () => {
      expect(toggle({})).toBe(false)
    })
  
    test('if given a 0, should return true', () => {
      expect(toggle(0)).toBe(true)
    })
  });