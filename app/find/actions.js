import { apiBaseAddress } from '../shared/constants';

// Actions
export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST';
export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';
export const CATEGORIES_ERROR = 'CATEGORIES_ERROR';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Action creators
function requestCategories() {
  return {
    type: CATEGORIES_REQUEST
  };
}

function receiveCategories(json) {
  return {
    type: CATEGORIES_SUCCESS,
    categories: json.categories.map((cat) => { 
      return { id: cat.id, name: cat.name, slug: cat.slug, description: cat.description, image: cat._links.image.href } 
    }),
    receivedAt: Date.now()
  };
}

function requestCategoriesError(error) {
  return {
    type: CATEGORIES_ERROR,
    error: error
  }
}

function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories())
    return fetch(apiBaseAddress + '/categories')
      .then(req => req.json())
      .then(json => dispatch(receiveCategories(json)))
      .catch(err => dispatch(requestCategoriesError(err)));
  };
}

function shouldFetchCategories(state) {
  if (!state.categories) {
    return true;
  } else if (state.categories.isFetching) {
    return false;
  } else {
    return state.categories.didInvalidate;
  }
}

export function fetchCategoriesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCategories(getState())) {
      return dispatch(fetchCategories());
    }
  };
}

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category: category
  }
}