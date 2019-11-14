import React, { Component } from 'react';
import { MdDelete } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import '../App.css';
import './ProfileCard.css';
import { Link } from 'react-router-dom';

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

  loginUser = () =>  {
    console.log("lets log this mothafacka")
    console.log(this.state.userid)
    console.log(this.state.protocol)
  }
  
  deleteUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("lets delete this mothafacka")
  }

  render() {
    return (
      <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
        <div className="profile-card" onClick={this.loginUser}>
          <h1>{this.state.userid  || <br/> }</h1>
          <div className="profile-image">
            <AiOutlineUser size="3em"/>
          </div>
          <p>Protocolo: {this.state.protocol}</p>
          <p>Estado: {this.state.state}</p>
          <div className="delete-button" onClick={this.deleteUser}>
            < MdDelete size="2em" />
          </div>
        </div>
      </Link>
    )
  }
}

export default ProfileCard;