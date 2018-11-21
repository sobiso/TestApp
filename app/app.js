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
import createSagaMiddleware from "redux-saga";

import Navigator from './navigator'
import reducer from './reducer';
import { watcherSaga } from "./saga";

// const client = axios.create({
//   baseURL: 'https://api.github.com',
//   responseType: 'json'
// });

const sagaMiddleware = createSagaMiddleware();

// const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watcherSaga);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

