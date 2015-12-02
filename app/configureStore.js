import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import apiMiddleware from './shared/middleware/api';
import routerReducer from './shared/router/routerReducer';
import finderReducers from './find/reducers';
import dealsReducers from './deals/reducers';
import layoutReducers from './shared/layout/reducers';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware,
  apiMiddleware
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(combineReducers({ 
    router: routerReducer, 
    finder: finderReducers,
    deals: dealsReducers,
    layout: layoutReducers
  }), initialState);
};