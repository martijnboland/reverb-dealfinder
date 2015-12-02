import { expect } from 'chai';
import layoutReducer from './reducers';
import * as actions from './actions';

describe('Layout reducer', () => {
  it('returns initial state when nothing happened', () => {
    const initialState = { width: 0, height: 0, isWide: false, isLandscape: false };
    expect(layoutReducer(undefined, {})).to.eql(initialState);
  });

  it('handles CHANGE_LAYOUT', () => {
    const layout = { width: 320, height: 568 };
    const testState = { width: 320, height: 568, isWide: false, isLandscape: false };
    expect(layoutReducer(undefined, actions.changeLayout(layout))).to.eql(testState);
  });

  it('handles CHANGE_LAYOUT with tablet size to landscape mode', () => {
    const initialState = { width: 320, height: 568, isWide: false, isLandscape: false };
    const layout = { width: 1024, height: 768 };
    const testState = { width: 1024, height: 768, isWide: true, isLandscape: true };
    expect(layoutReducer(undefined, actions.changeLayout(layout))).to.eql(testState);
  });
});