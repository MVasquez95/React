import React, { Component } from 'react';
import '../App.css';
import './Home.css'

import OptionButton from '../common/OptionButton';
import ChangeProfileButton from '../common/ChangeProfileButton';
import LoadingTraining from '../loading/LoadingTraining';

class Home extends Component {

  state = {
    isTraining: true
  }

  componentDidMount = () => {
    if (this.props.location.state) {
      // this is just a quick fix, we need to make it a better practice
      // const { from } = this.props.location.state
      let user = JSON.parse(localStorage.getItem("bciuser"));
      // this.setState({ user })
      // let userid = localStorage.getItem("bciuserid");
      console.log("Last user saved: ", user.userid)
      
      // fetch(`http://localhost:4000/training/train`, {
      fetch(`http://18.219.150.69:4000/training/train`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: user.userid }),
      })
      .then(response => response.json())
      .then(_ => this.setState({ isTraining: false }))
    } else {
      this.setState({ isTraining: false })
    }
  }

  render() {
    return (
      <div className="home">
        {this.state.isTraining ?
          <LoadingTraining />
          :
          <>
            <ChangeProfileButton route="/" />

            <div className="title-container">
              <h1>Aplicación de interfaz cerebro-computadora (BCI) para interacción asistida en videojuego</h1>
            </div>

            <div className="options-container">
              <OptionButton route="/protocol-picker"
                text="Empezar entrenamiento" />
              <OptionButton route="/detail"
                text="Detalle de perfil" />
              <OptionButton route="/feedback-picker"
                text="FeedBack" />
            </div>
          </>
        }
      </div>
    )
  }
}

export default Home;