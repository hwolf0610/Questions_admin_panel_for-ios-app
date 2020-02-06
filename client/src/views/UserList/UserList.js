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
      pagercounter: 0,
      selectedDate: new Date(),

    }
    if (localStorage.getItem("key") == 0 || localStorage.getItem("key") == 1) {
      window.location.href = "/sign-in";
    } else { }

  }
  componentDidMount = () => {
    axios.post('/todos/show')
      .then((res) => {
        if (res.data.length > 0)
          this.setState({ dataList: res.data })

        let counter = res.data.length;
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
    let { dataList,name} = this.state
    let nologin = 0;
    dataList.map(item => {
      if (name == item.name) {
        nologin = 1;
      } else {
        nologin = 2
      }
    })
    if (nologin == 1) {
      alert("your name already exist!");
    } else {
      if (this.state.buttontext == localStorage.getItem("word8")) {
        if (this.state.password === this.state.confirm) {

          let body = { name: this.state.name, birthday: this.state.birthday, address: this.state.address, email: this.state.email, password: this.state.password, flag: "2" }
          axios.post(localStorage.getItem("url") + '/todos/add', body)
            .then((res) => {
              console.log(res.data)
              alert("Successful!!");
              window.location.reload();
            }).catch((error) => {
              console.log(error)
            });


        } else {
          alert("not same password with confirm!");
        }


      } else {

        let id = this.state.userid
        let body = { name: this.state.name, birthday: this.state.birthday, address: this.state.address, email: this.state.email, password: this.state.password, flag: "2" }
        console.log("body:", body)
        axios.post(localStorage.getItem("url") + '/todos/userupdate/' + id, body)
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
        birthday: '',
        address: '',
        email: '',
        password: '',
        confirm: '',
        flag: '',

      })
    }

  }
  delete = (data) => {
    alert("item clicked : " + data)
    let id = data
    axios.delete(localStorage.getItem("url") + '/todos/userdelete/' + id)
      .then((res) => {
        console.log(res.data)
        alert("Successful_del!!");
        window.location.reload();
      }).catch((error) => {
        console.log(error)
      });
  }
  updateitem = (dataid, dataname, databirthday, dataemail, dataaddress, datapassword) => {
    this.setState({ name: dataname })
    this.setState({ birthday: databirthday })
    this.setState({ address: dataaddress })
    this.setState({ email: dataemail })
    this.setState({ password: datapassword })
    this.setState({ confirm: datapassword })
    this.setState({ buttontext: localStorage.getItem("word9") })
    this.setState({ userid: dataid })

    this.setState({ selectedDate: databirthday })
    // alert("item clicked : " + data)
    // let id = data
    // axios.delete(localStorage.getItem("url")+'/todos/userdelete/' + id)
    //   .then((res) => {
    //     console.log(res.data)
    //     alert("Successful_del!!");
    //     window.location.reload();
    //   }).catch((error) => {
    //     console.log(error)
    //   });
  }
  updatename = (e) => { this.setState({ name: e.target.value }) }
  updatebirthday = (e) => { this.setState({ birthday: e.target.value }) }
  updateaddress = (e) => { this.setState({ address: e.target.value }) }
  updateemail = (e) => { this.setState({ email: e.target.value }) }
  updatepassword = (e) => { this.setState({ password: e.target.value }) }
  updateconfirm = (e) => { this.setState({ confirm: e.target.value }) }


  setSelectedDate = date => {
    this.setState({ selectedDate: date })
  }

  handleDateChange = date => {
    this.setSelectedDate(date);
    console.log("data:", this.state.selectedDate)
    var d = new Date(date);
    var realdate = (d.getUTCMonth() + 1 * 1.0) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear();
    this.setState({ birthday: realdate })

    console.log("hours:", d.getUTCHours()); // Hours
    console.log("minutes:", d.getUTCMinutes());
    console.log("seconds:", d.getUTCSeconds());
    console.log("year:", d.getUTCFullYear());
    console.log("day:", d.getUTCDay());
    console.log("date:", d.getUTCDate());
    console.log("month:", d.getUTCMonth());
    // alert(this.state.data)
  };

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              helperText="Please specify the first name"
              label="Name"
              margin="dense"
              name="firstName"
              onChange={this.updatename}
              required
              value={this.state.name}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={2}
            xs={12}
          >
            {/* <TextField
              fullWidth
              label="Birthday"
              margin="dense"
              name="lastName"
              onChange={this.updatebirthday}
              required
              value={this.state.birthday}
              variant="outlined"
              helperText="Please input password"
            /> */}

            <MuiPickersUtilsProvider utils={DateFnsUtils}>

              <Grid container justify="space-around">

                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Please select birthday"
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />

              </Grid>

            </MuiPickersUtilsProvider>

            {/* <TextField
              id="date"
              label="Date"
              type="date"
              onChange={this.updatebirthday}
              defaultValue={this.state.date}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ width: '200px' }}
            /> */}
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Email"
              margin="dense"
              name="email"
              onChange={this.updateemail}
              required
              value={this.state.email}
              variant="outlined"
              helperText="Please input Email"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Address"
              margin="dense"
              name="phone"

              onChange={this.updateaddress}
              type="email"
              value={this.state.address}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <PasswordField
              fullWidth
              hintText="At least 8 characters"
              helperText="Please specify the first name"
              floatingLabelText="Enter your password"
              errorText="Your password is too short"
              value={this.state.password}
              onChange={this.updatepassword}
              id="password"
            />

          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <PasswordField
              fullWidth
              hintText="At least 8 characters"
              helperText="Please specify the first name"
              floatingLabelText="Enter your password"
              errorText="Your password is too short"
              value={this.state.confirm}
              onChange={this.updateconfirm}
              id="password"
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
                <span>Name</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Birthday</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Address</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Email</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Password</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Delete</span>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {

              this.state.dataList.map((item, index) => {
                let start = this.state.offset * 10 - 1
                let end = this.state.offset * 10 + 10
                while (start < index && index < end) {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                      onClick={this.updateitem.bind(this, item._id, item.name, item.birthday, item.email, item.address, item.password)}
                    >
                      <TableCell padding="checkbox">
                        <span>{index + 1}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.name}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.birthday}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.address}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.email}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.password}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <Button
                          onClick={this.delete.bind(this, item._id)}
                        >Delete
                       </Button>
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