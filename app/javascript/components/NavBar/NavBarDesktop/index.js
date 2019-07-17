import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import SignupLoginGroup from './SignupLoginGroup';
import Logout from './Logout';

export default withRouter(function NavBarDesktop(props) {
  const [user, setUser] = useState(gon.global.user);

  useEffect(() => setUser(gon.global.user), [gon.global.user])

  const links = [
    { name: 'home', display: 'Home', href: '/' },
    { name: 'teams', display: 'Teams', href: '/teams' }
  ];
  
  const handleLinkClick = (href) => {
    return () => props.history.push(href);
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
});