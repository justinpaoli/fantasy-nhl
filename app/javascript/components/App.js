import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './NavBar';
import Home from './Home';
import Teams from './Teams'
import Team from './Team';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/teams' component={Teams} />
          <Route path='/team/:id' component={Team} />
        </Switch>
      </div>
    )
  }
}