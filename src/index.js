import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Chat } from './components/Chat';

//Redux
import { Provider } from 'react-redux'
import reducer from './store/reducer';
import { createStore,combineReducers } from "redux";

import { initializeUsers } from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import filterReducer from './store/filterReducer';

export const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Chat />
  </React.StrictMode></Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


