import React from 'react';
import axios from "axios";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';

export default class Budget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentdata: 0,
      dataList:[],
    }
  }
  componentDidMount = () => {

    axios.post('/todos/getJobchart')
      .then((res) => {

        let { dataone, currentdata, dataList, currentmonth, currentyear } = this.state

        if (res.data.length > 0) {
          dataList = res.data
          this.setState({ dataList })
          this.update_data_bar()
        }
        console.log("array list : ", dataList)
      }).catch((error) => {
        console.log(error)
      });
  }
  update_data_bar = () => {
    let { currentmonth, currentyear, dataList, currentdata } = this.state
    let barData1 = []
    dataList.map(item => {
      currentdata += item.price * 1.0
       
    })
    
    this.setState({ currentdata })

  }
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
                style={{ fontWeight: 700 }}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                 {localStorage.getItem("word1") }   
            </Typography>
              
              
              <Typography variant="h3">${this.state.currentdata}</Typography>
            </Grid>
            <Grid item>
              <Avatar style={{ backgroundColor: 'red', height: 56, width: 56 }}>
                <MoneyIcon style={{ height: 32, width: 32 }} />
              </Avatar>
            </Grid>
          </Grid>
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
            <ArrowDownwardIcon style={{ color: 'white' }} />
            <Typography
              style={{ color: 'white', marginRight: '10px' }}
              variant="body2"
            >
              12%
          </Typography>
            <Typography

              // className={classes.caption}
              variant="caption"
            >
              {localStorage.getItem("word14")}
          </Typography>
          </div>
        </CardContent>
      </div>
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
//     backgroundColor: theme.palette.error.main,
//     height: 56,
//     width: 56
//   },
//   icon: {
//     height: 32,
//     width: 32
//   },
//   difference: {
//     marginTop: theme.spacing(2),
//     display: 'flex',
//     alignItems: 'center'
//   },
//   differenceIcon: {
//     color: theme.palette.error.dark
//   },
//   differenceValue: {
//     color: theme.palette.error.dark,
//     marginRight: theme.spacing(1)
//   }
// }));

// const Budget = props => {
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
//               BUDGET
//             </Typography>
//             <Typography variant="h3">$24,000</Typography>
//           </Grid>
//           <Grid item>
//             <Avatar className={classes.avatar}>
//               <MoneyIcon className={classes.icon} />
//             </Avatar>
//           </Grid>
//         </Grid>
//         <div className={classes.difference}>
//           <ArrowDownwardIcon className={classes.differenceIcon} />
//           <Typography
//             className={classes.differenceValue}
//             variant="body2"
//           >
//             12%
//           </Typography>
//           <Typography
//             className={classes.caption}
//             variant="caption"
//           >
//             Since last month
//           </Typography>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// Budget.propTypes = {
//   className: PropTypes.string
// };

// export default Budget;
