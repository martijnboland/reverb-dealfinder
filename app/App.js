import React, { Component } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux/native';

import routerReducer from './shared/router/routerReducer';
import DealFinder from './DealFinder';

const store = createStore(combineReducers( { router: routerReducer }));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <DealFinder />}
      </Provider>
    );
  }
}