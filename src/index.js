import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="sibbolethidpttest.eu.auth0.com"
      clientId="GeEJbo6xaxBVQCL9UI0v8wHFxLBS4hCz"
      redirectUri='http://jwt.io'
      // audience='urn:auth0:sibbolethidpttest:IdProvider'
      responseType='token'
      params={{scope: 'openid'}}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
