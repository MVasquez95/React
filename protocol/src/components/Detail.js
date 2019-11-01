import React, {Component} from 'react';
import '../App.css';
import Navigation from './Navigation';

class Detail extends Component {
    render() {
        return (
            <div>
                <Navigation></Navigation>
                <h1>Aca irá el detalle del perfil</h1>
            </div>
        )
     }
}

export default Detail;