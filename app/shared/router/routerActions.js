import * as actionTypes from './routerConstants';

export default function navigateTo(path) {
  return {
    type: actionTypes.NAVIGATE_TO,
    path
  };
}