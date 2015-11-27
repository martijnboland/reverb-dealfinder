import navigateTo from '../shared/router/routerActions';

export const SET_LISTING = 'SET_LISTING';
function setListing(link) {
  return {
    type: SET_LISTING,
    link
  };
}

export function gotoListing(link) {
  return (dispatch, getState) => {
    dispatch(setListing(link));
    dispatch(navigateTo('/listing'));
  };
}