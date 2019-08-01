import React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import NavBar from './NavBar';
import Home from './Home';
import Login from './Login';
import Teams from './Teams';
import Team from './Team';
import Signup from './Signup';
import Leagues from './Leagues';
import CreateLeagueForm from './Leagues/CreateLeagueForm';
import CreateTeamForm from './PlayerTeam/CreateTeamForm';
import UserProvider from './User/UserProvider';

export default class App extends React.Component<RouteComponentProps<{}>> {
  HIDE_NAVBAR_PATHS: Array<RegExp> = [
    /login/,
    /signup/
  ]
  
  constructor(props: RouteComponentProps) {
    super(props);
    // @ts-ignore
    if (!gon.global) gon.global = {};
  }

  showNavBar = (): boolean => !this.HIDE_NAVBAR_PATHS.filter((path) => this.props.location.pathname.match(path)).length;

  render() {
    return (
      <UserProvider>
        {this.showNavBar() ? <NavBar /> : <div />}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />

          <Route exact path='/leagues' component={Leagues} />
          <Route exact path='/leagues/create' component={CreateLeagueForm} />
          <Route exact path='/leagues/:leagueId/teams/create' component={CreateTeamForm} />

          <Route exact path='/teams' component={Teams} />
          <Route path='/teams/:id' component={Team} />
        </Switch>
      </UserProvider>
    )
  }
}