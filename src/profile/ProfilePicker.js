import React, { Component } from 'react';

import '../App.css';
import './ProfilePicker.css';

import { MdAddCircleOutline } from "react-icons/md";
import { GiCancel } from "react-icons/gi";

import NewProfileCard from './NewProfileCard';
import ProfileCard from './ProfileCard';

class Picker extends Component {
  state = {
    mode: "list",
    users: []
  }

  componentDidMount = () => {
    fetch("http://localhost:4000/users")
      .then(response => response.json())
      .then(users => {
        this.setState({ users })
      })
      .catch(err =>{
        console.log(err)
      })
    const ob = document.querySelector(".outer-border")
    ob.onwheel = this.handleScroll
  }

  handleScroll(e) {
    e.preventDefault()
    const inn = document.querySelector(".inner-border")
    inn.scrollLeft += (e.deltaY / 5)
  }

  render() {
    let profiles = this.state.users.map((u, i) => <ProfileCard key={i} user={u} />)

    let list = (
      <div className="outer-border">
        <h1>Selecciona tu perfil</h1>
        <div className="add-button" onClick={() => this.setState({ mode: "add" })}>
          < MdAddCircleOutline size="3em" color="coral" />
        </div>
        <div className="inner-border">
          {profiles}
        </div>
      </div>
    )

    let add = (
      <div className="outer-border">
        <h1>Elige un nombre de usuario</h1>
        <div className="add-button" onClick={() => this.setState({ mode: "list" })}>
          < GiCancel size="3em" color="coral" />
        </div>
        <div className="inner-border">
          <NewProfileCard />
        </div>
      </div>
    )
    return (
      <div>
        {this.state.mode === "list" && list}
        {this.state.mode === "add" && add}
      </div>
    )
  }
}

export default Picker;