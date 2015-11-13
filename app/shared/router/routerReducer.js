import * as actionTypes from './routerConstants';

var initialState = {
    currentRoute: null
};

export default function route(state=initialState, action={}) {
  switch (action.type) {
    case actionTypes.NAVIGATE_TO:
      return {...state,...{
         currentRoute: action.path
      }};
    default:
      return state;
  }
}