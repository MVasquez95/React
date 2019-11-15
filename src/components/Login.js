import React, { Component } from 'react';
import '../App.css';
import { users } from '../users.json';

import Modal from 'react-modal';
import ProfilePicker from '../profile/ProfilePicker';

Modal.setAppElement()

class Login extends Component {
  constructor() {
    super();
    this.state = {
      users,
      modalIsOpen: false
    };
    this.handleAddUser = this.handleAddUser.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    let lastUser = localStorage.getItem("bciuser");
    console.log("Last user saved: ", JSON.parse(lastUser))
  }

  handleAddUser(user) {
    this.setState({
      users: [...this.state.users, user]
    })
  }

  handleRemoveUser(index) {
    if (window.confirm('¿Seguro de querer eliminar?')) {
      this.setState({
        users: this.state.users.filter((e, i) => {
          return i !== index
        })
      })
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <ProfilePicker />
    );
  }
}

export default Login;