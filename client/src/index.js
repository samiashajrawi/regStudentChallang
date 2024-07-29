import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {setupStore} from './app/store'
import { Provider } from 'react-redux'

import { BrowserRouter as Router} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

