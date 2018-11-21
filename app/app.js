/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from "redux-saga";
import { persistStore, persistCombineReducers, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native
import { PersistGate } from 'redux-persist/integration/react'

import Navigator from './navigator'
import reducer from './reducer';
import { watcherSaga } from "./saga";

const persistConfig = {
  key: 'primary',
  storage,
}

// const persistedReducer = persistReducer(persistConfig, reducer)
// const persistedReducer = persistReducer(persistConfig, reducer)

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
// const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
// let persistor = persistStore(
//   store,
//   null,
//   () => {
//     store.getState() // if you want to get restoredState
//   }
// )

sagaMiddleware.run(watcherSaga);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <Navigator />
        {/* </PersistGate> */}
      </Provider>
    );
  }
}

