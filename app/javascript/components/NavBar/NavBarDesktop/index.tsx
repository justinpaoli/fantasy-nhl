import React, { FunctionComponent, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import SignupLoginGroup from './SignupLoginGroup';
import Logout from './Logout';
import useRouter from 'use-react-router';
import { UserContext } from '../../User/UserProvider';

const NavBarDesktop: FunctionComponent = () => {
  const { history } = useRouter();
  const { user: { username }, updateUser } = useContext(UserContext);

  const links = [
    { name: 'home', display: 'Home', href: '/' },
    { name: 'teams', display: 'Teams', href: '/teams' },
    { name: 'leagues', display: 'Leagues', href: '/leagues' }
  ];
  
  const handleLinkClick: Function = (href: string) => {
    return () => history.push(href);
  }

  return (
    <Menu>
      {links.map((link) => <Menu.Item key={link.name} name={link.name} content={link.display} onClick={handleLinkClick(link.href)} />)}
      <Menu.Menu position='right'>
        <Menu.Item>
          {username ? <Logout user={username} callback={updateUser} /> : <SignupLoginGroup />}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBarDesktop;