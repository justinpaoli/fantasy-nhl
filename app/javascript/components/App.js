import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Teams from './Teams'

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/teams" component={Teams} />
      </Switch>
    )
  }
}