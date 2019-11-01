import React, {Component} from 'react';
import '../App.css';
import Navigation from './Navigation';

class Home extends Component {
    render() {
        return (
            <div>
                <Navigation></Navigation>
                <h1>Aca iran las instrucciones de la app</h1>
            </div>
        )
     }
}

export default Home;