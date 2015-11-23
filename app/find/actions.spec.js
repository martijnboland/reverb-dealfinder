import mockStore from '../../testsupport/mockStore';
import nock from 'nock';
import { apiBaseAddress } from '../shared/constants';
import fetch from 'isomorphic-fetch';
import { expect } from 'chai';

import * as actions from './actions'

describe('Finder actions', () => {

  afterEach(() => {
    nock.cleanAll();
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
      { type: actions.CATEGORIES_SUCCESS, data: [
        { id: 1, slug: 'cat-1', name: 'Category 1', description: '', image: '' }, 
        { id: 2, slug: 'cat-2', name: 'Category 2', description: '', image: '' } 
      ] }
    ];
    const store = mockStore({ 
      finder: { 
        categories: null 
      } 
    }, expectedActions, done)
    store.dispatch(actions.fetchCategoriesIfNeeded())
  })

});