/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from "redux-saga";
import { persistStore, persistCombineReducers, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import Navigator from './navigator'
import { watcherSaga } from "./saga";
import repos from './redux/repos'

const persistConfig = {
  key: 'root',
  storage
}

const sagaMiddleware = createSagaMiddleware();

const reducer = persistCombineReducers(persistConfig, { repos })
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
persistStore(
  store,
  null,
  () => {
    store.getState() 
  }
)

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

