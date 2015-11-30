import * as actionTypes from './routerConstants';
import { navigateTo } from './routerActions';
import { expect } from 'chai';

describe('Router navigateTo Action', () => {
  it('creates an action to navigate to a given path', () => {
    const path = '/testpath';
    const expectedAction = {
      type: actionTypes.NAVIGATE_TO,
      path,
      reset: false
    };
    let action = navigateTo(path);
    expect(action).to.eql(expectedAction);
  });
  
  it('creates an action to navigate to a given path with the replace option', () => {
    const path = '/testpath';
    const expectedAction = {
      type: actionTypes.NAVIGATE_TO,
      path,
      reset: true
    };
    let action = navigateTo(path, true);
    expect(action).to.eql(expectedAction);
  });

});