import React, { useEffect, useState, FunctionComponent } from 'react';
import { Menu } from 'semantic-ui-react';
import SignupLoginGroup from './SignupLoginGroup';
import Logout from './Logout';
import useRouter from 'use-react-router';

const NavBarDesktop: FunctionComponent = (props) => {
  const { history } = useRouter();

  // @ts-ignore
  const [user, setUser] = useState(gon.global.user ? gon.global.user.username : null);

  // @ts-ignore
  useEffect(() => setUser(gon.global.user ? gon.global.user.username : null), [gon.global.user])

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
          {user ? <Logout user={user} /> : <SignupLoginGroup />}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBarDesktop;