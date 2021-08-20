import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import routes from './pages/router';
import './App.css';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        {routes.map((route) => (
          <Route key={route.name} path={route.path} exact>
            <route.component />
          </Route>
        ))}
      </Switch>
    </div>
  );
}

export default App;
