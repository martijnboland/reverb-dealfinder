import { combineReducers } from 'redux'
import * as actions from './actions';

const categoriesInitialState = {
  isFetching: false,
  didInvalidate: false,
  receivedAt: null,
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
        receivedAt: action.receivedAt,
        items: action.categories
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
  errorMessage
});

export default rootReducer;