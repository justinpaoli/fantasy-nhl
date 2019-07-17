import React from 'react';
import { Route, Switch } from 'react-router-dom'
import NavBar from './NavBar';
import Home from './Home';
import Login from './Login';
import Teams from './Teams';
import Team from './Team';

export default class App extends React.Component {
  constructor() {
    super();
    if (!gon.global) gon.global = {};
  }

  render() {
    return (
      <div>
        {this.props.location.pathname !== '/login' ? <NavBar /> : <div />}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/teams' component={Teams} />
          <Route path='/team/:id' component={Team} />
        </Switch>
      </div>
    )
  }
}