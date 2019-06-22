import React from 'react'
import Axios from 'axios';

export default class Teams extends React.Component {
  state = {
    ids: [],
    names: [],
    abbrs: []
  };

  componentDidMount() {
    Axios
      .get('/api/teams')
      .then(response => {
        const [ids, names, abbrs] = [[], [], []];
        response.data.forEach(team => {
          ids.push(team.id);
          names.push(team.name);
          abbrs.push(team.abbreviation);
        });
        this.setState({ ids: ids, names: names, abbrs: abbrs });
      });
  }
  
  render() {
    return (
      <ul>
        {this.state.ids.map((id, index) => (
          <li key={id.toString()}>{this.state.abbrs[index]}: {this.state.names[index]}</li>
        ))}
      </ul>
    )
  }
}