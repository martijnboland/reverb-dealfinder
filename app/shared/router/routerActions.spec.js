import * as actionTypes from './routerConstants';
import navigateTo from './routerActions';
import { expect } from 'chai';

describe('routerActions', () => {
  it('creates an action to navigate to a given path', () => {
    const path = '/testpath';
    const expectedAction = {
      type: actionTypes.NAVIGATE_TO,
      path
    };
    let action = navigateTo(path);
    expect(action).to.eql(expectedAction);
  });
});