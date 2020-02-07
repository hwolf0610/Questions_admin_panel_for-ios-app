import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default class SimpleTabs extends React.Component {
  constructor(props){
    super(props)
    this.state={
      value: 0

    }
  }

  handleChange = (e, newVal) => {
    console.log("selected value : ", e, newVal)
    this.setState({value: newVal})
  };

  render(){

    return (
      <div >
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
            <Tab label="Add Category" {...a11yProps(0)} />
            <Tab label="Manage Category" {...a11yProps(1)} />
                   </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          Add New Category
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          Manage Category
        </TabPanel>
       
      </div>
    );

  }
  
}
// export default class MakePlan extends React.Component {
//   constructor(props) {
//     super(props)
     

//     this.state = {
       

//     }

//     if (localStorage.getItem("key") == 0 || localStorage.getItem("key") == 1) {
//       window.location.href = "/sign-in";
//     }

//   }
//   componentDidMount = () => {
    
   

//   } 
//   // updatedetail = (e) => { this.setState({ detail: e.target.value }) }
//   // updateprice = (e) => { this.setState({ price: e.target.value }) }
  
//   // setSelectedDate = date => {
//   //   this.setState({ selectedDate: date })
//   // } 

//   render() {
//     return (
//       <div style={{ padding: '20px' }}>
//         <CardContent style={{ fontSize: '15px', height: '600px', backgroundColor: 'white', border: '3px solid #e7e9eb' }}>
//           <Grid
//             container
//             spacing={3}
//           >
//             <Grid
//               item
//               md={12}
//               xs={12}
//             >
//               <h2>Categories</h2>

//             </Grid>

//           </Grid>
//         </CardContent>
//       </div>
//     );
//   }
// }