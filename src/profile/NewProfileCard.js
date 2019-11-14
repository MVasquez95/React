import React, { Component } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import '../App.css';
import './NewProfileCard.css';

class NewProfileCard extends Component {
  state = {
    userid: '',
    protocol: '',
    state: ''
  }

  componentDidMount = () => {
    let { user } = this.props;
    if (!user) return;
    this.setState({
      userid: user.userid,
      protocol: user.protocol,
      state: user.state
    })
  }

  addUser = () => {
    this.props.pickerRefresh()
  }

  render() {
    return (
      <div className="new-profile-card">
        <h1>Nuevo usuario</h1>
        <div className="profile-image">
          <AiOutlineUser size="3em"/>
        </div>
        <br />
        <input type="text" name="fname" />
        <div>agregar</div>
      </div>
    )
  }
}

export default NewProfileCard;