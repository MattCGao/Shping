import { CHANGE_USERNAME, CHANGE_TITLE } from '../constants';

import { changeUsername, changeTitle } from '../actions';

describe('Home Actions', () => {
  describe('changeUsername', () => {
    it('should return the correct type and the passed name', () => {
      const fixture = 'Max';
      const expectedResult = {
        type: CHANGE_USERNAME,
        name: fixture,
      };

      expect(changeUsername(fixture)).toEqual(expectedResult);
    });
  });
  describe('changeTitle', () => {
    it('should return the correct type and the passed title', () => {
      const fixture = 'Max';
      const expectedResult = {
        type: CHANGE_TITLE,
        title: fixture,
      };

      expect(changeTitle(fixture)).toEqual(expectedResult);
    });
  });
});
