import * as actionTypes from './routerConstants';

export function navigateTo(path, reset = false) {
  return {
    type: actionTypes.NAVIGATE_TO,
    path,
    reset
  };
}

export function didNavigateTo(path) {
  return {
    type: actionTypes.DID_NAVIGATE_TO,
    path
  }
}