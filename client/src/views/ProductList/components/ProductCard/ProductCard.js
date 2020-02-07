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
      var ts = new Date();

    this.state = {
      options: ["Africa", "America", "Asia", "Europe"],
      date: year + "-" + date + "-" + days,
      day: '',
      month: '',
      week: '',
      year: '',
      name: '',
      answer: '',
      clientname: '',
      price: '',
      dataList: [],
      dataname: [],
      showname: [],
      startDate: new Date(),
      offset: 0,
      pagercounter: 0,
      selectedDate: new Date(),
      question: '',
      categoryid: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      type: '',
      correct: '',
      userid: '',
      categoryname: '',
      categoryData:[],
      buttontext: localStorage.getItem("word10"),
      types: ["easy", "medium", "hard"],
      corrects: ["A", "B", "C", "D"],
      createDate: new Date(),



    }
    if (localStorage.getItem("key") == 0 || localStorage.getItem("key") == 1) {
      window.location.href = "/sign-in";
    } else {

    }
    localStorage.setItem("pager", "0");
  }
  componentDidMount = () => {

    axios.get(localStorage.getItem("url") + '/todos/questionshow')
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


    axios.post(localStorage.getItem("url") + '/todos/categoryshow')
      .then((res) => {       
        if (res.data.data.length > 0)
          this.setState({ categoryData: res.data.data })
          this.update_data_bar()
      }).catch((error) => {
        console.log(error)
      });
  }
  
  updateQuestion = (e) => { this.setState({ question: e.target.value }) }
  updateCategoryid = (e) => { 
    let { categoryData, categoryid,createDate } = this.state
    categoryData.map(item => {
      if (item.name == e) {
        categoryid = item._id
      }
    })
    var ts = new Date();
    createDate = ts.getDay()+"/"+ts.getMonth()+"/"+ts.getFullYear()+" "+ts.toLocaleTimeString(ts.getTime())
    this.setState({ categoryData, categoryid,createDate })
  }
  updateOptionA = (e) => { this.setState({ optionA: e.target.value }) }
  updateOptionB = (e) => { this.setState({ optionB: e.target.value }) }
  updateOptionC = (e) => { this.setState({ optionC: e.target.value }) }
  updateOptionD = (e) => { this.setState({ optionD: e.target.value }) }
  updateType = (e) => { this.setState({ type: e }) }
  updatCorrect = (e) => { this.setState({ correct: e }) }


  // handleClick(offset) {
  //   this.setState({ offset });
  //   console.log("offset:", offset)
  // }

  update_data_bar = () => {
    let { categoryData, showname } = this.state
    let barData1 = []
    categoryData.map(item => {
      barData1.push(item.name)
    })
    showname = barData1
    this.setState({ categoryData, showname })
  }

  // updatedate = (e) => {
  //   this.setState({ date: e.target.value })
  //   let setday = e.target.value
  //   let mid = setday.split('-')
  //   this.setState({ day: mid[2] })
  //   this.setState({ month: mid[1] })
  //   this.setState({ year: mid[0] })
  //   console.log("date:", this.state.date)
  // }
  // updatename = (e) => {
  //   console.log("update name : ", e)
  //   this.setState({ name: e })

  // }

  // updateclientname = (e) => { this.setState({ clientname: e.target.value }) }


  // updateprice = (e) => { this.setState({ price: e.target.value }) }
  onAddjob = () => {
    if (this.state.buttontext == localStorage.getItem("word10")) {
      let body = { categoryid: this.state.categoryid, desc: this.state.question, answer1: this.state.optionA, answer2: this.state.optionB, answer3: this.state.optionC, answer4: this.state.optionD, grade: this.state.type, correct: this.state.correct, createDate:this.state.createDate }
      axios.post(localStorage.getItem("url") + '/todos/questionadd', body)
        .then((res) => {
          console.log(res.data)
          alert("Successful!!");
          window.location.reload();
        }).catch((error) => {
          console.log(error)
        });
    } else {
      let dataid = this.state.userid
      let body = { key: dataid, categoryid: this.state.categoryid, desc: this.state.question, answer1: this.state.optionA, answer2: this.state.optionB, answer3: this.state.optionC, answer4: this.state.optionD, grade: this.state.type, correct: this.state.correct }
      console.log("body:", body)
      axios.post(localStorage.getItem("url") + '/todos/questionupdate/', body)
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
      flag: '',
      userid: '',
    })
  }
  updateitem = (dataid, datacategoryid, desc, answer1, answer2, answer3, answer4, grade, correct) => {
    let { categoryData, categoryname,showname } = this.state
    let barData1=[]
    categoryData.map(item => {
      if (item._id == datacategoryid) {
        categoryname = item.name
      }
      barData1.push(item.name)
    })
    showname = barData1
    this.setState({ categoryData, categoryname,showname })

    // this.setState({ categoryid: datacategoryid })
    this.setState({ question: desc })
    this.setState({ userid: dataid })
    this.setState({ optionA: answer1 })
    this.setState({ optionB: answer2 })
    this.setState({ optionC: answer3 })
    this.setState({ optionD: answer4 })
    this.setState({ type: grade })
    this.setState({ correct: correct })
    this.setState({ buttontext: localStorage.getItem("word9") })
  }
  delete = (data) => {
    alert("item clicked : " + data)
    let key = { key: data }
    axios.post(localStorage.getItem("url") + '/todos/questiondelete/', key)
      .then((res) => {
        console.log(res.data)
        alert("Successful_del!!");
        window.location.reload();
      }).catch((error) => {
        console.log(error)
      });
  }
  //   setdate = (e) => {
  //     this.setState({ date: e.target.value })
  //     let setday = e.target.value
  //     let mid = setday.split('-')
  //     this.setState({ day: mid[2] })
  //     this.setState({ month: mid[1] })
  //     this.setState({ year: mid[0] })

  //     console.log("date:", this.state.date)
  //   }
  //   setname = (e) => {
  //     this.setState({ name: e.target.value })
  //   }

  //   setSelectedDate = date => {
  //     this.setState({ selectedDate: date })
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
  //     this.setState({ day:  d.getUTCDate() })
  //     this.setState({ month: d.getUTCMonth() + 1 * 1.0  })
  //     this.setState({ year: d.getUTCFullYear()  })
  //     // alert(this.state.data)
  //     let weekly = this.getNumberOfWeek(date) 
  //     console.log("weekly:", weekly)

  //     this.setState({ week: weekly })


  //   };

  render() {
    return (
      <div >
        <Grid
          container
          spacing={3}
        >
           <Grid
              item
              md={12}
              xs={12}
            >
              <h2>Questions</h2>
                
            </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <TextField
              fullWidth
              label="Question"
              margin="dense"
              name="email"
              onChange={this.updateQuestion}
              required
              value={this.state.question}
              variant="outlined"
            />
          </Grid>
          
          <Grid
            item
            md={12}
            xs={12}
          >
            <TextField
              fullWidth
              label="Option A"
              margin="dense"
              name="email"
              onChange={this.updateOptionA}
              required
              value={this.state.optionA}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <TextField
              fullWidth
              label="Option B"
              margin="dense"
              name="email"
              onChange={this.updateOptionB}
              required
              value={this.state.optionB}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <TextField
              fullWidth
              label="Option C"
              margin="dense"
              name="email"
              onChange={this.updateOptionC}
              required
              value={this.state.optionC}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <TextField
              fullWidth
              label="Option D"
              margin="dense"
              name="email"
              onChange={this.updateOptionD}
              required
              value={this.state.optionD}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <SingleSelect value={this.state.categoryname} placeholder="Select a Category" required options={this.state.showname} onChange={this.updateCategoryid} />
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
          >
            <SingleSelect value={this.state.type} placeholder="Select a Type" required options={this.state.types} onChange={this.updateType} />
          </Grid>

          <Grid
            item
            md={12}
            xs={12}
          >
            <SingleSelect value={this.state.correct} placeholder="Select correct answer" required options={this.state.corrects} onChange={this.updatCorrect} />
          </Grid>
        </Grid>

        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={this.onAddjob}
          >
            {this.state.buttontext}
          </Button>
        </CardActions>
        <br />
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
              label="Part of Question"
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
            md={1}
            xs={12}
          >
            <SingleSelect value={this.state.name} placeholder="--Category--" required options={this.state.showname} onChange={this.updatename} />
          </Grid>

          <Grid
            item
            md={1}
            xs={12}
          >
            <SingleSelect value={this.state.name} placeholder="--Type--" required options={this.state.showname} onChange={this.updatename} />
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
                <span>Question</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Category</span>
              </TableCell>
              <TableCell padding="checkbox">
                <span>Type</span>
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
              //  this.updatetable
              this.state.dataList.map((item, index) => {
                var barData1 = item.categoryid             
                this.state.categoryData.map(myid => {
                  if (myid._id == item.categoryid) {
                    barData1 = myid.name
                  }
                })

                let start = this.state.offset * 10 - 1
                let end = this.state.offset * 10 + 10
                while (start < index && index < end) {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                      onClick={this.updateitem.bind(this, item._id, item.categoryid, item.desc, item.answer1, item.answer2, item.answer3, item.answer4, item.grade, item.correct)}
                    >
                      <TableCell padding="checkbox">
                        <span>{index + 1}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.desc}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{barData1}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.grade}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <span>{item.createDate}</span>
                      </TableCell>
                      <TableCell padding="checkbox">
                      <CardActions>
                        <Button
                         color="primary"
                         variant="contained"
                          onClick={this.delete.bind(this, item._id)}
                        >Delete  </Button>
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
