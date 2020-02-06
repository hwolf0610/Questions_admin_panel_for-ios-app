import React from 'react';
import axios from "axios";

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

export default class TotalUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentdata: 0,
      dataList: [],
    }
  }
  componentDidMount = () => {
    axios.post('/todos/show')
    .then((res) => {
      let {dataList } = this.state
      if (res.data.length > 0)
      dataList = res.data
      this.setState({ dataList })
      this.update_data_bar()
    }).catch((error) => {
      console.log(error)
    });

    axios.post('/todos/show')
    .then((res) => {
      let {dataList,currentdata } = this.state
      if (res.data.length > 0)
      dataList = res.data
     

      dataList.map(item => {
        currentdata += 1.0
  
      })
      this.setState({ dataList,currentdata })
      // this.update_data_bar()
    }).catch((error) => {
      console.log(error)
    });

    
  }
  
  // update_data_bar = () => {
  //   let { currentmonth, currentyear, dataList, currentdata } = this.state
  //   let barData1 = []
  //   dataList.map(item => {
  //     currentdata += 1.0

  //   })

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
                 {localStorage.getItem("word2") } 
            </Typography>
              <Typography variant="h3">{this.state.currentdata}</Typography>
            </Grid>
            <Grid item>
              <Avatar 
              style={{ backgroundColor: 'green', height: 56, width: 56}}
              >
                <PeopleIcon 
                style={{height: 32, width: 32}}
                />
              </Avatar>
            </Grid>
          </Grid>
          <div 
          style={{ marginTop: '10px', display: 'flex', alignItems: 'center'}}
          > &nbsp;
            {/* <ArrowUpwardIcon 
            style={{color: 'grey'}}
            />
            <Typography
             style={{color: 'grey', marginRight: '10px'}}
              variant="body2"
            >
              16%
          </Typography>
            <Typography
              // className={classes.caption}
              variant="caption"
            >
              Since last month
          </Typography> */}
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
//     backgroundColor: theme.palette.success.main,
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
//     color: theme.palette.success.dark
//   },
//   differenceValue: {
//     color: theme.palette.success.dark,
//     marginRight: theme.spacing(1)
//   }
// }));

// const TotalUsers = props => {
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
//               TOTAL USERS
//             </Typography>
//             <Typography variant="h3">1,600</Typography>
//           </Grid>
//           <Grid item>
//             <Avatar className={classes.avatar}>
//               <PeopleIcon className={classes.icon} />
//             </Avatar>
//           </Grid>
//         </Grid>
//         <div className={classes.difference}>
//           <ArrowUpwardIcon className={classes.differenceIcon} />
//           <Typography
//             className={classes.differenceValue}
//             variant="body2"
//           >
//             16%
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

// TotalUsers.propTypes = {
//   className: PropTypes.string
// };

// export default TotalUsers;
