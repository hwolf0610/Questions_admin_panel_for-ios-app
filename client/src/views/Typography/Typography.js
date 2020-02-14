import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
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


export default class Typography extends React.Component {
  constructor(props) {
    super(props)
    var curmonth = new Date(),
      date = curmonth.getMonth() + 1;
    var curyear = new Date(),
      year = curyear.getFullYear();
    var curday = new Date(),
      days = curday.getDay();
    var ts = new Date();

    this.state = {
      date: year + "-" + date + "-" + days,
      month: '',
      flag: '',
      week: '',
      year: '',
      name: '',
      detail: '',
      price: '',
      dataList: [],
      dataname: [],
      showkind: ['month', 'week'],
      offset: 0,
      buttontext: localStorage.getItem("word12"),
      pagercounter: 0,
      userid: '',
      selectedDate: new Date(),
      createDate: ts.getDay() + "/" + ts.getMonth() + "/" + ts.getFullYear() + " " + ts.toLocaleTimeString(ts.getTime()),

    }

    if (localStorage.getItem("key") == 0 || localStorage.getItem("key") == 1) {
      window.location.href = "/sign-in";
    } else {

    }

  }
  componentDidMount = () => {
    axios.post(localStorage.getItem("url") + '/todos/scoresshow')
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

  // update_data_bar = () => {
  //   let { dataname, showname } = this.state
  //   let barData1 = []
  //   dataname.map(item => {
  //     barData1.push(item.name)
  //   })
  //   showname = barData1
  //   this.setState({ dataname, showname })

  // }

  // onSignup = () => {
  //   if (this.state.buttontext == localStorage.getItem("word12")) {
  //     // if (this.state.password === this.state.confirm) {
  //     let body = {  week: this.state.week,month: this.state.month, year: this.state.year, name: this.state.name, detail: this.state.detail, price: this.state.price, flag: this.state.flag }
  //     axios.post(localStorage.getItem("url") + '/todos/planadd', body)
  //       .then((res) => {
  //         console.log(res.data)
  //         alert("Successful!!");
  //         window.location.reload();
  //       }).catch((error) => {
  //         console.log(error)
  //       });


  //     this.setState({
  //       month: '',
  //       year: '',
  //       name: '',
  //       detail: '',
  //       price: '',
  //     })
  //   } else {
  //     let id = this.state.userid
  //     let body = {  week: this.state.week,month: this.state.month, year: this.state.year, name: this.state.name, detail: this.state.detail, price: this.state.price, flag: this.state.flag }
  //     console.log("body:", body)
  //     axios.post(localStorage.getItem("url") + '/todos/planupdate/' + id, body)
  //       .then((res) => {
  //         console.log(res.data)
  //         alert("Successful!!");
  //         window.location.reload();
  //       }).catch((error) => {
  //         console.log(error)
  //       });
  //   }

  //   axios.post('/todos/showplan')
  //     .then((res) => {

  //       if (res.data.length > 0)
  //         this.setState({ dataList: res.data })

  //       let totalplan = 0;

  //       this.state.dataList.map((item, index) => {
  //         totalplan += item.price * 1.0;

  //       })
  //       console.log("totalplan:", totalplan)
  //       localStorage.setItem("totalplan", totalplan)

  //     }).catch((error) => {
  //       console.log(error)
  //     });

  // }
  delete = (data) => {
    alert("item clicked : " + data)
    let key = { key: data }
    axios.post(localStorage.getItem("url") + '/todos/scoresdelete/', key)
      .then((res) => {
        console.log(res.data)
        alert("Successful_del!!");
        window.location.reload();
      }).catch((error) => {
        console.log(error)
      });
  }

  //   updatename = (e) => {    
  //     this.setState({ name: e })
  //   }
  //   updatedetail = (e) => { this.setState({ detail: e.target.value }) }
  //   updateflag = (e) => { this.setState({ flag: e }) }
  //   updateprice = (e) => { this.setState({ price: e.target.value }) }
  //   setdate = (e) => {
  //     this.setState({ date: e.target.value })
  //     let setday = e.target.value
  //     let mid = setday.split('-')
  //     // this.setState({ day: mid[2] })
  //     this.setState({ month: mid[1] })
  //     this.setState({ year: mid[0] })

  //     console.log("date:", this.state.date)
  //   }

  //   setSelectedDate = date => {
  //     this.setState({ selectedDate: date })
  //   }
  //   updateitem = (dataid,dataweek,dataflag, datamonth, datayear, dataname, datadetail, dataprice) => {
  //     this.setState({ month: datamonth })
  //     this.setState({ flag: dataflag })
  //     this.setState({ week: dataweek })
  //     this.setState({ year: datayear })
  //     this.setState({ name: dataname })
  //     this.setState({ detail: datadetail })
  //     this.setState({ price: dataprice })
  //     this.setState({ buttontext: localStorage.getItem("word13") })
  //     this.setState({ userid: dataid })

  //     this.setState({ selectedDate:  datamonth + "/"+"30/"+ datayear})    
  //   }
  //   getNumberOfWeek= date => {
  //     const today = new Date(date);
  //     const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  //     const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
  //     return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  // }
  //   handleDateChange = date => {
  //     this.setSelectedDate(date);
  //     console.log("data:", this.state.selectedDate)
  //     var d = new Date(date);
  //     var realdate = (d.getUTCMonth() + 1 * 1.0) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear();
  //     this.setState({ date: realdate })
  //     this.setState({ month: d.getUTCMonth() + 1 * 1.0 })
  //     this.setState({ year: d.getUTCFullYear() })

  //     // alert(this.state.data)

  //     let weekly = this.getNumberOfWeek(date) 
  //     console.log("weekly:", weekly)

  //     this.setState({ week: weekly })
  //   };
  timeConverter= (UNIX_timestamp) =>{
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

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
            <h2>Scores</h2>
          </Grid>
        </Grid>

        {/* {this.state.createDate}dfg */}
        {/* <Grid
          container
          spacing={3}
        >
           <Grid
            item
            md={2}
            xs={12}
          >
            <TextField
              fullWidth
              label="Customer Name"
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
            md={2}
            xs={12}
          >
           <SingleSelect value={this.state.name} placeholder="--Category--" required options={this.state.showname} onChange={this.updatename} />
          </Grid>
          <Grid
            item
            md={1}
            xs={12}
          >
          <Button
            color="primary"
            variant="contained"
            onClick={this.onAddjob}
          >
           Search
          </Button>
          </Grid>
          <Grid
            item
            md={1}
            xs={12}
          >
          <Button
            color="primary"
            variant="contained"
            onClick={this.onAddjob}
          >
            Clear
          </Button>
          </Grid>


        </Grid> */}
        <br />
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
                <span>Category</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Email</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Score</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Date Added</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Action</span>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {

              this.state.dataList.map((item, index) => {

                let formattedTime =this.timeConverter(item.cretedates) 
                // // Create a new JavaScript Date object based on the timestamp
                // // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                // var date = new Date(unix_timestamp * 1000);
                // var year = date.getFullYear();
                // var month = date.getUTCMonth()
                // var day = date.getUTCDay()
                // // Hours part from the timestamp
                // var hours = date.getHours();
                // // Minutes part from the timestamp
                // var minutes = "0" + date.getMinutes();
                // // Seconds part from the timestamp
                // var seconds = "0" + date.getSeconds();

                // // Will display time in 10:30:23 format
                // var formattedTime =month+"/"+day+"/"+year+" "+ hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                // console.log(formattedTime);

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
                        <span>{item.name}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.category}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.email}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.scores}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{formattedTime}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <CardActions>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={this.delete.bind(this, item._id)}
                          >  Delete </Button>
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

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(4)
//   }
// }));

// const variants = {
//   h1: 'Nisi euismod ante senectus consequat phasellus ut',
//   h2: 'Nisi euismod ante senectus consequat phasellus ut',
//   h3: 'Nisi euismod ante senectus consequat phasellus ut',
//   h4: 'Nisi euismod ante senectus consequat phasellus ut',
//   h5: 'Nisi euismod ante senectus consequat phasellus ut',
//   h6: 'Nisi euismod ante senectus consequat phasellus ut',
//   subtitle1: 'Leo varius justo aptent arcu urna felis pede nisl',
//   subtitle2: 'Leo varius justo aptent arcu urna felis pede nisl',
//   body1:
//     'Justo proin curabitur dictumst semper auctor, consequat tempor, nostra aenean neque turpis nunc. Leo. Sapien aliquet facilisi turpis, elit facilisi praesent porta metus leo. Dignissim amet dis nec ac integer inceptos erat dis Turpis sodales ad torquent. Dolor, erat convallis.Laoreet velit a fames commodo tristique hendrerit sociosqu rhoncus vel sapien penatibus facilisis faucibus ad. Mus purus vehicula imperdiet tempor lectus, feugiat Sapien erat viverra netus potenti mattis purus turpis. Interdum curabitur potenti tristique. Porta velit dignissim tristique ultrices primis.',
//   body2:
//     'Justo proin curabitur dictumst semper auctor, consequat tempor, nostra aenean neque turpis nunc. Leo. Sapien aliquet facilisi turpis, elit facilisi praesent porta metus leo. Dignissim amet dis nec ac integer inceptos erat dis Turpis sodales ad torquent. Dolor, erat convallis.',
//   caption: 'Accumsan leo pretium conubia ullamcorper.',
//   overline: 'Accumsan leo pretium conubia ullamcorper.',
//   button: 'Vivamus ultrices rutrum fames dictumst'
// };

// const Typography = () => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Grid
//         container
//         spacing={4}
//       >
//         {Object.keys(variants).map((key, i) => (
//           <Fragment key={i}>
//             <Grid
//               item
//               sm={3}
//               xs={12}
//             >
//               <MuiTypography variant="caption">{key}</MuiTypography>
//             </Grid>
//             <Grid
//               item
//               sm={9}
//               xs={12}
//             >
//               <MuiTypography variant={key}>{variants[key]}</MuiTypography>
//             </Grid>
//           </Fragment>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default Typography;
