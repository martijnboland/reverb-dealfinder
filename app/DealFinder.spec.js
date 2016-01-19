import { expect } from 'chai';
import mockery from 'mockery';
import reactNativeStub from '../testsupport/react-native.js';
//import DealFinder from './DealFinder';

describe.skip('DealFinder', () => {
  let app;
  
  before(() => {
    mockery.enable();
    mockery.registerMock('react-native', reactNativeStub);
  });

  afterEach(() => {
  });

  after(() => {
    mockery.disable();
  });

  it('should instantiate ok', () => {
    expect(app).to.be.ok;
  });

});