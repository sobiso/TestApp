/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import Navigator from './navigator'
import reducer from './reducer';

const client = axios.create({
  baseURL: 'https://api.github.com',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

