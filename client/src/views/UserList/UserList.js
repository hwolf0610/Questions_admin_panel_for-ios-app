import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PasswordField from 'material-ui-password-field'


import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";


import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import TabCategories from '../../views/Dashboard/components/TabCategories'

const theme = createMuiTheme();

export default class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userid: '',
      name: '',
      birthday: '',
      address: '',
      email: '',
      password: '',
      confirm: '',
      flag: '',
      dataList: [],
      dataname: [],
      offset: 0,
      buttontext: localStorage.getItem("word8"),
      buttontext2: localStorage.getItem("word24"),
      pagercounter: 0,
      selectedDate: new Date(),

    }
    if (localStorage.getItem("key") == 0 || localStorage.getItem("key") == 1) {
      window.location.href = "/sign-in";
    } else { }

  }
  componentDidMount = () => {
    axios.post(localStorage.getItem("url") + '/todos/categoryshow')
      .then((res) => {
        if (res.data.data.length > 0)
          this.setState({ dataList: res.data.data })
        console.log("my category:", this.state.dataList)
        console.log("my callback:", res.data.data)
        let counter = res.data.data.length;
        if (counter < 10) {
          this.setState({ pagercounter: 1 })
        } else {
          this.setState({ pagercounter: counter / 10 })
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  handleClick(offset) {
    this.setState({ offset });
    console.log("offset:", offset)
  }

  onSignup = () => {
    let { dataList, name } = this.state
    let nologin = 0;
    dataList.map(item => {
      if (name == item.name) {
        nologin = 1;
      } else {
        nologin = 2
      }
    })
    if (nologin == 1) {
      alert("This Category already exist in your database!");
    } else {
      if (this.state.buttontext == localStorage.getItem("word8")) {
        let body = { name: this.state.name, flag: "1" }
        axios.post(localStorage.getItem("url") + '/todos/categoryadd', body)
          .then((res) => {
            console.log(res.data)
            alert("Successful!!");
            window.location.reload();
          }).catch((error) => {
            console.log(error)
          });
      } else {

        let dataid = this.state.userid
        let body = { key: dataid, name: this.state.name, flag: this.state.flag }
        console.log("body:", body)
        axios.post(localStorage.getItem("url") + '/todos/categoryupdate/', body)
          .then((res) => {
            console.log(res.data)
            alert("Successful!!");
            window.location.reload();
          }).catch((error) => {
            console.log(error)
          });
      }

      this.setState({
        name: '',
        flag: '',
        userid: '',
      })
    }

  }
  delete = (data) => {
    alert("item clicked : " + data)
    let key = { key: data }
    axios.post(localStorage.getItem("url") + '/todos/categorydelete/', key)
      .then((res) => {
        console.log(res.data)
        alert("Successful_del!!");
        window.location.reload();
      }).catch((error) => {
        console.log(error)
      });
  }
  updateitem = (dataid, dataname, dataflag) => {
    this.setState({ userid: dataid })
    this.setState({ name: dataname })
    this.setState({ flag: dataflag })
    this.setState({ buttontext: localStorage.getItem("word9") })
  }
  updateFlagitem =  (dataid, dataname, dataflag) => {
    this.setState({ userid: dataid })
    this.setState({ name: dataname })
    this.setState({ flag: dataflag })
    let body = { key: dataid, name: dataname, flag: dataflag }
    console.log("body:", body)
    axios.post(localStorage.getItem("url") + '/todos/categoryupdate/', body)
      .then((res) => {
        console.log(res.data)
        alert("Successful!!");
        window.location.reload();
      }).catch((error) => {
        console.log(error)
      });
  }
  updatename = (e) => { this.setState({ name: e.target.value }) }
  updatebirthday = (e) => { this.setState({ birthday: e.target.value }) }
  updateaddress = (e) => { this.setState({ address: e.target.value }) }
  updateemail = (e) => { this.setState({ email: e.target.value }) }
  updatepassword = (e) => { this.setState({ password: e.target.value }) }
  updateconfirm = (e) => { this.setState({ confirm: e.target.value }) }


  // setSelectedDate = date => {
  //   this.setState({ selectedDate: date })
  // }

  // handleDateChange = date => {
  //   this.setSelectedDate(date);
  //   console.log("data:", this.state.selectedDate)
  //   var d = new Date(date);
  //   var realdate = (d.getUTCMonth() + 1 * 1.0) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear();
  //   this.setState({ birthday: realdate })

  //   console.log("hours:", d.getUTCHours()); // Hours
  //   console.log("minutes:", d.getUTCMinutes());
  //   console.log("seconds:", d.getUTCSeconds());
  //   console.log("year:", d.getUTCFullYear());
  //   console.log("day:", d.getUTCDay());
  //   console.log("date:", d.getUTCDate());
  //   console.log("month:", d.getUTCMonth());
  //   // alert(this.state.data)
  // };

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <Grid
          container
          spacing={3}
        >
           <Grid
              item
              md={12}
              xs={12}
            >
              <h2>Categories</h2>
                
            </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            {/* <TabCategories /> */}
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <TextField
              fullWidth
              helperText="Please specify the first name"
              label="Add New Category"
              margin="dense"
              name="firstName"
              onChange={this.updatename}
              required
              value={this.state.name}
              variant="outlined"
            />
          </Grid>


        </Grid>

        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={this.onSignup}
          >
            {this.state.buttontext}
          </Button>
        </CardActions>
        <Table
          // className={classes.table}
          aria-labelledby="tableTitle"
          size={'medium'}
          aria-label="enhanced table"
        >

          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <span>No</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Category Name</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Total Questions</span>
              </TableCell>
              <TableCell padding="checkbox" >
                <span>Action</span>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              
              this.state.dataList.map((item, index) => {
                var textd = "Enabled";
                var flagto = 1;
                if (item.flag == 1) {
                  textd = "Enabled";
                  flagto = 2;  
                } else {
                  textd = "disabled";
                  flagto = 1;
                }
                let start = this.state.offset * 10 - 1
                let end = this.state.offset * 10 + 10
                while (start < index && index < end) {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                      onClick={this.updateitem.bind(this, item._id, item.name, item.flag)}
                    >
                      <TableCell padding="checkbox">
                        <span>{index + 1}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.name}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>5</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <CardActions>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={this.delete.bind(this, item._id)}
                          >  Delete </Button>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={this.updateFlagitem.bind(this, item._id, item.name, flagto)}
                          >  {textd} </Button>
                        </CardActions>
                      </TableCell>
                    </TableRow>
                  )
                }
              })
            }

          </TableBody>
        </Table>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Pagination
            limit={1}
            offset={this.state.offset}
            total={this.state.pagercounter}
            onClick={(e, offset) => this.handleClick(offset)}
          />
        </MuiThemeProvider>
      </div>
    );
  }

}