import { combineReducers } from 'redux'
import * as actions from './actions';

const categoriesInitialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
};

function categories(state = categoriesInitialState, action) {
  switch (action.type) {
    case actions.CATEGORIES_REQUEST:
      return { 
        ...state,
        isFetching: true, 
        didInvalidate: false
      };
    case actions.CATEGORIES_SUCCESS:
      return {
        isFetching: false,
        didInvalidate: false,
        items: action.data
      }
    case actions.CATEGORIES_ERROR:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
      }
    default:
      return state;
  }
}

function searchTerm(state = null, action) {
  switch (action.type) {
    case actions.SET_SEARCHTERM:
      return action.searchTerm;
    case actions.RESET_SEARCHTERM:
      return null;
    default:
      return state;
  }
}

function selectedCategory(state = null, action) {
  switch (action.type) {
    case actions.SELECT_CATEGORY:
      return action.category;
    case actions.RESET_CATEGORY:
      return null;
    default:
      return state;
  }
}

const priceGuidesInitialState = {
  bySearchTerm: {
    isFetching: false,
    didInvalidate: false,
    items: [],
    next: null
  },
  byCategory: {}
}

function priceGuides(state = priceGuidesInitialState, action) {
  switch (action.type) {
    case actions.PRICEGUIDES_BY_SEARCHTERM_REQUEST:
      var items = state.bySearchTerm ? state.bySearchTerm.items : [];
      var nextState = { 
        ...state,
        bySearchTerm: {
          ...state.bySearchTerm,
          isFetching: true, 
          didInvalidate: false,
          items: items
        }
      };
      return nextState;
    case actions.PRICEGUIDES_BY_SEARCHTERM_SUCCESS:
      var priceGuides = state.bySearchTerm ? state.bySearchTerm.items || [] : [];
      var priceGuidesToAdd = action.data.price_guides;
      for (let i = 0; i < priceGuidesToAdd.length; i++) {
        // Only add when make, model, year combo does not exist. Finish is skipped because filtering listings
        // on finish does not seem to work.
        const priceGuideToAdd = priceGuidesToAdd[i];
        if (! priceGuides.some(pg => {
          pg.make === priceGuideToAdd.make && pg.model === priceGuideToAdd.model && pg.year === priceGuideToAdd.year 
        })) {
          priceGuides.push(priceGuideToAdd);
        }
      }
      priceGuides.push(...priceGuidesToAdd);
      var nextState = {
        ...state,
        bySearchTerm: {
          ...state.bySearchTerm,
          isFetching: false, 
          didInvalidate: false,
          items: priceGuides,
          next: action.data._links && action.data._links.next ? action.data._links.next.href : null
        }
      };
      return nextState;
    case actions.PRICEGUIDES_BY_SEARCHTERM_ERROR:
      return {
        ...state,
        bySearchTerm: {
          ...state.bySearchTerm,
          isFetching: false, 
          didInvalidate: false
        }
      };
    case actions.RESET_SEARCHTERM:
      return {
        ...state,
        bySearchTerm: {
          isFetching: false,
          didInvalidate: false,
          items: [],
          next: null
        }
      };
    case actions.PRICEGUIDES_BY_CATEGORY_REQUEST:
      var items = state.byCategory[action.category] ? state.byCategory[action.category].items : [];
      var nextState = { 
        ...state,
        byCategory: {
          ...state.byCategory,
          [action.category]: {
            ...state.byCategory[action.category],
            isFetching: true, 
            didInvalidate: false,
            items: items
          }
        }
      };
      return nextState;
    case actions.PRICEGUIDES_BY_CATEGORY_SUCCESS:
      var priceGuides = state.byCategory[action.category] ? state.byCategory[action.category].items || [] : [];
      priceGuides.push(...action.data.price_guides);
      var nextState = {
        ...state,
        byCategory: {
          ...state.byCategory,
          [action.category]: {
            ...state.byCategory[action.category],
            isFetching: false, 
            didInvalidate: false,
            items: priceGuides,
            next: action.data._links && action.data._links.next ? action.data._links.next.href : null
          }
        }
      };
      return nextState;
    case actions.PRICEGUIDES_BY_CATEGORY_ERROR:
      return {
      ...state,
        byCategory: {
          ...state.byCategory,
          [action.category]: {
            ...state.byCategory[action.category],
            isFetching: false, 
            didInvalidate: false
          }
        }
      };      
    default:
      return state;
  }
}

function dealsListings(state = {}, action) {
  switch(action.type) {
    case actions.DEALS_LISTINGS_REQUEST:
      var items = state[action.priceGuide] ? state[action.priceGuide].items : [];
      var nextState = { 
        ...state,
        [action.priceGuide]: {
          ...state[action.priceGuide],
          isFetching: true, 
          didInvalidate: false,
          items: items
        }
      };
      return nextState;
    case actions.DEALS_LISTINGS_SUCCESS:
      return { 
        ...state,
        [action.priceGuide]: {
          ...state[action.priceGuide],
          isFetching: false, 
          didInvalidate: false,
          items: action.data
        }
      };
    case actions.DEALS_LISTINGS_ERROR:
      return {
        ...state,
        [action.priceGuide]: {
          ...state[action.priceGuide],
          isFetching: false, 
          didInvalidate: false
        }
      };
    default:
      return state;
  }
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === actions.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

const rootReducer = combineReducers({
  categories,
  searchTerm,
  selectedCategory,
  priceGuides,
  dealsListings,
  errorMessage
});

export default rootReducer;