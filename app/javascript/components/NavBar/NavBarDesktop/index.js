import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default withRouter(function NavBarDesktop(props) {
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
    </Menu>
  );
});