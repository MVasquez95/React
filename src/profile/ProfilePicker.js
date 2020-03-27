import React, { Component } from 'react';
import { MdAddCircleOutline } from "react-icons/md";
import NewProfileCard from './NewProfileCard';
import ProfileCard from './ProfileCard';
import loading from '../images/loading.gif';
import './ProfilePicker.css';

class Picker extends Component {
  state = {
    mode: "list",
    isLoading: true,
    users: [],
  }

  componentDidMount = () => {
    // fetch("http://localhost:4000/users")
    fetch("http://18.219.150.69:4000/users")
      .then(response => response.json())
      .then(users => this.setState({ users, isLoading: false }))
      .catch(err => console.log(err))
    this.invertScrolling()
  }

  invertScrolling = () => {
    const ob = document.querySelector(".outer-border")
    ob.onwheel = this.handleScroll
  }

  handleScroll = (e) => {
    e.preventDefault()
    const inn = document.querySelector(".inner-border")
    inn.scrollLeft += (e.deltaY / 5)
  }

  addUser = () => {
    this.setState({ mode: "add" })
  }

  cancelAddUser = () => {
    this.setState({ mode: "list" }, () => this.invertScrolling())
  }

  render() {
    let profiles = this.state.users.map((u, i) => <ProfileCard key={i} user={u} />)
    let listMode = (
      <div className="outer-border">
        <h1>Selecciona tu perfil</h1>
        <div className="add-button" onClick={this.addUser}>
          < MdAddCircleOutline size="3em" color="coral" />
        </div>
        <div className="inner-border">
          {this.state.isLoading ?
            <div className="loading-image">
              <img src={loading} alt="Source: customer.io" />
            </div>
            :
            profiles
          }
        </div>
      </div>
    )
    let addMode = (
      <div className="outer-border">
        <h1>Elige un nombre de usuario</h1>
        <div className="cancel-button" onClick={this.cancelAddUser}>
          < MdAddCircleOutline size="3em" color="coral" />
        </div>
        <div className="inner-border">
          <NewProfileCard />
        </div>
      </div>
    )
    return (
      <div>
        {this.state.mode === "list" && listMode}
        {this.state.mode === "add" && addMode}
      </div>
    )
  }
}

export default Picker;