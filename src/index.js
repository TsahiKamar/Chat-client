import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Chat } from './components/Chat';

//Redux
import { Provider } from 'react-redux'
import reducer from './reducer';
import { createStore,combineReducers } from "redux";

import { initializeUsers } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import filterReducer from './filterReducer';

export const store = createStore(reducer, composeWithDevTools())

 

 fetch('/user/getUsers')
 .then(response => response.json())
 .then(data => {
   store.dispatch(initializeUsers(data)) //INIT STORE DATA

 })
  .catch((error) => {
    console.log(error)
});
  
const state = store.getState()
console.log("index Store state:" + JSON.stringify(state)); 

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


