import * as actionTypes from './routerConstants';

var initialState = {
    currentRoute: null
};

export default function route(state=initialState, action={}) {
  switch (action.type) {
    case actionTypes.NAVIGATE_TO:
      return {...state,...{
         currentRoute: {
           path: action.path,
           shouldReset: action.reset
         }
      }};
    case actionTypes.DID_NAVIGATE_TO:
      return {...state, ...{
        currentRoute: {
          path: action.path,
          shouldReset: false
        }
      }};
    default:
      return state;
  }
}