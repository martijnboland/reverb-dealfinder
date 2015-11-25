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
      priceGuides: {
        bySearchTerm: {
          isFetching: false,
          didInvalidate: false,
          items: [],
          next: null
        },
        byCategory: {}
      },
      dealsListings: {},
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

  it('handle PRICEGUIDES_BY_CATEGORY_REQUEST', () => {
    const state = reducers(undefined, { type: actions.PRICEGUIDES_BY_CATEGORY_REQUEST, category: 'test' });
    expect(state).to.have.property('priceGuides');
    expect(state.priceGuides.byCategory).to.have.property('test');
    expect(state.priceGuides.byCategory.test).to.eql({
      isFetching: true,
      didInvalidate: false,
      items: []
    });
  });

  it('handle PRICEGUIDES_BY_CATEGORY_SUCCESS', () => {
    const initialState = {
      priceGuides: {
        bySearchTerm: {
          isFetching: false,
          didInvalidate: false,
          items: []
        },
        byCategory: {
          test: {
            isFetching: true,
            didInvalidate: false,
            items: []
          }
        }
      }
    };
    const state = reducers(initialState, { 
      type: actions.PRICEGUIDES_BY_CATEGORY_SUCCESS, 
      category: 'test', 
      data: { 
        total: 1,
        price_guides: [{ title: 'Test price guide' }] 
      }
    });
    expect(state).to.have.property('priceGuides');
    expect(state.priceGuides.byCategory).to.have.property('test');
    expect(state.priceGuides.byCategory.test).to.eql({
      isFetching: false,
      didInvalidate: false,
      items: [ { title: 'Test price guide'} ],
      next: null
    });

  });

  it('handle PRICEGUIDES_BYCATEGORY_ERROR', () => {
    const errorText = 'Oops, something went wrong';
    const initialState = {
      priceGuides: {
        bySearchTerm: {
          isFetching: false,
          didInvalidate: false,
          items: []
        },
        byCategory: {
          test: {
            isFetching: true,
            didInvalidate: false,
            items: []
          }
        }
      }
    };
    const state = reducers(initialState, { type: actions.PRICEGUIDES_BY_CATEGORY_ERROR, category: 'test', error: errorText })
    expect(state).to.not.equal(initialState);
    expect(state).to.have.property('priceGuides');
    expect(state.priceGuides.byCategory).to.have.property('test');
    expect(state.priceGuides.byCategory.test).to.eql({
      isFetching: false,
      didInvalidate: false,
      items: []
    });    
    expect(state).to.have.property('errorMessage');
    expect(state.errorMessage).to.equal(errorText);
  });

  it('handle DEALS_LISTINGS_REQUEST', () => {
    const state = reducers(undefined, { type: actions.DEALS_LISTINGS_REQUEST, priceGuide: '/api/priceguide/879487'  });
    expect(state).to.have.property('dealsListings');
    expect(state.dealsListings).to.have.property('/api/priceguide/879487');
    expect(state.dealsListings['/api/priceguide/879487']).to.eql({
      isFetching: true,
      didInvalidate: false,
      items: []
    });
  });

  it('handle DEALS_LISTINGS_SUCCESS', () => {
    const initialState = {
      dealsListings: {
        '/api/priceguide/879487': {
          isFetching: true,
          didInvalidate: false,
          items: []
        }
      }
    };
    const state = reducers(initialState, { type: actions.DEALS_LISTINGS_SUCCESS, priceGuide: '/api/priceguide/879487', data: [ { title: 'Test deal' } ] });
    expect(state).to.have.property('dealsListings');
    expect(state.dealsListings).to.have.property('/api/priceguide/879487');
    expect(state.dealsListings['/api/priceguide/879487']).to.eql({
      isFetching: false,
      didInvalidate: false,
      items: [ { title: 'Test deal'} ]
    });
  });

  it('handle DEALS_LISTINGS_ERROR', () => {
    const errorText = 'Oops, something went wrong';
    const initialState = {
      dealsListings: {
        '/api/priceguide/879487': {
          isFetching: true,
          didInvalidate: false,
          items: []
        }
      }
    };
    const state = reducers(initialState, { type: actions.DEALS_LISTINGS_ERROR, priceGuide: '/api/priceguide/879487', error: errorText });
    expect(state).to.not.equal(initialState);
    expect(state).to.have.property('dealsListings');
    expect(state.dealsListings).to.have.property('/api/priceguide/879487');
    expect(state.dealsListings['/api/priceguide/879487']).to.eql({
      isFetching: false,
      didInvalidate: false,
      items: []
    });    
    expect(state).to.have.property('errorMessage');
    expect(state.errorMessage).to.equal(errorText);
  });

});