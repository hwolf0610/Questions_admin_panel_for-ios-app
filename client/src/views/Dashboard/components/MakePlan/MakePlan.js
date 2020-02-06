import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField, Typography as MuiTypography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PasswordField from 'material-ui-password-field'
import { SingleSelect } from "react-select-material-ui";


import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import axios from "axios";

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const theme = createMuiTheme();

export default class MakePlan extends React.Component {
  constructor(props) {
    super(props)
    var curmonth = new Date(),
      date = curmonth.getMonth() + 1;
    var curyear = new Date(),
      year = curyear.getFullYear();
    var curday = new Date(),
      days = curday.getDay();

    this.state = {
      date: year + "-" + date + "-" + days,
      month: '',
      flag: '',
      showkind:['month','week'],
      year: '',
      name: '',
      detail: '',
      price: '',
      dataList: [],
      dataname: [],
      offset: 0,
      buttontext: localStorage.getItem("word12"),
      pagercounter: 0,
      userid: '',
      selectedDate: new Date(),

    }

    if (localStorage.getItem("key") == 0 || localStorage.getItem("key") == 1) {
      window.location.href = "/sign-in";
    } else {

    }

  }
  componentDidMount = () => {
    axios.post('/todos/showplan')
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

    axios.post('/todos/show')
      .then((res) => {
        let { dataname } = this.state
        if (res.data.length > 0)
          dataname = res.data
        this.setState({ dataname })
        this.update_data_bar()
      }).catch((error) => {
        console.log(error)
      });

  }


  handleClick(offset) {
    this.setState({ offset });
    console.log("offset:", offset)
  }

  update_data_bar = () => {
    let { dataname, showname } = this.state
    let barData1 = []
    dataname.map(item => {
      barData1.push(item.name)
    })
    showname = barData1
    this.setState({ dataname, showname })

  }

  onSignup = () => {
    let body = {  week: this.state.week,month: this.state.month, year: this.state.year, name: localStorage.getItem('name'), detail: this.state.detail, price: this.state.price, flag: this.state.flag }
     axios.post(localStorage.getItem("url") + '/todos/planadd', body)
      .then((res) => {
        console.log(res.data)
        alert("Successful!!");
        window.location.reload();
      }).catch((error) => {
        console.log(error)
      });
    this.setState({
      month: '',
      name: '',
      year: '',
      detail: '',
      price: '',
    })

    // axios.post('/todos/showplan')
    //   .then((res) => {

    //     if (res.data.length > 0)
    //       this.setState({ dataList: res.data })

    //     let totalplan = 0;

    //     this.state.dataList.map((item, index) => {
    //       totalplan += item.price * 1.0;

    //     })
    //     console.log("totalplan:", totalplan)
    //     localStorage.setItem("totalplan", totalplan)

    //   }).catch((error) => {
    //     console.log(error)
    //   });

  }
  delete = (data) => {
    alert("item clicked : " + data)
    let id = data
    axios.delete(localStorage.getItem("url") + '/todos/plandelete/' + id)
      .then((res) => {
        console.log(res.data)
        alert("Successful_del!!");
        window.location.reload();
      }).catch((error) => {
        console.log(error)
      });
  }
  updatedetail = (e) => { this.setState({ detail: e.target.value }) }
  updateprice = (e) => { this.setState({ price: e.target.value }) }
  setdate = (e) => {
    this.setState({ date: e.target.value })
    let setday = e.target.value
    let mid = setday.split('-')
    // this.setState({ day: mid[2] })
    this.setState({ month: mid[1] })
    this.setState({ year: mid[0] })

    console.log("date:", this.state.date)
  }

  setSelectedDate = date => {
    this.setState({ selectedDate: date })
  }
  getNumberOfWeek= date => {
    const today = new Date(date);
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
  handleDateChange = date => {
    this.setSelectedDate(date);
    console.log("data:", this.state.selectedDate)
    var d = new Date(date);
    var realdate = (d.getUTCMonth() + 1 * 1.0) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear();
    this.setState({ date: realdate })
    this.setState({ month: d.getUTCMonth() + 1 * 1.0 })
    this.setState({ year: d.getUTCFullYear() })
    // alert(this.state.data)
    let weekly = this.getNumberOfWeek(date) 
    console.log("weekly:", weekly)

    this.setState({ week: weekly })
  };
  updateflag = (e) => { this.setState({ flag: e }) }

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <CardContent style={{ fontSize: '15px', height: '600px', backgroundColor: 'white', border: '3px solid #e7e9eb' }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Please select date"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
               <SingleSelect value={this.state.flag} placeholder="Select a kind" options={this.state.showkind} onChange={this.updateflag} />    

            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="plan price"
                margin="dense"
                name="email"
                type="number"
                onChange={this.updateprice}
                required
                value={this.state.price}
                variant="outlined"
                helperText="Please input price"
              />

            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Detail"
                margin="dense"
                name="phone"
                onChange={this.updatedetail}
                type="email"
                value={this.state.detail}
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
                  <span>Kind</span>
                </TableCell>
                <TableCell padding="checkbox">
                  <span>Week</span>
                </TableCell>
                <TableCell padding="checkbox">
                  <span>Month</span>
                </TableCell>
                <TableCell padding="checkbox">
                  <span>Year</span>
                </TableCell>
                <TableCell padding="checkbox">
                  <span>Detail</span>
                </TableCell>
                <TableCell padding="checkbox">
                  <span>Plan Price</span>
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
                  let number = 0;
                  while (start < index && index < end && item.name == localStorage.getItem("name")) {
                    number = number + 1 * 1.0;
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={index}
                      >
                       <TableCell padding="checkbox">
                          <span>{item.flag}</span>
                        </TableCell>
                        <TableCell padding="checkbox">
                          <span>{item.week}</span>
                        </TableCell>
                        <TableCell padding="checkbox">
                          <span>{item.month}</span>
                        </TableCell>
                        <TableCell padding="checkbox">
                          <span>{item.year}</span>
                        </TableCell>
                        <TableCell padding="checkbox">
                          <span>{item.detail}</span>
                        </TableCell>
                        <TableCell padding="checkbox">
                          <span>{item.price}</span>
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
        </CardContent>
      </div>
    );
  }
}