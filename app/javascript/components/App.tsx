import React, { Fragment } from 'react';
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
import Draft from './Leagues/Draft';

export default class App extends React.Component<RouteComponentProps<{}>> {
  HIDE_NAVBAR_PATHS = [
    /login/,
    /signup/
  ]
  
  constructor(props: RouteComponentProps) {
    super(props);
  }

  showNavBar = (): boolean => !this.HIDE_NAVBAR_PATHS.filter((path) => this.props.location.pathname.match(path)).length;

  render() {
    return (
      <UserProvider>
        {this.showNavBar() ? <NavBar /> : <Fragment />}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />

          <Route exact path='/leagues' component={Leagues} />
          <Route exact path='/leagues/create' component={CreateLeagueForm} />
          <Route exact path='/leagues/:leagueId/teams/create' component={CreateTeamForm} />
          <Route exact path='/leagues/:leagueId/draft' component={Draft} />

          <Route exact path='/teams' component={Teams} />
          <Route path='/teams/:id' component={Team} />
        </Switch>
      </UserProvider>
    );
  }
}