import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="shiboleth-test.eu.auth0.com"
      clientId="QjDF7fwF2HfTd6RSpGmnWcyuLxXYWBps"
      redirectUri={window.location.origin}
      // audience='urn:auth0:sibbolethidpttest:IdProvider'
      responseType='token'
      // params={{scope: 'openid'}}
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
