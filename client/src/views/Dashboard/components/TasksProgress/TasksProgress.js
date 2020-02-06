import React from 'react';
import axios from "axios";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

export default class TasksProgress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentdata: 0,
      dataList: [],
    }
  }
  componentDidMount = () => {



    axios.post('/todos/getJobchart')
      .then((res) => {

        let { dataone, currentdata, dataList, currentmonth, currentyear } = this.state

        if (res.data.length > 0) {
          dataList = res.data

          dataList.map(item => {
            currentdata += item.price * 1.0
      
          })
          currentdata = (currentdata/ localStorage.getItem("totalplan")) *100
          currentdata = currentdata.toString().substr(0, 6); 
          this.setState({ dataList,currentdata })


          // this.update_data_bar()
        }
        console.log("array list : ", dataList)
      }).catch((error) => {
        console.log(error)
      });
  }


  // update_data_bar = () => {
  //   let { currentmonth, currentyear, dataList, currentdata } = this.state
  //   let barData1 = []
  //   dataList.map(item => {
  //     currentdata += item.price * 1.0

  //   })
  //   currentdata = (currentdata/ 30000) *100
  //   currentdata = currentdata.toString().substr(0, 6);    
  //   this.setState({ currentdata })

  // }


  render() {
    return (
      <div>
        <CardContent style={{ backgroundColor: 'white', border: '1px solid #e7e9eb' }}>
          <Grid
            container
            justify="space-between"
          >
            <Grid item>
              <Typography
               style={{fontWeight: 700}}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                {localStorage.getItem("word3") }
            </Typography>
              <Typography variant="h3">{this.state.currentdata} %</Typography>
            </Grid>
            <Grid item>
              <Avatar 
              style={{ backgroundColor: 'blue', color: 'white', height: 56,  width: 56}}
              >
                <InsertChartIcon 
                style={{ height: 32, width: 32}}
                />
              </Avatar>
            </Grid>
          </Grid>&nbsp;
          <LinearProgress
           style={{marginTop: '10px'}}
            value={this.state.currentdata}
            variant="determinate"
          />
        </CardContent>
      </div >
    );
  }
}

// const useStyles = makeStyles(theme => ({
//   root: {
//     height: '100%'
//   },
//   content: {
//     alignItems: 'center',
//     display: 'flex'
//   },
//   title: {
//     fontWeight: 700
//   },
//   avatar: {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     height: 56,
//     width: 56
//   },
//   icon: {
//     height: 32,
//     width: 32
//   },
//   progress: {
//     marginTop: theme.spacing(3)
//   }
// }));

// const TasksProgress = props => {
//   const { className, ...rest } = props;

//   const classes = useStyles();

//   return (
//     <Card
//       {...rest}
//       className={clsx(classes.root, className)}
//     >
//       <CardContent>
//         <Grid
//           container
//           justify="space-between"
//         >
//           <Grid item>
//             <Typography
//               className={classes.title}
//               color="textSecondary"
//               gutterBottom
//               variant="body2"
//             >
//               TASKS PROGRESS
//             </Typography>
//             <Typography variant="h3">75.5%</Typography>
//           </Grid>
//           <Grid item>
//             <Avatar className={classes.avatar}>
//               <InsertChartIcon className={classes.icon} />
//             </Avatar>
//           </Grid>
//         </Grid>
//         <LinearProgress
//           className={classes.progress}
//           value={75.5}
//           variant="determinate"
//         />
//       </CardContent>
//     </Card>
//   );
// };

// TasksProgress.propTypes = {
//   className: PropTypes.string
// };

// export default TasksProgress;
