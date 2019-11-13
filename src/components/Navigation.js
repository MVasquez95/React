import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <nav className = "navbar navbar-expand-lg navbar-dark bg-dark">
                <h4>Aplicación</h4>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <Link className="nav-link" to="/home">
                            <li className="nav-item active ml-3">
                                Home
                            </li>
                        </Link>
                        <Link className="nav-link" to="/train">
                            <li className="nav-item">
                                Empezar entrenamiento
                            </li>
                        </Link>
                        <Link className="nav-link" to="/detail">
                            <li className="nav-item">
                                Detalle de perfil
                            </li>
                        </Link>
                        <Link className="nav-link" to="/">
                            <li className="nav-item">
                                Cambiar perfil
                            </li>
                        </Link>
                    </ul>
                </div>           
            </nav>
        )
     }
}

export default Navigation;