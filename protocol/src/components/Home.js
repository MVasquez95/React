import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Aplicación</h1>
                <Link to="/train">
                <button className = "btn btn-primary">
                    Empezar entrenamiento
                </button>
                </Link>
                <br></br>
                <br></br>
                <Link to="/detail">
                <button className = "btn btn-primary">
                    Detalle de perfil
                </button>
                </Link>
                <br></br>
                <br></br>
                <Link to="/">
                <button className = "btn btn-primary">
                    Cambiar perfil
                </button>
                </Link>
            </div>
        )
     }
}

export default Home;