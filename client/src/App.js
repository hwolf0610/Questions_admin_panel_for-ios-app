import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  
  render() {
    localStorage.setItem("url", "");
    // localStorage.setItem("url", "http://localhost:3000");
    localStorage.setItem("word1", "Quality");
    localStorage.setItem("word2", "Members");
    localStorage.setItem("word3", "Percent of Quality");
    localStorage.setItem("word4", "Our all plan");
    localStorage.setItem("word5", "User Manage");
    localStorage.setItem("word6", "Quality Manage");
    localStorage.setItem("word7", "Plan Manage");
    localStorage.setItem("word8", "User add");
    localStorage.setItem("word9", "Edit User Info");
    localStorage.setItem("word10", "Quality add");
    localStorage.setItem("word11", "Edit Quailty");
    localStorage.setItem("word12", "Plan add");
    localStorage.setItem("word13", "Edit Plan");
    localStorage.setItem("word14", "current month quality");
    localStorage.setItem("word15", "Plan Edit");
    localStorage.setItem("word16", "Week Quality chart");
    localStorage.setItem("word17", "personal quality");
    localStorage.setItem("word18", "Month quality chart");
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}
