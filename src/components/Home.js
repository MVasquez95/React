import React, { Component } from 'react';
import '../App.css';
import './Home.css'

import OptionButton from '../common/OptionButton';
import ChangeProfileButton from '../common/ChangeProfileButton';

class Home extends Component {

  componentDidMount = () => {
    let user = JSON.parse(localStorage.getItem("bciuser"));
    // this.setState({ user })
    console.log("Last user saved: ", user)

    // let ops = setInterval(() => {
    //   fetch('http://localhost:4000/training/start', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ userid: 'charls' }),
    //   })
    //     .then(response => response.json())
    //     .then(res => console.log(res))
    // }, 1000);

    // setTimeout(() => {
    //   clearInterval(ops)      
    // }, 20500);

  }


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
          <OptionButton route="/feedback"
            text="FeedBack" />
        </div>
      </div>
    )
  }
}

export default Home;