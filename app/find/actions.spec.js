import mockStore from '../../testsupport/mockStore';
import nock from 'nock';
import { apiBaseAddress } from '../shared/constants';
import fetch from 'isomorphic-fetch';
import { expect } from 'chai';

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
      .reply(200, { categories: [
        { id: 1, slug: 'cat-1', name: 'Category 1', description: '', _links: { image: { href: '' } } }, 
        { id: 2, slug: 'cat-2', name: 'Category 2', description: '', _links: { image: { href: '' } } } 
      ]});

    const expectedActions = [
      { type: actions.CATEGORIES_REQUEST },
      { type: actions.CATEGORIES_SUCCESS, categories: [
        { id: 1, slug: 'cat-1', name: 'Category 1', description: '', image: '' }, 
        { id: 2, slug: 'cat-2', name: 'Category 2', description: '', image: '' } 
      ], receivedAt: theDate }
    ];
    const store = mockStore({ categories: null }, expectedActions, done)
    store.dispatch(actions.fetchCategoriesIfNeeded())
  })

  it('create SELECT_CATEGORY when selecting a category', () => {
    const expectedAction = {
      type: actions.SELECT_CATEGORY,
      category: 'testcategory'
    };
    expect(actions.selectCategory('testcategory')).to.eql(expectedAction);
  });

});