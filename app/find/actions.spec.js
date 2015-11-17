import mockStore from '../../testsupport/mockStore';
import nock from 'nock';
import { apiBaseAddress } from '../shared/constants';


import * as actions from './actions'

describe('Finder actions', () => {
  const nowFunc = Date.now;
  let theDate;

  beforeEach(() => {
    theDate = Date.now();
    Date.now = () => { return theDate; };
  });

  afterEach(() => {
    nock.cleanAll();
    Date.now = nowFunc;
  });

  it('create CATEGORIES_REQUEST and CATEGORIES_SUCCESS when loading categories', (done) => {
    nock(apiBaseAddress)
      .get('/categories')
      .reply(200, { categories: [{ name: 'Category 1' }, { name: 'Category 2'} ] });

    const expectedActions = [
      { type: actions.CATEGORIES_REQUEST },
      { type: actions.CATEGORIES_SUCCESS, categories: [{ name: 'Category 1' }, { name: 'Category 2'} ], receivedAt: theDate }
    ];
    const store = mockStore({ categories: null }, expectedActions, done)
    store.dispatch(actions.fetchCategoriesIfNeeded())
  })

  

});