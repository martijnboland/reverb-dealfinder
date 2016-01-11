import React, { Component } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import configureStore from './configureStore';
import DealFinder from './DealFinder';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <DealFinder/>
      </Provider>
    );
  }
}