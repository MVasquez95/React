import React, { Component } from 'react';
import '../App.css';

import ProfilePicker from '../profile/ProfilePicker';

class Login extends Component {

  componentDidMount = () => {
    let lastUser = localStorage.getItem("bciuser");
    console.log("Last user saved: ", JSON.parse(lastUser))
  }

  render() {
    return (
      <ProfilePicker />
    );
  }
}

export default Login;