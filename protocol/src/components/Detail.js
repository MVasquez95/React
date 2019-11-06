import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

class Detail extends Component {
    render() {
        return (
            <div>
                <h1>Aca irá el detalle del perfil</h1>
                    <Link to="/home">
                        <button className = "btn btn-primary">
                            Regresar
                        </button>
                    </Link>
            </div>
        )
     }
}

export default Detail;