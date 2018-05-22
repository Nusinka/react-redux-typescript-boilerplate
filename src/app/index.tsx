import * as React from 'react';
import { Route, Switch } from 'react-router';
import { App as PhoneBookApp } from 'app/containers/PhoneBookApp';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={PhoneBookApp} />
  </Switch>
));
