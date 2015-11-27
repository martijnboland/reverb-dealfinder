import { expect } from 'chai';
import routerReducer from './routerReducer';
import * as actionTypes from './routerConstants';
import navigateTo from './routerActions';

describe('Router reducer', () => {
  it('returns initial state when nothing happened', () => {
    const initialState = { currentRoute: null };
    expect(routerReducer(undefined, {})).to.eql(initialState);
  });

  it('handles NAVIGATE_TO', () => {
    const path = '/testpath';
    const testState = { currentRoute: { path: '/testpath', shouldReset: false } };
    expect(routerReducer(undefined, navigateTo(path))).to.eql(testState);
  });

  it ('does not alter state when called with an unknown action', () => {
    const initialState = { currentRoute: { path: '/testpath', shouldReset: false } };
    expect(routerReducer(initialState, { type: 'unknown_action'})).to.equal(initialState);
  })

  it ('creates a new state object instead of altering the existing one when handling NAVIGATE_TO', () => {
    const initialState = { currentRoute: { path: '/testpath', shouldReset: false } };
    const nextState = routerReducer(initialState, navigateTo('/nextpath'));
    expect(nextState).to.eql({ currentRoute: { path: '/nextpath', shouldReset: false } } );
    expect(nextState).to.not.equal(initialState);
  });
});