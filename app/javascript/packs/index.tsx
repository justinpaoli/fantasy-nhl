import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import App from '../components/App';

document.addEventListener('DOMContentLoaded', () => {
  const csrfElement: HTMLMetaElement | null = document.querySelector('[name="csrf-token"]');
  const csrfToken: string = csrfElement && csrfElement.content || '';
  Axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

  ReactDOM.render(
    <Router>
      <Route path="/" component={App} />
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})