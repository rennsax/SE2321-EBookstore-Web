import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from './App';
import LoginPage from "view/LoginPage"
// import App from './test/App';
require("modern-css-reset");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/m" component={App} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
);