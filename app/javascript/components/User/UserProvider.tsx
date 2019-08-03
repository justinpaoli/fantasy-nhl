import React, { FunctionComponent, createContext, useState, useEffect } from 'react';
import { User, IUserContext } from './types';
import Axios from 'axios';

export const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider: FunctionComponent = (props) => {
  const [user, setUser] = useState<User>({} as User)
  const updateUser = (user: User): void => {
    setUser(user);
    Axios.defaults.headers.common['Authorization'] = user.jwt;
    // FIXME: find a better way to persist sessions
    //        other than storing JWT in localStorage
    localStorage.setItem('user', JSON.stringify(user));
  };
  const context = {
    user: JSON.parse(localStorage.getItem('user') || '') as User,
    updateUser: updateUser
  } as IUserContext;

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  )
};

export default UserProvider;
