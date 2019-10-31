import React, {Component} from 'react';
import '../App.css';

class Navigation extends Component {
    render() {
        return (
            <nav className = "navbar navbar-expand-lg navbar-dark bg-dark">
                <h4>Aplicación</h4>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active ml-3">
                            <a class="nav-link" href="">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Empezar entrenamiento</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Detalle de perfil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Cambiar perfil</a>
                        </li>
                    </ul>
                </div>           
            </nav>
        )
     }
}

export default Navigation;