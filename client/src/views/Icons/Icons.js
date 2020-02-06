import React from 'react';

export default class Icons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentdata: 0,
      dataList: [],
      date: new Date(),
    }
    if (localStorage.getItem("key") == 0 ) {
          window.location.href = "/sign-in";
      } 

  }


  render() {
    return (
      <div>
        <h1>hjh</h1>
      </div>


    );
  }
}
