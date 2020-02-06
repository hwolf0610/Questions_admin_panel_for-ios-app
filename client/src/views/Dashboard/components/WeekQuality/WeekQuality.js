import React from 'react';
import axios from "axios";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import palette from 'theme/palette';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Checkbox from '@material-ui/core/Checkbox';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default class WeekQuality extends React.Component {
  constructor(props) {
    super(props)

    var today = new Date(),
      date = today.getMonth() + 1;
    var today1 = new Date(),
      year = today1.getFullYear();

    this.state = {
      currentmonth: date,
      currentyear: year,
      currentdate: null,
      currentweek: null,
      data: {
        labels: [],
        datasets: [
          {
            label: 'Quanlity',
            backgroundColor: '#f0134d',
            data: []
          },
          {
            label: 'plan',
            backgroundColor: '#fddb3a',
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        legend: { display: false },
        cornerRadius: 5,
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: false,
          borderWidth: 1,
          borderColor: palette.success,
          backgroundColor: palette.white,
          titleFontColor: palette.text.primary,
          bodyFontColor: palette.text.secondary,
          footerFontColor: palette.text.secondary
        },
        layout: { padding: 0 },
        scales: {
          xAxes: [
            {
              barThickness: 15,
              maxBarThickness: 15,
              barPercentage: 0.5,
              categoryPercentage: 0.5,
              ticks: {
                fontColor: palette.text.secondary
              },
              gridLines: {
                display: false,
                drawBorder: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: palette.text.secondary,
                beginAtZero: true,
                min: 0
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: palette.divider,
                drawBorder: false,
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
                zeroLineColor: palette.divider
              }
            }
          ]
        }
      },
      datalist: [],
      dataplanlist: [],
      datalabel: [],
      dataprice: [],
      dataplan: [],
      showmonth: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',],
      showyear: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      checked: 0,
      selectedDate: new Date(),

    }
  }
  componentDidMount = () => {
    var da = new Date()
    let weekly = this.getNumberOfWeek(da) 
    console.log("weekly:", weekly)
    this.setState({ currentweek: weekly })

    
    axios.post('/todos/show')
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({ datalabel: res.data })

          axios.post('/todos/getJobchart')
            .then((res1) => {

              let { dataList } = this.state

              if (res1.data.length > 0) {
                dataList = res1.data
                this.setState({ dataList })
                this.update_data_bar()
              }
            }).catch((error1) => {
              console.log(error1)
            });

          axios.post('/todos/getPlanchart')
            .then((res2) => {

              let { dataplanlist } = this.state

              if (res2.data.length > 0) {
                dataplanlist = res2.data
                this.setState({ dataplanlist })
                this.update_data_plan_bar()
              }
            }).catch((error2) => {
              console.log(error2)
            });

        }
      }).catch((error) => {
        console.log(error)
      });

  }
  updateYearState = (e) => { this.setState({ currentyear: e.target.value }) }
  updateMonthState = (e) => { this.setState({ currentmonth: e.target.value }) }
  update_data_bar = () => {
    let { currentmonth, currentyear, currentweek, dataList, data, datalabel, dataprice, dataplan } = this.state
    let gainObject = {}
    let labels = []
    let bar1 = []

    datalabel.map(item => {
      gainObject[item.name] = 0 *1.0
    })

    dataList.map(item => {
      if (item.month == currentmonth && item.year == currentyear && currentweek == item.week ) {
        if (gainObject[item.name]) {
          gainObject[item.name] += item.price * 1.0
        } else {
          gainObject[item.name] = item.price * 1.0
        }
      } else {
      }
    })
    console.log("gainObject ;", gainObject)
    console.log("getObject values: ", gainObject["admin"]);
    let keys = Object.keys(gainObject);
    for (var index = 0; index < keys.length; index++) {
      labels.push(keys[index])
      bar1.push(gainObject[keys[index]])
    }


    data.labels = labels
    data.datasets[0].data = bar1
    // datalabel = labels
    dataprice = bar1
    // this.setState({ data, currentmonth })
    this.setState({ data, datalabel, dataprice })

  }
  update_data_plan_bar = () => {
    let { currentmonth, currentyear,currentweek, dataplanlist, data, datalabel, dataprice, dataplan } = this.state
    let gainObject = {}
    let bar2 = []
    dataplanlist.map(item => {
      if (item.month == currentmonth && item.year == currentyear && currentweek == item.week && item.flag == "week" ) {
        if (gainObject[item.name]) {
          gainObject[item.name] += item.price * 1.0
        } else {
          gainObject[item.name] = item.price * 1.0
        }
      } else {
      }
    })


    datalabel.map(item => {
      console.log("plan view:" + item);
      bar2.push(gainObject[item.name]||0);
    });

    console.log("gainObject ;", gainObject)
    console.log("getObject values: ", gainObject["admin"]);
    /*
    let keys = Object.keys(gainObject);
    for (var index = 0; index < keys.length; index++) {
      bar2.push(gainObject[keys[index]])
    } */
    data.datasets[1].data = bar2
    dataplan = bar2
    // this.setState({ data, currentmonth })
    this.setState({ data })

  }
  changecheckmonth = event => {
    this.setState({ checked: ~this.state.checked })
    alert(this.state.checked)
  };

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

    this.setState({ currentyear: d.getUTCFullYear() })
    this.setState({ currentmonth: d.getUTCMonth() + 1 * 1.0 })
    this.setState({ currentdate: d.getUTCDate() })
    let weekly = this.getNumberOfWeek(date) 
    console.log("weekly:", weekly)

    this.setState({ currentweek: weekly })
    

    console.log("hours:", d.getUTCHours()); // Hours
    console.log("minutes:", d.getUTCMinutes());
    console.log("seconds:", d.getUTCSeconds());
    console.log("year:", d.getUTCFullYear());
    console.log("day:", d.getUTCDay());
    console.log("date:", d.getUTCDate());
    console.log("month:", d.getUTCMonth());
    // alert(this.state.data)
    this.update_data_bar()
  };

  render() {
    return (
      <div>
        <CardHeader
          action={
            <Button
              size="small"
              variant="text"
            >

              {/* <ArrowDropDownIcon /> */}
            </Button>
          }
          title={localStorage.getItem('word16')}
        />

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
 


        <Divider />
        <CardContent style={{ backgroundColor: 'white', border: '1px solid #e7e9eb' }}>
          <div style={{ height: "400px" }}>
            <Bar
              data={this.state.data}
              options={this.state.options}
            />
          </div>
        </CardContent>
        <Divider />
      </div>
    );
  }
}