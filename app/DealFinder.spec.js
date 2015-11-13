import { expect } from 'chai';
import reactNativeStub from '../testsupport/react-native.js';
//import DealFinder from './DealFinder';

//DealFinder.__ReWire__('React', reactNativeStub);

// Unable to properly use React Native Components in test scenario's because JavaScriptCore is not supported with Mocha
describe.skip('DealFinder', () => {

  before(() => {
  });

  afterEach(() => {
  });

  after(() => {
  });

  it('should instantiate ok', () => {
    expect(app).to.be.ok;
  });

});