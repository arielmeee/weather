import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';

function App() {
  return (
    <div className="">
      <Switch>
        <Route path="/" exact={true} component={Home} />
      </Switch>
    </div>
  );
}

export default App;
