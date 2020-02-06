import React, { useState, useEffect } from 'react';
import axios from "axios";

import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';
export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      birthday: '',
      address: '',
      email: '',
      password: '',
      confirm: '',
      flag: '',
      dataList: [],
      dataname: [],
    }
    localStorage.setItem("key", "0");
    
  }
  componentDidMount = () => {
    let body = { name: 'admin', birthday: '6/10/1996', address: 'dandong', phonenumber: '1993836374', email: 'admin@outlook.com', password: 'admin', flag: '1' }
    axios.post(localStorage.getItem("url")+'/todos/start', body)
      .then((res) => {
        console.log(res.data)
        // alert("Successful!!");
      }).catch((error) => {
        console.log(error)
      });

    //   let body = { month: this.state.month, day: this.state.day, year: this.state.year, name: this.state.name, clientname: this.state.clientname, price: this.state.price }
    // axios.post(localStorage.getItem("url")+'/todos/working', body)
    //   .then((res) => {
    //     console.log(res.data)
    //     alert("Successful!!");
    //     window.location.reload();
    //   }).catch((error) => {
    //     console.log(error)
    //   });



      axios.post('/todos/showplan')
      .then((res) => {
        
        if (res.data.length > 0)
          this.setState({ dataList: res.data })        

          let totalplan = 0;

      this.state.dataList.map((item, index) => {
        totalplan += item.price * 1.0;
      
      })
      console.log("totalplan:",totalplan)
      localStorage.setItem("totalplan", totalplan)

      }).catch((error) => {
        console.log(error)
      });

      
  }

  changeemail = (e) => { this.setState({ email: e.target.value }); }
  changepass = (e) => { this.setState({ password: e.target.value }); }
  onSignin = () => {
    let body = { email: this.state.email, password: this.state.password }
    axios.post(localStorage.getItem("url")+'/todos/login', body)
      .then((res) => {
        if (res.data.email[0].length > 0) {
          localStorage.setItem("name",res.data.name);
          if (res.data.flag == 1) {
            localStorage.setItem("key", "2");
          } else {
            localStorage.setItem("key", "1");
          }
          window.location.href = "/dashboard";
          // history.push('dashboard');

        } else {
          alert("No member!");
        }
        console.log(res.data.email)
      }).catch((error) => {
        console.log(error)
        alert("Wrong username or password!");
      })
    this.setState({ email: '', password: '' })

  }
  render() {

    return (
      <div  >
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={12}
            xs={12}
          >
            <Typography
              variant="h2"
              style={{ height: '150px' }}
            >
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            sm={3}
            xs={2}
          >
            <Typography
              variant="h2"
            // style={{backgroundImage: 'url(/images/auth.jpg)', height:'100%'}}
            >
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            xs={8}
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <p>
              <Typography
                variant="h2"
                style={{ textAlign: 'center' }}
              >  Sign in<br/>
                </Typography>
            </p><br/>
            <p>
              <TextField
                fullWidth
                label="Email address"
                name="email"
                onChange={this.changeemail}
                type="text"
                value={this.state.email}
                variant="outlined"
              />
            </p> <br />
            <p>
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={this.changepass}
                type="password"
                value={this.state.password}
                variant="outlined"
              />
            </p><br />
            <p>
              <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
                onClick={this.onSignin}
              > Sign in now
                </Button>
            </p>

          </Grid>
          <Grid
            item
            md={4}
            sm={3}
            xs={2}
          >
            &nbsp;
          </Grid>
        </Grid>


      </div>
    );

  }
} 