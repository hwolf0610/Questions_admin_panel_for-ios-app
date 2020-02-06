import React from 'react';
import Calendar from 'react-calendar';
import { makeStyles } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {
  CardActions,
  Divider,
  Grid,
  Button,
  TextField, Typography as MuiTypography
} from '@material-ui/core';



import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';
import MakePlan from './components/MakePlan';
import WeekQuality from './components/WeekQuality';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentdata: 0,
      dataList: [],
      date: new Date(),
      selectedDate: new Date(),
      price: '',
      buttontext: localStorage.getItem("word12"),
      detail: '',
    }
    if (localStorage.getItem("key") == 0) {
      window.location.href = "/sign-in";
    }

  }

  setSelectedDate = date => {
    this.setState({ selectedDate: date })
  }

  handleDateChange = date => {
    this.setSelectedDate(date);
    console.log("data:", this.state.selectedDate)
    // var d = new Date(date);
    // var realdate = (d.getUTCMonth() + 1 * 1.0) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear();
    // this.setState({ date: realdate })
    // this.setState({ month: d.getUTCMonth() + 1 * 1.0 })
    // this.setState({ year: d.getUTCFullYear() })
    // alert(this.state.data)
  };

  updatedetail = (e) => { this.setState({ detail: e.target.value }) }
  updateprice = (e) => { this.setState({ price: e.target.value }) }
  render() {
    return (
      <div style={{ padding: 4 }}  >

        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >

            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalUsers />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />

          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >

            <TotalProfit />

          </Grid>

          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LatestSales dataList={this.state.dataList} />
          </Grid>
          {/* <Calendar
            onChange={this.onChange}
            value={this.state.date}
          /> */}
        </Grid>

        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >

            <WeekQuality />


          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <UsersByDevice />


          </Grid>


          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <MakePlan />
          </Grid>
        </Grid>


      </div>


    );
  }
}

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(4)
//   }
// }));

// const Dashboard = () => {
//   const classes = useStyles();
//   if (localStorage.getItem("key") == 0 ) {
//     window.location.href = "/sign-in";
// } else {

// }
//   return (
//     <div className={classes.root}>
//       <Grid
//         container
//         spacing={4}
//       >
//         <Grid
//           item
//           lg={3}
//           sm={6}
//           xl={3}
//           xs={12}
//         >
//           <Budget />
//         </Grid>
//         <Grid
//           item
//           lg={3}
//           sm={6}
//           xl={3}
//           xs={12}
//         >
//           <TotalUsers />
//         </Grid>
//         <Grid
//           item
//           lg={3}
//           sm={6}
//           xl={3}
//           xs={12}
//         >
//           <TasksProgress />
//         </Grid>
//         <Grid
//           item
//           lg={3}
//           sm={6}
//           xl={3}
//           xs={12}
//         >
//           <TotalProfit />
//         </Grid>
//         <Grid
//           item
//           lg={8}
//           md={12}
//           xl={9}
//           xs={12}
//         >
//           <LatestSales />
//         </Grid>
//         <Grid
//           item
//           lg={4}
//           md={6}
//           xl={3}
//           xs={12}
//         >
//           <UsersByDevice />
//         </Grid>
//         {/* <Grid
//           item
//           lg={4}
//           md={6}
//           xl={3}
//           xs={12}
//         >
//           <LatestProducts />
//         </Grid>
//         <Grid
//           item
//           lg={8}
//           md={12}
//           xl={9}
//           xs={12}
//         >
//           <LatestOrders />
//         </Grid> */}

//       </Grid>
//     </div>
//   );
// };

// export default Dashboard;
