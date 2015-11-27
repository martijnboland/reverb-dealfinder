import * as actionTypes from './routerConstants';

export default function navigateTo(path, reset = false) {
  return {
    type: actionTypes.NAVIGATE_TO,
    path,
    reset
  };
}