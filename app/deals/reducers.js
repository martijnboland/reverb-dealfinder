import { combineReducers } from 'redux'
import * as actions from './actions';

function selectedListing(state = null, action) {
  switch (action.type) {
    case actions.SET_LISTING:
      return action.link;
    case actions.RESET_LISTING:
      return null;
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  selectedListing
});

export default rootReducer;