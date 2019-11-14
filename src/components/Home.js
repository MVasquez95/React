import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import './Home.css'

import { FaExchangeAlt } from "react-icons/fa";
import { FiUser, FiUsers } from "react-icons/fi";


class Home extends Component {
  render() {
    return (
      <div className="home">
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <div className="change-user">
            <FiUser size="2em" color="coral" />-<FaExchangeAlt size="2em" color="coral" />-<FiUsers size="2em" color="coral" />
          </div>
        </Link>
        <div className="title-container">
          <h1>Aplicación de interfaz cerebro-computadora (BCI) para interacción asistida en videojuego</h1>
        </div>
        <div>
          <div className="options">
            <Link to="/train" style={{ textDecoration: 'none', color: 'black' }}>
              <div className="button-on-home">
                Empezar entrenamiento
          </div>
            </Link>
          </div>
          <div className="options">
            <Link to="/detail" style={{ textDecoration: 'none', color: 'black' }}>
              <div className="button-on-home">
                Detalle de perfil
          </div>
            </Link>
          </div>
        </div>
      </div>
    )
    // return (
    //   <div className="container">
    //     <div className="center">
    //       <h1>Aplicación de interfaz cerebro-computadora (BCI) para interacción asistida en videojuego</h1>
    //       <Link to="/train">
    //         <button className="btn btn-primary">
    //           Empezar entrenamiento
    //             </button>
    //       </Link>
    //       <br></br>
    //       <br></br>
    //       <Link to="/detail">
    //         <button className="btn btn-primary">
    //           Detalle de perfil
    //             </button>
    //       </Link>
    //       <br></br>
    //       <br></br>
    //       <Link to="/">
    //         <button className="btn btn-primary">
    //           Cambiar perfil
    //             </button>
    //       </Link>
    //     </div>
    //   </div>
    // )
  }
}

export default Home;