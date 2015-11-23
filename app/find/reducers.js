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

function selectedCategory(state = null, action) {
  switch (action.type) {
    case actions.SELECT_CATEGORY:
      return action.category;
    case action.RESET_CATEGORY:
      return null;
    default:
      return state;
  }
}

const priceGuidesInitialState = {
  bySearchTerm: {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  byCategory: {}
}

function priceGuides(state = priceGuidesInitialState, action) {
  switch (action.type) {
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
      return {
        ...state,
        byCategory: {
          ...state.byCategory,
          [action.category]: {
            ...state.byCategory[action.category],
            isFetching: false, 
            didInvalidate: false,
            items: action.data
          }
        }
      };
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

function deals(state = [], action) {
  switch(action.type) {
    case actions.DEALS_BY_CATEGORY_START:
      return [];
    case actions.DEALS_LISTINGS_SUCCESS:
      if (action.data) {
        var nextState = [];
        nextState.push(...state);
        nextState.push(...action.data)
        return nextState;        
      }
      return state;
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
  selectedCategory,
  priceGuides,
  dealsListings,
  deals,
  errorMessage
});

export default rootReducer;