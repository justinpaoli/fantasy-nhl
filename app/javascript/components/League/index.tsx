import React, { FunctionComponent, useEffect, useState } from 'react';
import Axios from 'axios';

const Leagues: FunctionComponent = () => {
  // TODO: custom type this
  const [leagues, setLeagues] = useState([]);
  
  useEffect(() => {
    Axios
      .get('/api/leagues')
      .then(response => {
        setLeagues(response.data);
      });
  }, []);

  return null;
}

export default Leagues;