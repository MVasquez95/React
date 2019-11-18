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
      state: user.state,
      timestamps: user.timestamps,
    })
  }

  loginUser = () => {
    console.log(`Saving ${this.state.userid} to localStorage`)
    let user = {
      userid: this.state.userid,
      protocol: this.state.protocol,
      state: this.state.state,
      timestamps: this.state.timestamps,
    }
    localStorage.setItem("bciuser", JSON.stringify(user));
  }

  deleteUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Delete user not implemented!")
  }

  render() {
    return (
      <Link to={{ 
        pathname: "/home",
        state: {
          from: window.location.href
        }
      }} style={{ textDecoration: 'none', color: 'black' }}>
        <div className="profile-card" onClick={this.loginUser}>
          <h1>{this.state.userid || <br />}</h1>
          <div className="profile-image">
            <AiOutlineUser size="3em" />
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