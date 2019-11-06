import React, {Component} from 'react';
import '../App.css';
import {users} from '../users.json';
import UserForm from './UserForm';
import {Link} from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            users
        };
        this.handleAddUser = this.handleAddUser.bind(this);
    }

    handleAddUser(user) {
        this.setState({
            users: [...this.state.users, user]
        })
    }

    handleRemoveUser(index) {
        if (window.confirm('¿Seguro de querer eliminar?')) {
            this.setState({
                users: this.state.users.filter((e,i) => {
                    return i !== index
                })
            })
        }
    }

    render() {
        const users = this.state.users.map((user,i) => {
            return(
                <div className = "col-md-4" key={i}>    
                    <div className="card mt-4">
                        <div className="card-header">
                            <h3>{user.id}</h3>
                            <span className= "badge badge-pill badge-danger ml-2">
                            Estado: {user.state}
                            </span>
                        </div>
                        <div className = "card-body">
                            <p>Protocolo de entrenamiento: {user.protocol}</p>
                        </div>
                        <div className = "card-footer">
                            <Link to="/home">
                                <button className = "btn btn-primary">
                                    Seleccionar
                                </button>
                            </Link>
                            <button className = "btn btn-danger" onClick={this.handleRemoveUser.bind(this,i)}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className = "App">
                <div className = "container">
                    <div className = "row mt-4">
                        <div className = "col-md-3">
                            <UserForm onAddUser= {this.handleAddUser}/>
                        </div>
                        <div className = "col-md-9">
                            <div className = "row">
                            {users}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
     }
}

export default Login;