import React, { Component } from 'react';
import { MdDelete } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import '../App.css';
import './ProfileCard.css';

class ProfileCard extends Component {
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

  render() {
    return (
      <div className="profile-card">
        <h1>{this.state.userid  || <br/> }</h1>
        <div className="profile-image">
          <AiOutlineUser size="3em"/>
        </div>
        <p>Protocolo: {this.state.protocol}</p>
        <p>Estado: {this.state.state}</p>
        <div className="delete-button">
          < MdDelete size="2em" />
        </div>
      </div>
    )
  }
}

export default ProfileCard;