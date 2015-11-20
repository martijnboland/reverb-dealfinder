import { expect } from 'chai';

import * as actions from './actions';
import reducers from './reducers';

describe('Finder reducers', () => {

  it('return initial state', () => {
    const initialState = reducers(undefined, {});
    expect(initialState).to.eql({
      categories: {
        isFetching: false,
        didInvalidate: false,
        items: []
      },
      selectedCategory: null,
      errorMessage: null
    });
  });

  it('handle CATEGORIES_REQUEST', () => {
    const state = reducers(undefined, { type: actions.CATEGORIES_REQUEST });
    expect(state).to.have.property('categories');
    expect(state.categories).to.eql({
      isFetching: true,
      didInvalidate: false,
      items: []
    });
  });

  it('handle CATEGORIES_SUCCESS', () => {
    const initialState = {
      categories: {
        isFetching: true,
        didInvalidate: false,
        items: []
      }
    };
    const state = reducers(initialState, { type: actions.CATEGORIES_SUCCESS, data: [ { name: 'Category 1' } ] });
    expect(state).to.have.property('categories');
    expect(state.categories).to.eql({
      isFetching: false,
      didInvalidate: false,
      items: [ { name: 'Category 1' } ]
    });
  });

  it('handle CATEGORIES_ERROR', () => {
    const errorText = 'Oops, something went wrong';
    const initialState = {
      categories: {
        isFetching: false,
        didInvalidate: false,
        items: []
      }
    };
    const state = reducers(initialState, { type: actions.CATEGORIES_ERROR, error: errorText })
    expect(state).to.not.equal(initialState);
    expect(state).to.have.property('categories');
    expect(state.categories).to.eql({
      isFetching: false,
      didInvalidate: false,
      items: []
    });
    expect(state).to.have.property('errorMessage');
    expect(state.errorMessage).to.equal(errorText);
  });

  it('handle SELECT_CATEGORY', () => {
    const state = reducers(undefined, { type: actions.SELECT_CATEGORY, category: 'testcategory' });
    expect(state).to.have.property('selectedCategory');
    expect(state.selectedCategory).to.equal('testcategory');
  });

});