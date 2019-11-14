import React, { Component } from 'react';
import '../App.css';
import { users } from '../users.json';
// import { Link } from 'react-router-dom';

// import UserForm from './UserForm';

import Modal from 'react-modal';
import ProfilePicker from '../profile/ProfilePicker';
import BackgroundImage from '../BackGroundImage';

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
      <div className="App">
        <BackgroundImage />
        <ProfilePicker />
      </div>
    );
  }
}

export default Login;



// render() {
//   const users = this.state.users.map((user, i) => {
//     return (
//       <div className="col-md-4" key={i}>
//         <div className="card mt-4">
//           <div className="card-header">
//             <h3>{user.id}</h3>
//             <span className="badge badge-pill badge-danger ml-2">
//               Estado: {user.state}
//             </span>
//           </div>
//           <div className="card-body">
//             <p>Protocolo de entrenamiento: {user.protocol}</p>
//           </div>

//           <div className="card-footer">
//             <Link to="/home">
//               <button className="btn btn-primary">
//                 Seleccionar
//                               </button>
//             </Link>
//             <button className="btn btn-danger" onClick={this.handleRemoveUser.bind(this, i)}>
//               Eliminar
//                           </button>
//           </div>
//         </div>
//       </div>
//     )
//   })
//   return (
//     <div className="App">
//       {/* <nav class="navbar navbar-dark bg-dark">
//         <button onClick={this.openModal} className="btn btn-primary">
//           Agregar Usuario
//         </button>
//         <Modal

//           isOpen={this.state.modalIsOpen}
//           onRequestClose={this.closeModal}
//           size="lg"
//           aria-labelledby="contained-modal-title-vcenter"
//           centered
//         >
//           <UserForm onAddUser={this.handleAddUser} />
//           <button onClick={this.closeModal} className="btn btn-danger" >
//             Cerrar
//           </button>
//         </Modal>
//       </nav> */}
//       <BackgroundImage />
//       <ProfilePicker />
//       {/* <div className="container">
//         <div className="row mt-4">
//           <div className="col-md-9">
//             <div className="row">
//               {users}
//             </div>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// }
// }