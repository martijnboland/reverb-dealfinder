import * as actions from './actions'; 

export default function layout(state = { width: 0, height: 0, isWide: false, isLandscape: false }, action) {
  switch (action.type) {
    case actions.CHANGE_LAYOUT:
      const newState = {
        ...state,
        width: action.layout.width,
        height: action.layout.height,
        isWide: action.layout.width > 800,
        isLandscape: action.layout.width > action.layout.height
      }
      return newState;
  }
  return state;
}