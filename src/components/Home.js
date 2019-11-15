import React, { Component } from 'react';
import '../App.css';
import './Home.css'

import OptionButton from '../common/OptionButton';
import ChangeProfileButton from '../common/ChangeProfileButton';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <ChangeProfileButton route="/" />

        <div className="title-container">
          <h1>Aplicación de interfaz cerebro-computadora (BCI) para interacción asistida en videojuego</h1>
        </div>

        <div className="options-container">
          <OptionButton route="/train"
            text="Empezar entrenamiento" />
          <OptionButton route="/detail"
            text="Detalle de perfil" />
          <OptionButton route="/detail"
            text="FeedBack" />
        </div>
      </div>
    )
  }
}

export default Home;