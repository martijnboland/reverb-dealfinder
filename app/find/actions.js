import { apiBaseAddress } from '../shared/constants';
import navigateTo from '../shared/router/routerActions';

// Actions
export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST';
export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';
export const CATEGORIES_ERROR = 'CATEGORIES_ERROR';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const RESET_CATEGORY = 'RESET_CATEGORY';

export const DEALS_BY_CATEGORY_REQUEST = 'DEALS_BY_CATEGORY_REQUEST';
export const DEALS_BY_CATEGORY_SUCCESS = 'DEALS_BY_CATEGORY_SUCCESS';
export const DEALS_BY_CATEGORY_ERROR = 'DEALS_BY_CATEGORY_ERROR';

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Action creators
export function fetchCategoriesIfNeeded() {
  return {
    types: [CATEGORIES_REQUEST, CATEGORIES_SUCCESS, CATEGORIES_ERROR],
    shouldCallApi: (state) => !state.categories || (!state.categories.isFetching && state.categories.didInvalidate),
    callApi: () => fetch(apiBaseAddress + '/categories'),
    transformResult: (json) => { 
      return json.categories.map((cat) => { 
        return { id: cat.id, name: cat.name, slug: cat.slug, description: cat.description, image: cat._links.image.href } 
      })
    },
    payload: {}
  };
}

function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category: category
  }
}

export function findDealsForCategory(category) {
  return (dispatch, getState) => {
    return dispatch(dispatch => {
      // TODO async deal finder
      dispatch(selectCategory(category));
      dispatch(navigateTo('/deals'))
    });
  }
}

export function resetCategory() {
  return {
    type: RESET_CATEGORY
  }
}