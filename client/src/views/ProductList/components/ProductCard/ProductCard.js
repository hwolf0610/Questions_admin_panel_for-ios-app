import React, { useState } from 'react';
import {
  CardActions,
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


import ReactSelectMaterialUi from "react-select-material-ui";
import Select, { Option } from '@material/react-select';
import { SingleSelect } from "react-select-material-ui";

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

export default class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    var curmonth = new Date(),
      date = curmonth.getMonth() + 1;
    var curyear = new Date(),
      year = curyear.getFullYear();
    var curday = new Date(),
      days = curday.getDay();

    this.state = {
      options: ["Africa", "America", "Asia", "Europe"],
      date: year + "-" + date + "-" + days,
      day: '',
      month: '',
      week: '',
      year: '',
      name: '',
      clientname: '',
      price: '',
      dataList: [],
      dataname: [],
      showname: [],
      startDate: new Date(),
      offset: 0,
      pagercounter: 0,
      selectedDate: new Date(),

    }
    if (localStorage.getItem("key") == 0 || localStorage.getItem("key") == 1) {
      window.location.href = "/sign-in";
    } else {

    }
    localStorage.setItem("pager", "0");
  }
  componentDidMount = () => {

    axios.post('/todos/showdistinct')
      .then((res) => {
        if (res.data.length > 0)
          this.setState({ dataname: res.data })
      }).catch((error) => {
        console.log(error)
      });

    axios.post('/todos/jobshow')
      .then((res) => {
        let { dataList } = this.state
        if (res.data.length > 0)
          dataList = res.data
        this.setState({ dataList })

        let counter = res.data.length;
        if (counter < 10) {
          this.setState({ pagercounter: 1 })
        } else {
          this.setState({ pagercounter: counter / 10 })
        }

        // this.update_pager() 
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

    let setday = this.state.date
    let mid = setday.split('-')
    this.setState({ day: mid[2] })
    this.setState({ month: mid[1] })
    this.setState({ year: mid[0] })

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

  updatedate = (e) => {
    this.setState({ date: e.target.value })
    let setday = e.target.value
    let mid = setday.split('-')
    this.setState({ day: mid[2] })
    this.setState({ month: mid[1] })
    this.setState({ year: mid[0] })
    console.log("date:", this.state.date)
  }
  updatename = (e) => {
    console.log("update name : ", e)
    this.setState({ name: e })

  }

  updateclientname = (e) => { this.setState({ clientname: e.target.value }) }


  updateprice = (e) => { this.setState({ price: e.target.value }) }
  onAddjob = () => {
    let body = { month: this.state.month, week: this.state.week, day: this.state.day, year: this.state.year, name: this.state.name, clientname: this.state.clientname, price: this.state.price }
    axios.post(localStorage.getItem("url") + '/todos/working', body)
      .then((res) => {
        console.log(res.data)
        alert("Successful!!");
        window.location.reload();
      }).catch((error) => {
        console.log(error)
      });
  }

  delete = (data) => {
    alert("item clicked : " + data)
    let id = data
    axios.delete(localStorage.getItem("url") + '/todos/workdelete/' + id)
      .then((res) => {
        console.log(res.data)
        alert("Successful_del!!");
        window.location.reload();
      }).catch((error) => {
        console.log(error)
      });
  }
  setdate = (e) => {
    this.setState({ date: e.target.value })
    let setday = e.target.value
    let mid = setday.split('-')
    this.setState({ day: mid[2] })
    this.setState({ month: mid[1] })
    this.setState({ year: mid[0] })

    console.log("date:", this.state.date)
  }
  setname = (e) => {
    this.setState({ name: e.target.value })
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
    this.setState({ day:  d.getUTCDate() })
    this.setState({ month: d.getUTCMonth() + 1 * 1.0  })
    this.setState({ year: d.getUTCFullYear()  })
    // alert(this.state.data)
    let weekly = this.getNumberOfWeek(date) 
    console.log("weekly:", weekly)

    this.setState({ week: weekly })
 

  };

  render() {
    return (
      <div >
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
            {/* <TextField
              fullWidth
              helperText="Please specify the first name"
              label="date"
              margin="dense"
              name="firstName"
              onChange={this.updatedate}
              required
              value={this.state.date}
              variant="outlined"
            />

            <TextField
              id="date"
              label="Date"
              type="date"
              onChange={this.setdate}
              defaultValue={this.state.date}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}



            {/* <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={this.state.startDate}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}


            {/* <Calendar
                              accentColor={'blue'}
                              orientation={'flex-col'}
                              showHeader={false}
                              onDatePicked={(d) => {
                              console.log('onDatePicked', d);
                              }}/> */}
            {/* <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            /> */}
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Client Name"
              margin="dense"
              name="email"
              onChange={this.updateclientname}
              required
              value={this.state.clientname}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <TextField
              fullWidth
              label="Price"
              margin="dense"
              name="phone"
              required
              onChange={this.updateprice}
              type="number"
              value={this.state.price}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            {/* <TextField
              fullWidth
              label="Name"
              margin="dense"
              name="lastName"
              onChange={this.updatename}
              required
              value={this.state.name}
              variant="outlined"
            /> */}
            {/* <ReactSelectMaterialUi style={{ width: 100 }}   options={this.state.showname} onChange={this.updatename} /> */}
            <SingleSelect value={this.state.name} placeholder="Select a name" required options={this.state.showname} onChange={this.updatename} />
          </Grid>

        </Grid>

        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={this.onAddjob}
          >
            {localStorage.getItem("word10")}
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
                <span>Month</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Week</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Day</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Year</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Name</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Client Name</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Price</span>
              </TableCell>
              {/* <TableCell padding="checkbox">
                                            <span>Update</span>
                                        </TableCell> */}
              <TableCell padding="checkbox">
                <span>Delete</span>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              //  this.updatetable
              this.state.dataList.map((item, index) => {
                let start = this.state.offset * 10 - 1
                let end = this.state.offset * 10 + 10
                while (start < index && index < end) {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell padding="checkbox">
                        <span>{index + 1}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.month}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.week}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.day}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.year}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.name}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.clientname}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.price}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <Button
                          onClick={this.delete.bind(this, item._id)}
                        >Delete  </Button>
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
