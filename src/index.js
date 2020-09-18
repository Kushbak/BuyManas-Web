import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducers'
import './index.css';
import App from './App';
import './i18next';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";


const store = createStore(rootReducer, applyMiddleware(thunk))
window.store = store;
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={(<div>Loading ~~~~</div>)}>
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
